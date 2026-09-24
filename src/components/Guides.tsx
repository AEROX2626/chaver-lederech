import { MoonStar, HandHeart, Brain, Home, ArrowLeft } from "lucide-react";
import Reveal from "./Reveal";

export default function Guides() {
  return (
    <section id="guides" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-sky-600">
            מדריכים בגובה העיניים
          </span>
          <h2 className="t-display mt-4 text-3xl text-slate-900 sm:text-5xl">
            מתחילים מהמקום
            <span className="block text-slate-400">שנוח לך</span>
          </h2>
          <p className="t-body mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            כל כרטיסייה היא צעד קטן אחד. בוחרים מה שמדבר אליך, מתחילים, וממשיכים
            רק אם בא לך.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0}>
            <article className="card group flex h-full flex-col p-6">
              <span className="card-icon grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <MoonStar className="h-5 w-5" />
              </span>
              <h3 className="t-title mt-5 text-base text-slate-900">
                השבת הראשונה שלי
              </h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-600">
                קידוש קל, הדלקת נרות ויצירת שקט טכנולוגי. שעה אחת של אוויר — בלי
                לוותר על מי שאתם.
              </p>
              <a
                href="#join"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-600 transition group-hover:gap-2.5"
              >
                למדריך המלא <ArrowLeft className="h-3.5 w-3.5" />
              </a>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className="card group flex h-full flex-col p-6">
              <span className="card-icon grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <HandHeart className="h-5 w-5" />
              </span>
              <h3 className="t-title mt-5 text-base text-slate-900">
                מצוות יומיות בקלות
              </h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-600">
                תפילין בבוקר, ברכות השחר וקריאת שמע. שתי דקות ביום — מספיק כדי
                להתחיל.
              </p>
              <a
                href="#join"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-600 transition group-hover:gap-2.5"
              >
                למדריך המלא <ArrowLeft className="h-3.5 w-3.5" />
              </a>
            </article>
          </Reveal>

          <Reveal delay={160}>
            <article className="card group flex h-full flex-col p-6">
              <span className="card-icon grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <Brain className="h-5 w-5" />
              </span>
              <h3 className="t-title mt-5 text-base text-slate-900">לב ומחשבה</h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-600">
                למה אנחנו עושים את זה? טעמי המצוות בשפה מודרנית, בלי הטפות ובלי
                מונחים מבהילים.
              </p>
              <a
                href="#join"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-600 transition group-hover:gap-2.5"
              >
                למדריך המלא <ArrowLeft className="h-3.5 w-3.5" />
              </a>
            </article>
          </Reveal>

          <Reveal delay={240}>
            <article className="card group flex h-full flex-col p-6">
              <span className="card-icon grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <Home className="h-5 w-5" />
              </span>
              <h3 className="t-title mt-5 text-base text-slate-900">בית ומשפחה</h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-600">
                צעדים ראשונים בכשרות, שלום בית וזוגיות. איך עושים את זה ביחד,
                בסבלנות ובכבוד.
              </p>
              <a
                href="#join"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-600 transition group-hover:gap-2.5"
              >
                למדריך המלא <ArrowLeft className="h-3.5 w-3.5" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
