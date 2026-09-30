import { Search, ScrollText } from "lucide-react";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-sky-600">
            יוזמות מיוחדות
          </span>
          <h2 className="t-display mt-4 text-3xl text-slate-900 sm:text-5xl">
            אנחנו כאן
            <span className="block text-slate-400">בשביל לעזור</span>
          </h2>
          <p className="t-body mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            שירותים ללא עלות שנועדו להקל עליכם ולתת הכוונה מקצועית ואישית.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
          <Reveal delay={0}>
            <article className="card group flex h-full flex-col p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-600 mb-6">
                <ScrollText className="h-6 w-6" />
              </span>
              <h3 className="t-title text-xl text-slate-900">
                בדיקת מזוזות חינם בכל הארץ
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
                המזוזה היא השמירה של הבית. אנו מציעים שירות של בדיקת מזוזות מקצועית, ללא כל עלות. נציג שלנו יגיע עד אליך, יאסוף ויבדוק, כדי לוודא שהבית שלכם שמור ומוגן.
              </p>
              <div className="mt-auto pt-8">
                <a
                  href="#join"
                  className="btn-accent inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                >
                  הזמן בדיקת מזוזות
                </a>
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="card group flex h-full flex-col p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-indigo-600 mb-6">
                <Search className="h-6 w-6" />
              </span>
              <h3 className="t-title text-xl text-slate-900">
                מצא לך רב (עשה לך רב)
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
                מתחזקים בתחילת הדרך? מחפשים דמות אב כדי להתייעץ איתו באופן אישי? הגעתם למקום הנכון. <strong>מתחזקים &gt; ייעוץ למתחזקים באמונה.</strong> נשמח לחבר אתכם למלווה רוחני המתאים בדיוק לכם.
              </p>
              <div className="mt-auto pt-8">
                <a
                  href="#join"
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                >
                  למציאת רב מלווה
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
