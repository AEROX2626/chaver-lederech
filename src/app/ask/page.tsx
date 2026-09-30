"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Send, MessageCircle } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "אמונה",
  "תפילה",
  "שבת",
  "מצוות",
  "התחזקות",
  "תשובה",
  "זוגיות ומשפחה",
  "משמעות החיים",
  "קושי אישי",
  "אחר",
];

export default function AskPage() {
  const [topic, setTopic] = useState("");
  const [query, setQuery] = useState("");
  const [wantsReply, setWantsReply] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `שאלה חדשה מאתר מתחזקים:\nנושא: ${topic || "לא נבחר"}\nשאלה: ${query}\nמעוניין בתשובה: ${wantsReply ? "כן" : "לא"}`;
    window.open(`https://wa.me/972500000000?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h1 className="t-display text-4xl text-slate-900 sm:text-5xl">יש לך שאלה? תשאל.</h1>
            <div className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto space-y-2">
              <p>אין צורך לנסח יפה. אין צורך לדעת איך קוראים למה שאתה מרגיש.</p>
              <p className="font-medium text-slate-800">פשוט תכתוב. השאלה יכולה להיות אנונימית.</p>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-16">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50">
              
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3">באיזה נושא השאלה?</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setTopic(c)}
                      className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                        topic === c
                          ? "bg-sky-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="question" className="block text-sm font-bold text-slate-700 mb-3">מה היית רוצה לשאול?</label>
                <textarea
                  id="question"
                  rows={5}
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="שתף אותנו במה שעובר עליך..."
                  className="w-full resize-none rounded-2xl border-0 bg-slate-50 p-4 text-[15px] text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-sky-500 outline-none transition"
                ></textarea>
              </div>

              <div className="mb-8 flex items-start gap-3">
                <div className="flex h-6 items-center">
                  <input
                    id="reply"
                    type="checkbox"
                    checked={wantsReply}
                    onChange={(e) => setWantsReply(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-600"
                  />
                </div>
                <label htmlFor="reply" className="text-[14px] text-slate-700 select-none cursor-pointer">
                  אני רוצה לקבל תשובה במייל / וואטסאפ
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-semibold"
              >
                שליחת השאלה
                <Send className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
