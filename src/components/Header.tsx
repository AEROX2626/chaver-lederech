"use client";

import { useState } from "react";
import { Sun, MessageCircle, Menu } from "lucide-react";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900">
              <Sun className="h-4 w-4 text-white" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-slate-900">
                מתחזקים
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                בצעד קטן, ביחד
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            <a
              href="#guides"
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              מדריכים
            </a>
            <a
              href="#stories"
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              סיפורים
            </a>
            <a
              href="#faq"
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              שאלות נפוצות
            </a>
            <a
              href="#join"
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              מתחזקים
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/972500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold sm:inline-flex"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              שיחה בוואטסאפ
            </a>

            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="תפריט"
              aria-expanded={isMobileNavOpen}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isMobileNavOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <nav className="flex flex-col p-3">
              <a
                href="#guides"
                onClick={() => setIsMobileNavOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                מדריכים
              </a>
              <a
                href="#stories"
                onClick={() => setIsMobileNavOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                סיפורים
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileNavOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                שאלות נפוצות
              </a>
              <a
                href="#join"
                onClick={() => setIsMobileNavOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                מתחזקים
              </a>
              <a
                href="https://wa.me/972500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" /> שיחה בוואטסאפ
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
