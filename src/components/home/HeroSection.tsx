"use client";

import { Search, ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import Reveal from "../Reveal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32" id="top">
      <div className="grid-bg"></div>

      <div className="orb h-[500px] w-[500px] -top-32 -right-40 bg-sky-200/60"></div>
      <div className="orb h-[400px] w-[400px] top-40 -left-32 bg-indigo-200/50"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="t-display text-4xl text-slate-900 sm:text-6xl lg:text-7xl">
              רוצה להתקרב לה׳?
              <span className="mt-2 block gradient-text">
                לא צריך לדעת הכול כדי להתחיל.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="t-body mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              מתחזקים נועד בשבילך — אם אתה בתחילת הדרך, מחפש תשובה לשאלה שמטרידה אותך, 
              רוצה להתחזק ביום־יום, או פשוט צריך קצת חיזוק עכשיו.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#quiz-section"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold sm:text-[15px]"
            >
              אני לא יודע מאיפה להתחיל
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="/ask"
              className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-medium text-slate-700 sm:text-[15px]"
            >
              <MessageCircle className="h-4 w-4 text-slate-400" />
              יש לי שאלה
            </a>
          </Reveal>

          <Reveal delay={300} className="mt-16 mx-auto max-w-2xl">
            <div className="rounded-2xl bg-white p-3 shadow-xl shadow-slate-200/50 sm:p-4 border border-slate-100">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <Search className="absolute right-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="מה היית רוצה לשאול? (למשל: איך מתחילים לשמור שבת?)"
                  className="w-full rounded-xl bg-slate-50 py-4 pr-12 pl-4 text-[15px] text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                />
                <button
                  type="submit"
                  className="absolute left-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  חפש
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
