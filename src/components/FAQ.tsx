"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "אני רוצה להתחיל, אבל מפחד מהתגובה של המשפחה. מה עושים?",
    a: 'החשש הזה הוא הכי טבעי שיש, וכמעט כולם מגיעים איתו. הדרך שעובדת היא פשוטה: מתחילים בקטן ובשקט. צעד אחד שלא "רואים מבחוץ" — שעה בלי טלפון, ברכה לפני אוכל, רגע של שקט בשישי. עם הזמן הסביבה מרגישה את השינוי באווירה בבית הרבה לפני שהיא שומעת הצהרות.',
  },
  {
    q: "מותר לי לשמור שבת אבל עדיין להשאיר אור דולק?",
    a: 'כן. שמירת שבת היא לא "הכל או כלום". יש היום פתרונות פשוטים ומקובלים — שעוני שבת, מנורות עם טיימר, ומנהגים שמאפשרים לשמור על רוח השבת בלי להרגיש שאתם נלחמים במציאות. אף אחד לא יעמוד מעליך עם רשימת בדיקות.',
  },
  {
    q: "איך מתפללים אם אני לא מבין את המילים בסידור?",
    a: "מתחילים מהמקום שאתה מבין — וזה לגמרי לגיטימי. אפשר להתחיל מברכה אחת קצרה, ממודה אני בבוקר, או אפילו משיחה אישית משלך בשפה שלך. יש גם סידורים עם תרגום וביאור, וקיצורים שמתאימים בדיוק למי שמתחיל.",
  },
  {
    q: "זה עולה כסף? יש התחייבות?",
    a: "לא ולא. השיחה הראשונה, המדריכים והליווי — בחינם וללא התחייבות מכל סוג. אתם קובעים מתי מתחילים, באיזה קצב, ואם בכלל ממשיכים. אין מכירות, אין לחץ, ואין רשימות תפוצה.",
  },
  {
    q: "השיחה בוואטסאפ באמת אנונימית?",
    a: "כן. אתם לא צריכים למסור שם מלא, עיר או מקום עבודה. פרטי השיחה נשארים ביניכם לבין חבר הדרך שלכם בלבד, ולא מועברים לשום גורם אחר. אפשר גם למחוק את השיחה בכל רגע — בלי הסברים.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-sky-600">
            שאלות נפוצות
          </span>
          <h2 className="t-display mt-4 text-3xl text-slate-900 sm:text-5xl">
            שאלות שכולם שואלים
            <span className="block text-slate-400">(וזה בסדר גמור)</span>
          </h2>
          <p className="t-body mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            אין שאלה טיפשית. הנה כמה מהשאלות שאנחנו שומעים הכי הרבה.
          </p>
        </Reveal>

        <Reveal className="mt-12 rounded-2xl border border-slate-200 bg-white">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${
                  index !== FAQS.length - 1 ? "border-b border-slate-100" : ""
                } ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="faq-trigger flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                >
                  <span className="faq-q text-[14.5px] font-semibold text-slate-800 transition">
                    {faq.q}
                  </span>
                  <span className="faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500">
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </button>
                <div
                  className="faq-panel"
                  style={{
                    maxHeight: isOpen ? "200px" : "0", 
                  }}
                >
                  <p className="px-6 pb-6 text-[13.5px] leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
