import { Star } from "lucide-react";
import Reveal from "./Reveal";

export default function Stories() {
  return (
    <section id="stories" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-sky-600">
            סיפורים מהשטח
          </span>
          <h2 className="t-display mt-4 text-3xl text-slate-900 sm:text-5xl">
            מישהו כבר עשה
            <span className="block text-slate-400">את הצעד הראשון</span>
          </h2>
          <p className="t-body mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            שלושה סיפורים קצרים — בשמות בדויים, בהסכמה מלאה.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal delay={0}>
            <figure className="card flex h-full flex-col p-6">
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <blockquote className="mt-5 flex-1 text-[14.5px] leading-relaxed text-slate-700">
                "פחדתי שאם אתחיל, אצטרך להסביר לכולם למה. בפועל — התחלתי משעה
                בשישי, בלי להצהיר. המשפחה הרגישה את השינוי לפני ששמעה ממני מילה."
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-[13px] font-bold text-sky-700">
                  י׳
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-slate-900">
                    יואב, 34
                  </div>
                  <div className="text-[11.5px] text-slate-400">תל אביב</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <figure className="card flex h-full flex-col p-6">
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <blockquote className="mt-5 flex-1 text-[14.5px] leading-relaxed text-slate-700">
                "לא ידעתי איך להתפלל, והתביישתי לשאול. מתחזקים לימד אותי בלי לשפוט —
                בלי סידור, בלי מבטא. פשוט לדבר. זה שינה לי את הבוקר."
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-[13px] font-bold text-indigo-700">
                  נ׳
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-slate-900">
                    נועה, 28
                  </div>
                  <div className="text-[11.5px] text-slate-400">רמת גן</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={200}>
            <figure className="card flex h-full flex-col p-6">
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <blockquote className="mt-5 flex-1 text-[14.5px] leading-relaxed text-slate-700">
                "חשבתי שזה או הכול או כלום. גיליתי שאפשר גם אחרת — שאפשר לקחת
                את מה שמדבר אליי, ולשחרר את מה שלא. וזה בסדר."
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-[13px] font-bold text-emerald-700">
                  א׳
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-slate-900">
                    איתי, 41
                  </div>
                  <div className="text-[11.5px] text-slate-400">חיפה</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
