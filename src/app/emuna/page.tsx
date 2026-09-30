import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Sparkles, Brain, Scale, ShieldAlert, Navigation, Search, BookOpen, Star, SunMoon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "אמונה | מתחזקים",
  description: "אמונה היא לא רק לדעת שיש בורא עולם. היא שאלה עמוקה הרבה יותר.",
};

const CATEGORIES = [
  { title: "מי הוא הבורא?", desc: "היכרות בסיסית עם המושג אמונה בה׳.", icon: Star },
  { title: "למה בכלל להאמין?", desc: "טיעונים, מחשבות, שאלות ודרכי הסתכלות שונות.", icon: Search },
  { title: "השגחה פרטית", desc: "מהי השגחה? ומה אפשר ומה אי אפשר להסיק מאירועים בחיים?", icon: ShieldAlert },
  { title: "בחירה חופשית", desc: "האם האדם באמת חופשי? אם הכול ביד ה׳ — איפה הבחירה שלי?", icon: Scale },
  { title: "טוב ורע", desc: "למה יש רוע בעולם? איך היהדות מתמודדת עם השאלה?", icon: SunMoon },
  { title: "משמעות החיים", desc: "מה הופך חיים למשמעותיים?", icon: Navigation },
  { title: "תורה ומדע", desc: "איך מתמודדים עם שאלות על מדע, בריאה, אבולוציה ומסורת?", icon: Brain },
  { title: "נשמה ועולם הבא", desc: "מה המקורות היהודיים אומרים על הנשמה והחיים שלאחר המוות?", icon: Sparkles },
];

export default function EmunaPage() {
  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h1 className="t-display text-4xl text-slate-900 sm:text-5xl">אמונה מתחילה בשאלה.</h1>
            <div className="mt-6 text-lg text-slate-600 leading-relaxed space-y-3">
              <p>אמונה היא לא רק לדעת שיש בורא עולם. היא שאלה עמוקה הרבה יותר:</p>
              <p>איך אני מבין את העולם? מה המשמעות של החיים? האם יש לי תכלית? מה המקום שלי? איך אני מתמודד עם טוב ורע? ומה הקשר שלי עם ה׳?</p>
              <p className="font-semibold text-slate-800">כאן נבנה את עולם האמונה צעד אחר צעד.</p>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, idx) => (
              <a key={idx} href="#" className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-900/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 group-hover:scale-110 transition-transform">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="t-title text-xl text-slate-900">{cat.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-500">
                  {cat.desc}
                </p>
              </a>
            ))}
          </Reveal>

          <Reveal delay={300} className="mt-20">
            <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)", backgroundSize: "48px 48px" }}></div>
              <div className="relative z-10">
                <h2 className="t-display text-2xl sm:text-3xl text-white">לא מחפשים רק תשובות. מחפשים דרך לחשוב.</h2>
                <p className="mt-4 max-w-2xl mx-auto text-slate-300 leading-relaxed text-lg">
                  המטרה שלנו היא לא לתת לך משפט קסם לכל שאלה, אלא לעזור לך ללמוד לחשוב על שאלות אמונה בצורה עמוקה. 
                  מותר לשאול, מותר לחקור, ומותר לבנות אמונה מתוך הבנה.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/qa" className="btn-primary bg-white text-slate-900 inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[15px] font-semibold hover:bg-slate-100">
                    <BookOpen className="h-4 w-4" />
                    קרא שאלות ותשובות
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
