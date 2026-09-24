import { ShieldCheck, HeartHandshake, Timer, Sparkles, Gift } from "lucide-react";

export default function Marquee() {
  return (
    <section className="border-y border-slate-200/80 bg-slate-50/50 py-6">
      <div className="marquee-mask overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          <span className="flex shrink-0 items-center gap-12 text-[11.5px] font-medium uppercase tracking-[0.22em] text-slate-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-500" /> פרטיות מלאה
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-2">
              <HeartHandshake className="h-3.5 w-3.5 text-sky-500" /> ליווי אישי
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-2">
              <Timer className="h-3.5 w-3.5 text-sky-500" /> בקצב שלך
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" /> בגובה העיניים
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-2">
              <Gift className="h-3.5 w-3.5 text-sky-500" /> בחינם תמיד
            </span>
            <span className="text-slate-300">·</span>
          </span>
          <span
            className="flex shrink-0 items-center gap-12 text-[11.5px] font-medium uppercase tracking-[0.22em] text-slate-400"
            aria-hidden="true"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-500" /> פרטיות מלאה
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-2">
              <HeartHandshake className="h-3.5 w-3.5 text-sky-500" /> ליווי אישי
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-2">
              <Timer className="h-3.5 w-3.5 text-sky-500" /> בקצב שלך
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" /> בגובה העיניים
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-2">
              <Gift className="h-3.5 w-3.5 text-sky-500" /> בחינם תמיד
            </span>
            <span className="text-slate-300">·</span>
          </span>
        </div>
      </div>
    </section>
  );
}
