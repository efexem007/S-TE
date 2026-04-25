import { NextRequest, NextResponse } from 'next/server';

// Basit in-memory rate limiter (production'da Redis kullan)
const ipRequests = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + 60_000 });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Çok fazla istek. Lütfen bekleyin.' }, { status: 429 });
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Geçersiz mesaj.' }, { status: 400 });
    }
    if (message.trim().length === 0 || message.length > 500) {
      return NextResponse.json({ error: 'Mesaj 1-500 karakter arasında olmalı.' }, { status: 400 });
    }

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
        messages: [
          {
            role: 'system',
            content: 'Sen DueM via Work akıllı asistanısın. Eğitim ve koçluk hizmetleri hakkında yardımcı olursun. Kısa ve net cevaplar ver. Maksimum 3 cümle.',
          },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
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

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
