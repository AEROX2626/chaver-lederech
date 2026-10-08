"use client";

import { useState } from "react";
import { Sun, MessageCircle, Menu } from "lucide-react";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900">
              <Sun className="h-4 w-4 text-white" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-slate-900">
                מתחזקים
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                צעד קטן, כל יום
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            <a href="/start" className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">התחלה</a>
            <a href="/qa" className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">שאלות ותשובות</a>
            <a href="/emuna" className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">אמונה</a>
            <a href="/daily" className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">ביום־יום</a>
            <a href="/tracks" className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">מסלולים</a>
            <a href="/stories" className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">סיפורים</a>
            <a href="/help" className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">מרכז תמיכה</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="/ask-rabbi" className="hidden items-center gap-2 rounded-lg bg-[#25D366] text-white px-4 py-2 text-[13px] font-bold sm:inline-flex transition hover:bg-[#20bd5a] shadow-sm shadow-[#25D366]/20">
              <MessageCircle className="h-4 w-4" />
              שאל את הרב
            </a>

            <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} aria-label="תפריט" aria-expanded={isMobileNavOpen} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isMobileNavOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <nav className="flex flex-col p-3">
              <a href="/start" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">התחלה</a>
              <a href="/qa" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">שאלות ותשובות</a>
              <a href="/emuna" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">אמונה</a>
              <a href="/daily" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">ביום־יום</a>
              <a href="/tracks" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">מסלולים</a>
              <a href="/stories" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">סיפורים מהשטח</a>
              <a href="/help" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">מרכז תמיכה</a>
              <a href="/ask-rabbi" onClick={() => setIsMobileNavOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white px-4 py-3 text-sm font-bold shadow-sm shadow-[#25D366]/20">
                <MessageCircle className="h-5 w-5" /> שאל את הרב בווטסאפ
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
