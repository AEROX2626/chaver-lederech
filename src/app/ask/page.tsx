import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { MessageCircle, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "שאל שאלה | מתחזקים",
  description: "גם שאלות קשות, מביכות או כאלה שמעולם לא העזת לשאול — אפשר לשאול כאן.",
};

export default function AskPage() {
  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h1 className="t-display text-4xl text-slate-900 sm:text-5xl">יש לך שאלה? תשאל.</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
              גם שאלות קשות, מביכות או כאלה שמעולם לא העזת לשאול — אפשר לשאול כאן. אנחנו מבטיחים לקרוא, לא לשפוט, ולהשתדל לענות מהלב.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-14">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50">
              <form className="space-y-6">
                <div>
                  <label htmlFor="question" className="mb-2 block text-sm font-semibold text-slate-900">
                    מה היית רוצה לשאול?
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    rows={5}
                    placeholder="כתוב כאן כל מה שעל הלב..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-[15px] text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-500/20 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-900">
                    נושא השאלה (אופציונלי)
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="">בחר נושא...</option>
                    <option value="emuna">אמונה וספקות</option>
                    <option value="prayer">תפילה</option>
                    <option value="shabbat">שבת</option>
                    <option value="mitzvot">מצוות ומעשים</option>
                    <option value="family">זוגיות ומשפחה</option>
                    <option value="other">אחר</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-sky-50/50 p-4 border border-sky-100">
                  <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0" />
                  <p className="text-[13px] leading-relaxed text-slate-600">
                    אפשר לשלוח את השאלה באופן אנונימי לחלוטין. אם תרצה שנענה לך אישית, תוכל להוסיף כתובת מייל או טלפון.
                  </p>
                </div>

                <div>
                  <label htmlFor="contact" className="mb-2 block text-sm font-semibold text-slate-900">
                    איך לחזור אליך? (אופציונלי)
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="מייל או מספר טלפון"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <button
                  type="button"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-[15px] font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  שלח שאלה
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
