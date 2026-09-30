import { Route, Clock, BarChart } from "lucide-react";
import Reveal from "../Reveal";

const TRACKS = [
  {
    title: "7 ימים של התחזקות",
    desc: "בכל יום פעולה אחת קטנה שיכולה לשנות את איך שהשבוע שלך נראה.",
    duration: "שבוע",
    level: "קל",
    bg: "bg-sky-50",
  },
  {
    title: "מתחילים מאפס",
    desc: "מושגי יסוד, אמונה, תפילה, ברכות, שבת וחיים יהודיים. המסלול המושלם להתחלה.",
    duration: "ללא הגבלה",
    level: "בסיסי",
    bg: "bg-indigo-50",
  },
  {
    title: "30 יום של התקרבות",
    desc: "תהליך הדרגתי עם משימות קטנות ותוכן יומי לבניית הרגלים חדשים.",
    duration: "חודש",
    level: "בינוני",
    bg: "bg-rose-50",
  },
  {
    title: "חוזרים לעצמנו",
    desc: "מסלול למי שהתרחק ורוצה להתחיל מחדש, בקצב שלו ובלי רגשות אשם.",
    duration: "שבועיים",
    level: "רך",
    bg: "bg-amber-50",
  },
];

export default function TracksSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="t-display text-3xl text-slate-900 sm:text-4xl">לא רק לקרוא. לעבור דרך.</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-xl">
                מידע נותן תשובות. תהליך יוצר שינוי.
                בחרנו תהליכים מובנים שיקחו אותך צעד אחר צעד, בקצב שלך.
              </p>
            </div>
            <a href="/tracks" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
              לכל התהליכים והצעדים &larr;
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRACKS.map((track, idx) => (
            <Reveal key={idx} delay={idx * 100} className="h-full">
              <a href={`/tracks/${idx}`} className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${track.bg} text-slate-700`}>
                  <Route className="h-6 w-6" />
                </div>
                <h3 className="t-title text-xl text-slate-900">{track.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-500 line-clamp-3">
                  {track.desc}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-4 text-[12px] font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {track.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart className="h-3.5 w-3.5" /> {track.level}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
