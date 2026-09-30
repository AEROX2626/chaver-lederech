import { HelpCircle, ArrowLeft } from "lucide-react";
import Reveal from "../Reveal";

const QUESTIONS = [
  "אם ה׳ טוב, למה קורים דברים רעים?",
  "למה התפילה שלי לא נענית?",
  "איך אפשר להאמין כשיש ספקות?",
  "מה עושים כשאין לי חשק להתפלל?",
  "נפלתי שוב. איך מתחילים מחדש?",
  "האם ה׳ באמת מקבל אותי אחרי כל מה שעשיתי?",
  "איך מתחילים לשמור שבת בלי לשנות את כל החיים ביום אחד?",
  "איך יודעים שהתשובה שלי התקבלה?",
];

export default function HardQuestionsSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)", backgroundSize: "48px 48px" }}></div>
      <div className="orb h-[400px] w-[400px] -top-32 -right-32 bg-sky-500/20"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-medium text-sky-300">
                <HelpCircle className="h-3.5 w-3.5" />
                שאלות באמונה
              </span>
              <h2 className="t-display mt-6 text-3xl sm:text-5xl">
                השאלות שלא תמיד נעים לשאול
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                כאן אפשר לשאול בכנות, בלי להתבייש ובלי לפחד משאלות קשות. אין שאלה שאסור לשאול, ואין ספק שאין לו מקום.
              </p>
              
              <div className="mt-10">
                <a href="/qa" className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 text-sm font-semibold transition hover:bg-slate-100">
                  לכל השאלות והתשובות
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {QUESTIONS.map((q, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <a href={`/qa/${idx}`} className="block rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition hover:border-sky-500/50 hover:bg-slate-800 backdrop-blur-sm">
                  <p className="text-[14px] leading-snug text-slate-200">
                    "{q}"
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
