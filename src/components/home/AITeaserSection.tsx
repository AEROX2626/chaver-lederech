import { Bot, Sparkles } from "lucide-react";
import Reveal from "../Reveal";

export default function AITeaserSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-8 sm:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Bot className="h-40 w-40 text-white" />
            </div>
            
            <div className="relative z-10 text-center sm:text-right flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-2.5 py-1 text-[11px] font-semibold text-indigo-300 border border-indigo-400/20">
                  <Sparkles className="h-3 w-3" />
                  בקרוב
                </span>
                <h2 className="t-display mt-4 text-2xl sm:text-3xl text-white">
                  העוזר האישי שלך להתחזקות
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-300">
                  אנחנו עובדים על פיתוח של עוזר חכם שיוכל להקשיב לך, לענות על שאלות 24/7 בשפה אנושית ולא שיפוטית, ולהציע לך מסלולים מותאמים אישית. לא פוסק הלכה, פשוט חבר לדרך.
                </p>
              </div>
              <div className="shrink-0">
                <button className="btn-primary cursor-not-allowed opacity-80 inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3 text-sm font-semibold">
                  <Bot className="h-4 w-4" />
                  הצצה לעוזר החכם
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
