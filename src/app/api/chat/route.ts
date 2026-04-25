import { NextRequest, NextResponse } from 'next/server';
import { CoachMessage, CoachAgent, StudentProfile } from '@/lib/coach/types';
import { getSystemPrompt, detectAgent } from '@/lib/coach/prompts';
import { buildRagContext } from '@/lib/coach/knowledgeBase';

// Basit in-memory rate limiter (production'da Redis kullan)
const ipRequests = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + 60_000 });
    return false;
  }
  if (entry.count >= 15) return true;
  entry.count++;
  return false;
}

interface ChatRequestBody {
  message: string;
  history?: CoachMessage[];
  profile?: StudentProfile | null;
  agent?: CoachAgent;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Çok fazla istek. Lütfen bekleyin.' }, { status: 429 });
    }

    const body: ChatRequestBody = await req.json();
    const { message, history = [], profile, agent: forcedAgent } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Geçersiz mesaj.' }, { status: 400 });
    }
    if (message.trim().length === 0 || message.length > 800) {
      return NextResponse.json({ error: 'Mesaj 1-800 karakter arasında olmalı.' }, { status: 400 });
    }

    // Detect agent
    const detectedAgent = forcedAgent && forcedAgent !== 'general' ? forcedAgent : detectAgent(message);

    // Build system prompt with profile and RAG
    const systemPrompt = getSystemPrompt(detectedAgent, profile ?? null);
    const ragContext = buildRagContext(message);

    const fullSystemContent = ragContext
      ? `${systemPrompt}\n\n${ragContext}`
      : systemPrompt;

    // Build messages array for LLM
    const llmMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: fullSystemContent },
    ];

    // Add conversation history (last 10 messages to stay within context)
    const recentHistory = history.slice(-10);
    for (const msg of recentHistory) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        llmMessages.push({ role: msg.role, content: msg.content });
      }
    }

    // Add current user message
    llmMessages.push({ role: 'user', content: message });

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://duemviawork.com',
        'X-Title': 'DueM via Work',
      },
      body: JSON.stringify({
        model: process.env.KIMI_MODEL ?? 'moonshotai/kimi-k2.6',
        messages: llmMessages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('OpenRouter error:', response.status, await response.text());
      return NextResponse.json({ error: 'Servis geçici olarak kullanılamıyor.' }, { status: 503 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ error: 'Boş cevap alındı.' }, { status: 500 });
    }

    return NextResponse.json({ reply, agent: detectedAgent });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
