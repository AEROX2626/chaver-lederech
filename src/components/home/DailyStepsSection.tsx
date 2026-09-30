import { Plus, Sparkles } from "lucide-react";
import Reveal from "../Reveal";

const STEPS = [
  "ברכה אחת נוספת",
  "5 דקות של לימוד תורה",
  "תפילה קצרה",
  "הדלקת נרות",
  "קידוש",
  "מעשה חסד",
  "צדקה",
  "כיבוד הורים",
  "שמירת העיניים",
  "קריאת תהילים"
];

export default function DailyStepsSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
            מתחזקים ביום־יום
          </span>
          <h2 className="t-display mt-4 text-3xl text-slate-900 sm:text-4xl">
            דברים קטנים שעושים הבדל גדול
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            לא תמיד צריך לשנות את כל החיים. לפעמים צעד קטן אחד הוא התחלה של שינוי גדול.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {STEPS.map((step, idx) => (
            <Reveal key={idx} delay={idx * 30}>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[14px] font-medium text-slate-700">
                <Plus className="h-3 w-3 text-emerald-500" />
                {step}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-16">
          <div className="inline-flex flex-col items-center rounded-3xl bg-emerald-50/50 border border-emerald-100 p-8 sm:p-10">
            <h3 className="t-title text-xl text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              הצעד שלי להיום
            </h3>
            <p className="mt-2 text-[14px] text-slate-500">
              מוכן לבחור צעד אחד קטן שמתאים לך היום?
            </p>
            <a
              href="/daily/random"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-6 py-3 text-sm font-semibold transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-900/10"
            >
              בחר לי צעד קטן
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
