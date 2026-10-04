"use client";

import { useEffect, Suspense, useState, useRef } from "react";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";
import { Send, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useUserProgress } from "@/lib/userProgress";
import Reveal from "@/components/Reveal";
import Markdown from 'react-markdown';

function ChatContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { startTrack } = useUserProgress();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      handleSendQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendQuery = async (query: string) => {
    const newMessages = [...messages, { role: 'user' as const, content: query }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = "";
      
      setMessages([...newMessages, { role: 'assistant', content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          // Vercel AI SDK toTextStreamResponse chunks start with text parsing, or if plain text stream, it's just raw text.
          // To be safe, if we get raw text we just append it. If it's Vercel format (0: "text"), we could parse it.
          // But since we just want it to work, let's assume it's a raw string stream because toTextStreamResponse returns plain text stream.
          assistantMsg += chunk;
          setMessages([...newMessages, { role: 'assistant', content: assistantMsg }]);
        }
      }
    } catch (e) {
      console.error(e);
      setMessages([...newMessages, { role: 'assistant', content: "מצטער, הייתה שגיאה בתקשורת." }]);
    }
    
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const query = input.trim();
    setInput("");
    handleSendQuery(query);
  };

  return (
    <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/" className="p-2 rounded-full hover:bg-slate-200 transition">
          <ArrowRight className="h-5 w-5 text-slate-500" />
        </Link>
        <h1 className="font-semibold text-slate-800">חבר לדרך</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 mb-24 pb-8 overflow-y-auto">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-20 text-slate-400 flex flex-col items-center">
            <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
            <p>מה עובר לך בראש?</p>
          </div>
        )}

        {messages.map((m, idx) => (
          <Reveal key={idx} delay={0}>
            {m.role === "user" ? (
              <div className="flex justify-end">
                <div className="bg-sky-500 text-white px-5 py-3.5 rounded-2xl rounded-tl-sm max-w-[85%] text-[15px] leading-relaxed shadow-sm">
                  {m.content}
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 text-slate-800 p-6 sm:p-8 rounded-3xl rounded-tr-sm max-w-[95%] sm:max-w-[85%] shadow-sm w-full prose prose-slate prose-headings:text-slate-900 prose-a:text-sky-600 rtl:prose-headings:text-right text-right">
                  <Markdown>{m.content}</Markdown>
                </div>
              </div>
            )}
          </Reveal>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-500 px-5 py-4 rounded-3xl rounded-tr-sm shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 sm:pb-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="כתוב כאן משהו..."
              className="w-full bg-slate-100 border border-slate-200 rounded-full py-3.5 pr-5 pl-12 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute left-2 w-9 h-9 flex items-center justify-center bg-sky-500 text-white rounded-full hover:bg-sky-600 disabled:opacity-50 transition"
            >
              <Send className="h-4 w-4 rtl:-scale-x-100" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Suspense fallback={<div className="py-20 text-center text-slate-400">טוען...</div>}>
        <ChatContent />
      </Suspense>
    </div>
  );
}
