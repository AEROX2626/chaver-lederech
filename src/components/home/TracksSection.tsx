import { Route, Clock, BarChart } from "lucide-react";
import Reveal from "../Reveal";
import { TRACKS_DB } from "@/data/tracks";

const colorMap = [
  { color: "text-sky-500", bg: "bg-sky-50" },
  { color: "text-indigo-500", bg: "bg-indigo-50" },
  { color: "text-rose-500", bg: "bg-rose-50" },
];

export default function TracksSection() {
  const tracksList = Object.values(TRACKS_DB).map((t, i) => ({
    ...t,
    bg: colorMap[i % colorMap.length].bg,
    color: colorMap[i % colorMap.length].color
  }));

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="t-display text-3xl text-slate-900 sm:text-4xl">מסע קטן בכל יום. מותאם לך.</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-xl">
                היהדות לא בנויה על קפיצות ענק. היא בנויה על צעדים קטנים.
                בחר מסלול קצר שמותאם לחיים שלך, וקבל בכל יום משימה קטנה, צעד אחד קדימה.
              </p>
            </div>
            <a href="/tracks" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
              לכל המסלולים והנושאים &larr;
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracksList.map((track, idx) => (
            <Reveal key={idx} delay={idx * 100} className="h-full">
              <a href={`/tracks/${track.id}`} className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${track.bg} ${track.color}`}>
                  <Route className="h-6 w-6" />
                </div>
                <h3 className="t-title text-xl text-slate-900">{track.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-500 line-clamp-3">
                  {track.description}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-4 text-[12px] font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {track.durationDays} ימים
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart className="h-3.5 w-3.5" /> {track.difficulty}
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
