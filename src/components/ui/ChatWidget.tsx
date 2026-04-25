'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Merhaba! Size nasıl yardımcı olabilirim?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (text.length > 500) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error('API error');
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Şu anda yardımcı olamıyorum, lütfen form üzerinden ulaşın.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-4 w-[360px] max-w-[90vw] h-[480px] rounded-2xl bg-bg-darkest border border-white/10 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 glass border-b border-white/10 flex items-center justify-between">
            <span className="text-text-light font-medium">dueMWeWork Asistan</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Sohbeti kapat"
              className="p-1 text-text-light/70 hover:text-text-light transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-accent text-bg-darkest rounded-br-none'
                      : 'bg-white/5 text-text-light border border-white/10 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 text-text-light border border-white/10 px-4 py-2 rounded-xl rounded-bl-none text-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan animate-pulse-cyan mr-1" />
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan animate-pulse-cyan mr-1 animation-delay-150" />
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan animate-pulse-cyan animation-delay-300" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 glass">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={500}
                placeholder="Mesajınızı yazın..."
                aria-label="Mesajınızı yazın"
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-light text-sm placeholder:text-text-light/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Gönder"
                className="p-2 rounded-lg bg-gradient-accent text-bg-darkest hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-right text-xs text-text-light/30 mt-1">
              {input.length} / 500
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Sohbeti kapat' : 'Sohbeti aç'}
        aria-expanded={open}
        className="w-14 h-14 rounded-full bg-gradient-accent text-bg-darkest shadow-lg hover:shadow-glow-cyan transition-all flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
