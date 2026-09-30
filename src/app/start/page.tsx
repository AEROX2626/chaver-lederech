import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ListChecks, Heart, CheckCircle2, Navigation, MessageCircle } from "lucide-react";

export const metadata = {
  title: "לא יודע מאיפה להתחיל? | מתחזקים",
  description: "בדיוק בשביל זה אנחנו כאן. לא צריך לדעת שום דבר מראש. בואו נתחיל צעד צעד.",
};

const STEPS = [
  {
    title: "להבין מה חשוב לך",
    desc: "לפני שעושים משהו, כדאי לשבת רגע עם עצמך. מה משך אותך לחפש? איזה חלק ביהדות מסקרן אותך יותר? אולי השקט של השבת? התפילה? המצוות שבין אדם לחברו?",
    icon: Heart,
  },
  {
    title: "לבחור תחום אחד",
    desc: "הטעות הכי נפוצה היא לנסות לעשות הכל בבת אחת. זה לא עובד וזה בעיקר מלחיץ. תבחר רק תחום אחד שמרגיש לך נוח להתחיל ממנו.",
    icon: Navigation,
  },
  {
    title: "להתחיל מצעד קטן",
    desc: "צעד קטן הוא הצעד הכי חשוב. אולי להדליק נרות שבת 5 דקות לפני הזמן, אולי לומר פרק תהילים בבוקר, אולי להקדיש כמה שקלים לצדקה ביום. זהו.",
    icon: ListChecks,
  },
  {
    title: "להתמיד",
    desc: "הכוח נמצא ברצף. צעד קטן שעושים כל יום או כל שבוע, הופך להרגל ובונה את הקשר. בלי להעמיס עוד ועוד.",
    icon: CheckCircle2,
  },
  {
    title: "להוסיף בהדרגה",
    desc: "רק כשהצעד הראשון מרגיש טבעי ונוח — אפשר לחשוב על הצעד הבא. יש לך חיים שלמים לפניך, אין לאן למהר.",
    icon: CheckCircle2, // or similar
  },
];

export default function StartPage() {
  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[12px] font-medium text-sky-700">
              מתחילים מאפס
            </span>
            <h1 className="t-display mt-6 text-4xl text-slate-900 sm:text-5xl lg:text-6xl">
              לא יודע מאיפה להתחיל?
            </h1>
            <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              בדיוק בשביל זה אנחנו כאן. אתה לא צריך לדעת שום דבר מראש, ולא צריך להשתנות ביום אחד. כל מסע גדול מתחיל בצעד קטן.
            </p>
          </Reveal>

          <div className="mt-20 relative">
            <div className="absolute right-[27px] top-0 bottom-0 w-0.5 bg-slate-200"></div>

            <div className="space-y-16">
              {STEPS.map((step, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="relative flex items-start gap-6 group">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-slate-50 bg-sky-500 text-white shadow-lg transition-transform group-hover:scale-110">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="t-title text-xl text-slate-900">שלב {idx + 1} – {step.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={300} className="mt-24 text-center">
            <h2 className="t-title text-2xl text-slate-900">בוא נתחיל יחד</h2>
            <p className="mt-3 text-slate-600">אנחנו כאן כדי לעזור לך למצוא את הצעד הראשון שלך.</p>
            <div className="mt-8 flex justify-center">
              <a href="/tracks" className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-semibold">
                גלה את המסלולים שלנו
              </a>
              <a href="https://wa.me/972500000000" className="btn-ghost mr-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-[15px] font-medium text-slate-700">
                <MessageCircle className="h-4 w-4" />
                התייעץ איתנו בחינם
              </a>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
