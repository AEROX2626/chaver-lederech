import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ListChecks, Flame, CalendarHeart, RefreshCcw, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "המסלולים שלנו | מתחזקים",
  description: "מידע נותן תשובות. תהליך יוצר שינוי. מסלולים קצרים וברורים בקצב שלך.",
};

const TRACKS = [
  {
    title: "7 ימים של התחזקות",
    desc: "7 ימים. 7 צעדים. בלי מהפכות.",
    days: "7 ימים",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "מתחילים מאפס",
    desc: "למי שמעולם לא למד יהדות בצורה מסודרת.",
    days: "10 פרקים",
    icon: Sparkles,
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    title: "30 יום של התקרבות",
    desc: "כל יום: תוכן קצר + פעולה קטנה.",
    days: "30 יום",
    icon: CalendarHeart,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    title: "חוזרים לעצמנו",
    desc: "למי שהתרחק ורוצה למצוא מחדש נקודת חיבור.",
    days: "7 ימים",
    icon: RefreshCcw,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    title: "מתחזקים באמונה",
    desc: "תהליך עמוק סביב בורא עולם, משמעות והשגחה.",
    days: "14 יום",
    icon: ListChecks,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  }
];

export default function TracksPage() {
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
            {TRACKS.map((track, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="flex flex-col h-full justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${track.bg} ${track.color}`}>
                        <track.icon className="h-7 w-7" />
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[12px] font-semibold text-slate-600">
                        {track.days}
                      </span>
                    </div>
                    <h3 className="t-title text-2xl text-slate-900">{track.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{track.desc}</p>
                  </div>
                  
                  <div className="mt-8">
                    <button className="btn-ghost w-full justify-center rounded-xl py-3 border border-slate-200 font-medium text-slate-700 hover:bg-slate-50">
                      התחל עכשיו
                    </button>
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
