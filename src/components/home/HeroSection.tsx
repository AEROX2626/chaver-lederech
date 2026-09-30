"use client";

import { Search, ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import Reveal from "../Reveal";
import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QA_DB } from "@/data/qa";
import { GUIDES_DB } from "@/data/guides";
import { TRACKS_DB } from "@/data/tracks";

const ALL_SEARCH_ITEMS = [
  ...Object.values(QA_DB).map(q => ({ id: q.id, title: q.title, type: 'שאלה', url: `/qa/${q.id}` })),
  ...Object.values(GUIDES_DB).map(g => ({ id: g.id, title: g.title, type: 'מדריך', url: `/guides/${g.id}` })),
  ...Object.values(TRACKS_DB).map(t => ({ id: t.id, title: t.title, type: 'מסלול', url: `/tracks/${t.id}` })),
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Just go to the QA page for now if user hits enter instead of clicking a suggestion
      router.push(`/qa`);
    }
  };

  const filteredItems = useMemo(() => {
    if (!query.trim()) return [];
    return ALL_SEARCH_ITEMS.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // show top 5 results
  }, [query]);

  return (
    <section className="relative pt-20 pb-32 sm:pt-28 sm:pb-40" id="top">
      {/* Background container with overflow hidden to clip orbs, while allowing dropdown to overflow section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="grid-bg"></div>
        <div className="orb h-[500px] w-[500px] -top-32 -right-40 bg-sky-200/60"></div>
        <div className="orb h-[400px] w-[400px] top-40 -left-32 bg-indigo-200/50"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              מתחזקים הוא המקום שלך בדרך — לשאול, להבין, ללמוד, להתחזק ולעשות צעד קטן קדימה. 
              בלי לחץ. בלי שיפוטיות. בלי צורך להיות כבר במקום אחר.
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
            <div className="relative rounded-2xl bg-white p-3 shadow-xl shadow-slate-200/50 sm:p-4 border border-slate-100" ref={dropdownRef}>
              <form onSubmit={handleSearch} className="relative flex items-center">
                <Search className="absolute right-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="מה עובר לך בראש? (למשל: אני רוצה להתחיל לשמור שבת...)"
                  className="w-full rounded-xl bg-slate-50 py-4 pr-12 pl-4 text-[15px] text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                />
                <button
                  type="submit"
                  className="absolute left-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  חפש
                </button>
              </form>

              {/* Autocomplete Dropdown */}
              {isFocused && query.trim() !== "" && (
                <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                  {filteredItems.length > 0 ? (
                    <ul className="py-2 text-right">
                      {filteredItems.map((item, idx) => (
                        <li key={idx}>
                          <Link 
                            href={item.url}
                            className="block px-6 py-3 hover:bg-slate-50 transition border-b border-slate-100 last:border-0"
                            onClick={() => setIsFocused(false)}
                          >
                            <span className="text-[11px] font-semibold text-sky-600 block mb-0.5">{item.type}</span>
                            <span className="text-[15px] text-slate-800 font-medium">{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-slate-500 text-[14px]">לא מצאנו תוצאות לשאלה הזאת.</p>
                      <Link href="/ask" className="text-sky-600 text-[14px] font-semibold mt-2 inline-block hover:underline" onClick={() => setIsFocused(false)}>
                        רוצה לשאול אותנו?
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
