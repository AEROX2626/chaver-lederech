import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { HelpCircle, ChevronLeft } from "lucide-react";

export const metadata = {
  title: "שאלות ותשובות | מתחזקים",
  description: "כאן אפשר לשאול בכנות, בלי להתבייש ובלי לפחד משאלות קשות.",
};

const CATEGORIES = [
  "אמונה בבורא",
  "השגחה פרטית",
  "תפילה",
  "סבל בעולם",
  "שאלות וספקות",
  "תורה ומדע",
  "משמעות החיים",
  "נשמה ועולם הבא",
];

const QUESTIONS = [
  { id: 1, title: "אם ה׳ טוב, למה קורים דברים רעים?", cat: "סבל בעולם" },
  { id: 2, title: "למה התפילה שלי לא נענית?", cat: "תפילה" },
  { id: 3, title: "איך אפשר להאמין כשיש ספקות?", cat: "שאלות וספקות" },
  { id: 4, title: "נפלתי שוב. איך מתחילים מחדש?", cat: "תפילה" }, // Needs better cat, but fine for demo
  { id: 5, title: "האם ה׳ באמת מקבל אותי אחרי כל מה שעשיתי?", cat: "השגחה פרטית" },
  { id: 6, title: "איך מתחילים לשמור שבת בלי לשנות את כל החיים ביום אחד?", cat: "שאלות וספקות" },
];

export default function QAPage() {
  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-medium text-slate-600">
              <HelpCircle className="h-3.5 w-3.5 text-sky-500" />
              שאלות ותשובות
            </span>
            <h1 className="t-display mt-6 text-4xl text-slate-900 sm:text-5xl">
              השאלות שלא תמיד נעים לשאול
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              כאן אפשר לשאול בכנות, בלי להתבייש ובלי לפחד משאלות קשות. ריכזנו את השאלות הנפוצות ביותר שעולות בתחילת הדרך או בצמתים של ספק.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-4">
            <Reveal className="lg:col-span-1">
              <div className="sticky top-24 rounded-3xl bg-white p-6 border border-slate-200">
                <h3 className="t-title text-lg text-slate-900 mb-4">קטגוריות</h3>
                <ul className="space-y-2 text-[14.5px] font-medium text-slate-600">
                  <li>
                    <a href="#" className="block rounded-lg bg-slate-50 px-3 py-2 text-sky-600 transition">
                      הכל
                    </a>
                  </li>
                  {CATEGORIES.map((cat, idx) => (
                    <li key={idx}>
                      <a href="#" className="block rounded-lg px-3 py-2 transition hover:bg-slate-50 hover:text-slate-900">
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                {QUESTIONS.map((q, idx) => (
                  <Reveal key={idx} delay={idx * 50}>
                    <a href={`/qa/${q.id}`} className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100">
                      <div>
                        <span className="text-[12px] font-semibold text-sky-600">{q.cat}</span>
                        <h4 className="t-title mt-3 text-lg text-slate-900 group-hover:text-sky-700 transition-colors">
                          {q.title}
                        </h4>
                      </div>
                      <div className="mt-6 flex items-center justify-end">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                          <ChevronLeft className="h-4 w-4" />
                        </span>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
