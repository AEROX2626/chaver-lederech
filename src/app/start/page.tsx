import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Search, Compass, BookOpen, Footprints, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "לא יודע מאיפה להתחיל? | מתחזקים",
  description: "יש הרבה מידע, יש הרבה דעות. צריך רק למצוא את הצעד הראשון שמתאים לך.",
};

const STEPS = [
  {
    title: "להבין מה אתה מחפש",
    desc: "אולי תמיד הרגשת שיש משהו מעבר. אולי קרה לך משהו שגרם לך לחשוב. אולי גדלת בלי הרבה קשר ליהדות ועכשיו משהו בך מתעורר. אולי אתה כבר מאמין ורוצה להעמיק. ואולי אתה פשוט מחפש שקט, משמעות וקשר. אין תשובה אחת נכונה. הסיבה שבגללה הגעת לכאן היא כבר התחלה.",
    icon: Search,
  },
  {
    title: "לבחור תחום אחד",
    desc: "אל תנסה לשנות הכול בבת אחת. אם תנסה ביום אחד להתחיל להתפלל, ללמוד, לשמור שבת, לשנות הרגלים ולהבין את כל היהדות — סביר להניח שפשוט תרגיש מוצף. בחר דבר אחד. תחום שמסקרן אותך. משהו שאתה מרגיש אליו חיבור. משהו שאתה מסוגל להתחיל ממנו.",
    icon: Compass,
  },
  {
    title: "ללמוד לפני שמחליטים",
    desc: "מותר לך קודם כל להבין. לא כל התחזקות חייבת להתחיל בקבלה. לפעמים השלב הראשון הוא פשוט ללמוד: מהי תפילה? למה שומרים שבת? מה המשמעות של ברכה? מהי אמונה? למה התורה מבקשת מאיתנו דברים מסוימים? ככל שמבינים יותר, קל יותר לבחור מתוך חיבור ולא מתוך לחץ.",
    icon: BookOpen,
  },
  {
    title: "לבחור צעד קטן",
    desc: "הצעד הראשון לא צריך להיות גדול. אפשר להתחיל מברכה אחת, תפילה קצרה, כמה דקות לימוד, הדלקת נרות שבת, או מעשה חסד. העיקר הוא לא הגודל. העיקר הוא להתחיל.",
    icon: Footprints,
  },
  {
    title: "לתת לזמן לעשות את שלו",
    desc: "התחזקות היא תהליך, לא מבחן. יהיו ימים שתצליח יותר, יהיו ימים שפחות. זה לא מבטל את הדרך. לא כל יום צריך להרגיש התקדמות. לפעמים עצם זה שלא ויתרת הוא ההתקדמות.",
    icon: Clock,
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
              <br />
              <span className="text-sky-600">בוא נתחיל מההתחלה.</span>
            </h1>
            <div className="mt-8 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto space-y-4">
              <p>יש הרבה מידע. יש הרבה דעות. יש הרבה דברים שאפשר לעשות.</p>
              <p>ולפעמים דווקא בגלל זה לא יודעים מאיפה להתחיל.</p>
              <p className="font-semibold text-slate-800">האמת היא שאתה לא צריך לדעת הכול. אתה גם לא צריך להתחיל הכול.</p>
              <p>צריך רק למצוא את הצעד הראשון שמתאים לך.</p>
            </div>
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
                      <h3 className="t-title text-xl text-slate-900">שלב {idx + 1} — {step.title}</h3>
                      <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={300} className="mt-24 text-center">
            <h2 className="t-title text-2xl text-slate-900">רוצה שנעזור לך למצוא את הצעד הראשון?</h2>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/tracks" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-[15px] font-semibold">
                למצוא את המסלול שלי
              </a>
              <a href="/ask" className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-[15px] font-medium text-slate-700">
                <MessageCircle className="h-4 w-4 text-slate-400" />
                לשאול שאלה
              </a>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
