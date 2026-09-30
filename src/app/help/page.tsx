import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { MessageCircle, HeartHandshake, Compass, Users, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "עזרה אישית | מתחזקים",
  description: "יש דברים שקשה לכתוב בגוגל. פה אפשר לדבר איתנו דיסקרטית.",
};

const HELP_OPTIONS = [
  {
    title: "אני רוצה לשאול שאלה",
    desc: "באופן דיסקרטי ואנונימי. כל שאלה שעולה לך לראש, בלי להרגיש לא בנוח.",
    icon: MessageCircle,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    title: "אני רוצה לדבר עם רב",
    desc: "כאשר מדובר בשאלה תורנית או הלכתית שדורשת התייעצות אישית.",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "אני מחפש הכוונה",
    desc: "כאשר מדובר בתהליך אישי או רוחני ואתה לא יודע מאיפה כדאי להמשיך.",
    icon: Compass,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "קשה לי ואני צריך תמיכה",
    desc: "הכוונה וחיבור לגורמי מקצוע מתאימים ברגעי משבר וקושי רגשי.",
    icon: HeartHandshake,
    color: "text-rose-600",
    bg: "bg-rose-50",
  }
];

export default function HelpPage() {
  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h1 className="t-display text-4xl text-slate-900 sm:text-5xl">
              לא תמיד צריך עוד תשובה.<br className="hidden sm:block"/> לפעמים צריך מישהו לדבר איתו.
            </h1>
            <div className="mt-6 text-lg text-slate-600 leading-relaxed space-y-3">
              <p>יש דברים שקשה לכתוב בגוגל.</p>
              <p>יש שאלות אמונה. יש משברים. יש בלבול. יש זוגיות. יש משפחה. יש החלטות. יש רגעים שבהם פשוט צריך שמישהו יקשיב.</p>
              <p className="font-semibold text-slate-800">אתה לא חייב לעבור את זה לבד.</p>
            </div>
          </Reveal>

          <div className="mt-20 grid gap-6 sm:grid-cols-2">
            {HELP_OPTIONS.map((opt, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <a href="/ask" className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-slate-200/50">
                  <div>
                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${opt.bg} ${opt.color}`}>
                      <opt.icon className="h-7 w-7" />
                    </div>
                    <h3 className="t-title text-2xl text-slate-900 group-hover:text-sky-700 transition-colors">{opt.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                      {opt.desc}
                    </p>
                  </div>
                  <div className="mt-8 font-medium text-sky-600 flex items-center gap-2">
                    התחל שיחה &larr;
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-24 max-w-4xl mx-auto">
            <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-8 flex gap-5 flex-col sm:flex-row items-start">
              <div className="shrink-0 rounded-full bg-amber-100 p-3 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="t-title text-lg text-slate-900 mb-2">מתחזקים אינו מחליף רב, פוסק או איש מקצוע.</h4>
                <p className="text-[14px] leading-relaxed text-slate-700">
                  התוכן באתר נועד להעניק מידע, כיוון וחיזוק. בשאלות הלכתיות אישיות מומלץ לקבל תשובה מרב מוסמך. במצבים נפשיים או אישיים מורכבים יש לפנות לאיש מקצוע מתאים.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
