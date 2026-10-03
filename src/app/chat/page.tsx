"use client";

import { useState, useEffect, Suspense } from "react";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";
import { Send, ArrowRight, PlayCircle, BookOpen, Footprints, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useUserProgress } from "@/lib/userProgress";
import Reveal from "@/components/Reveal";

function ChatContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [messages, setMessages] = useState<{ role: "user" | "ai", text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { startTrack } = useUserProgress();

  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      setMessages([{ role: "user", text: initialQuery }]);
      simulateAIResponse(initialQuery);
    }
  }, [initialQuery]);

  const simulateAIResponse = (query: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: query }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    simulateAIResponse(userMsg);
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
        {messages.length === 0 && !isTyping && (
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
                  {m.text}
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 text-slate-800 p-6 sm:p-8 rounded-3xl rounded-tr-sm max-w-[95%] sm:max-w-[85%] shadow-sm w-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">אני שומע אותך.</h3>
                  <p className="text-[15px] leading-relaxed text-slate-600 mb-8">
                    זה בסדר גמור לא לדעת מאיפה מתחילים. לא צריך להכיר הכל ולא צריך לשנות הכל ביום אחד. 
                    מה שהכי חשוב זה הצעד הקטן הראשון.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-5">
                      <div className="flex items-center gap-2 font-semibold text-sky-800 mb-2">
                        <BookOpen className="h-4 w-4" /> משהו שיכול לעזור
                      </div>
                      <p className="text-sm text-slate-600 mb-3">מדריך קצר שמסביר למה מתפללים ואיך מתחילים.</p>
                      <Link href="/guides/guide-p01" className="text-sm font-semibold text-sky-600 hover:underline">
                        תפילה למתחילים &larr;
                      </Link>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
                      <div className="flex items-center gap-2 font-semibold text-emerald-800 mb-2">
                        <Footprints className="h-4 w-4" /> הצעד שלך
                      </div>
                      <p className="text-sm text-slate-700">עצור היום ל-30 שניות, נשום ואמור תודה על משהו אחד קטן.</p>
                    </div>

                    <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5">
                      <div className="flex items-center gap-2 font-semibold text-rose-800 mb-2">
                        <PlayCircle className="h-4 w-4" /> רוצה לעבור מסלול?
                      </div>
                      <p className="text-sm text-slate-600 mb-4">תפילה מהלב - 7 ימים של התקרבות.</p>
                      <Link 
                        href="/tracks/track-06"
                        onClick={() => startTrack("track-06")} 
                        className="bg-white border border-slate-200 text-slate-700 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition"
                      >
                        אני מתחיל
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </Reveal>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-500 px-5 py-4 rounded-3xl rounded-tr-sm shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 sm:pb-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="כתוב כאן משהו..."
              className="w-full bg-slate-100 border border-slate-200 rounded-full py-3.5 pr-5 pl-12 text-[15px] focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
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
