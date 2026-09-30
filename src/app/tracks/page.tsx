import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ListChecks, Flame, CalendarHeart, RefreshCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { TRACKS_DB } from "@/data/tracks";

export const metadata = {
  title: "המסלולים שלנו | מתחזקים",
  description: "מידע נותן תשובות. תהליך יוצר שינוי. מסלולים קצרים וברורים בקצב שלך.",
};

const iconMap = [Flame, Sparkles, CalendarHeart, RefreshCcw, ListChecks];
const colorMap = [
  { color: "text-orange-500", bg: "bg-orange-50" },
  { color: "text-sky-500", bg: "bg-sky-50" },
  { color: "text-rose-500", bg: "bg-rose-50" },
  { color: "text-emerald-500", bg: "bg-emerald-50" },
  { color: "text-indigo-500", bg: "bg-indigo-50" }
];

export default function TracksPage() {
  const tracksList = Object.values(TRACKS_DB).map((t, i) => {
    return {
      ...t,
      icon: iconMap[i % iconMap.length],
      color: colorMap[i % colorMap.length].color,
      bg: colorMap[i % colorMap.length].bg
    }
  });

  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h1 className="t-display text-4xl text-slate-900 sm:text-5xl">לא רק לקרוא. לעבור דרך.</h1>
            <div className="mt-6 text-lg text-slate-600 leading-relaxed space-y-3">
              <p>מידע נותן תשובות. תהליך יוצר שינוי.</p>
              <p>לכן יצרנו תהליכים וצעדים קצרים וברורים שאפשר לעבור בקצב שלך.</p>
            </div>
          </Reveal>

          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            {tracksList.map((track, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="flex flex-col h-full justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${track.bg} ${track.color}`}>
                        <track.icon className="h-7 w-7" />
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[12px] font-semibold text-slate-600">
                        {track.durationDays} ימים
                      </span>
                    </div>
                    <h3 className="t-title text-2xl text-slate-900">{track.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{track.description}</p>
                  </div>
                  
                  <div className="mt-8">
                    <Link href={`/tracks/${track.id}`} className="flex btn-ghost w-full justify-center rounded-xl py-3 border border-slate-200 font-medium text-slate-700 hover:bg-slate-50">
                      התחל עכשיו
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
