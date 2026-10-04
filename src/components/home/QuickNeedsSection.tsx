import { BookHeart, MessageSquare, BookOpen, Flame, Footprints, Lightbulb } from "lucide-react";
import Reveal from "../Reveal";

const NEEDS = [
  { icon: BookHeart, label: "תפילה קצרה", href: "/daily" },
  { icon: Flame, label: "מילה של חיזוק", href: "/daily" },
  { icon: MessageSquare, label: "מאגר שאלות ותשובות", href: "/qa" },
  { icon: BookOpen, label: "סיפורים אישיים", href: "/stories" },
  { icon: Lightbulb, label: "דבר תורה קצר", href: "/daily" },
  { icon: Footprints, label: "צעד קטן להיום", href: "/daily" },
];

export default function QuickNeedsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="t-display text-2xl text-slate-900 sm:text-3xl">מה אתה מחפש עכשיו?</h2>
          <p className="mt-3 text-[15px] text-slate-500">
            לפעמים צריך רק קצה חוט.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {NEEDS.map((need, idx) => (
            <a
              key={idx}
              href={need.href}
              className="group flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-3 text-[14px] font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-900 shadow-sm"
            >
              <need.icon className="h-4 w-4 text-sky-500 group-hover:scale-110 transition-transform" />
              {need.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
