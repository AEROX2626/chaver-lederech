import { MessageCircle, UserCheck } from "lucide-react";
import Reveal from "../Reveal";

export default function PersonalHelpSection() {
  return (
    <section className="py-24 bg-sky-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)", backgroundSize: "48px 48px" }}></div>
      <div className="orb h-[600px] w-[600px] -bottom-40 -left-40 bg-sky-500/30"></div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[12px] font-medium text-sky-200">
            אנחנו כאן בשבילך
          </span>
          <h2 className="t-display mt-6 text-3xl sm:text-5xl">
            לא מצאת תשובה? אל תישאר עם זה לבד.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-sky-100 max-w-2xl mx-auto">
            יש שאלות שלא תמיד מספיק לקרוא עליהן. לפעמים צריך לדבר עם אדם. אנחנו כאן כדי לחבר אותך לאוזן קשבת, לייעוץ או להכוונה מתאימה — דיסקרטי וללא עלות.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/ask?anonymous=true" className="btn-accent inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold">
            <MessageCircle className="h-4 w-4" />
            שאל שאלה באופן אנונימי
          </a>
          <a href="/help" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-800/50 px-7 py-4 text-sm font-semibold text-white transition hover:bg-sky-800 backdrop-blur-sm">
            <UserCheck className="h-4 w-4" />
            אני רוצה לדבר עם מישהו
          </a>
        </Reveal>
      </div>
    </section>
  );
}
