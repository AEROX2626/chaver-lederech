import { Sprout, Heart, HelpCircle, CloudRain, RotateCcw, UserPlus } from "lucide-react";
import Reveal from "../Reveal";

const CARDS = [
  {
    icon: Sprout,
    title: "אני רוצה להתחיל",
    desc: "מושגים בסיסיים, אמונה, תפילה, שבת, ברכות ומדריכים למתחילים.",
    href: "/start",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Heart,
    title: "אני רוצה להתחזק",
    desc: "צעדים קטנים, הרגלים טובים, תפילה, לימוד, מצוות והתחזקות ביום־יום.",
    href: "/daily",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: HelpCircle,
    title: "יש לי שאלות באמונה",
    desc: "שאלות קשות, ספקות, תפילה, השגחה, תורה, סבל ומשמעות.",
    href: "/qa",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    icon: CloudRain,
    title: "קשה לי עכשיו",
    desc: "תכנים וחיזוק למצבים של משבר, בדידות, נפילה, אכזבה וקושי.",
    href: "/support",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: RotateCcw,
    title: "התרחקתי ואני רוצה לחזור",
    desc: "תוכן למי שרוצה להתחיל מחדש, בלי לחץ ובלי תחושה שהוא צריך להיות כבר במקום אחר.",
    href: "/return",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: UserPlus,
    title: "אני צריך לדבר עם מישהו",
    desc: "הכוונה לעזרה אישית, רב, מלווה או גורם מתאים בהתאם לצורך.",
    href: "/help",
    color: "text-slate-700",
    bg: "bg-slate-100",
  },
];

export default function JourneySection() {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="t-display text-3xl text-slate-900 sm:text-4xl">איפה אתה נמצא בדרך?</h2>
          <p className="mt-4 text-lg text-slate-600">
            לא משנה איפה אתה נמצא היום — אפשר להתחיל מכאן.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <a
                href={card.href}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-900/5"
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${card.bg} ${card.color} transition-transform group-hover:scale-110`}>
                  <card.icon className="h-6 w-6" />
                </span>
                <h3 className="t-title mt-6 text-xl text-slate-900">{card.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-500">
                  {card.desc}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
