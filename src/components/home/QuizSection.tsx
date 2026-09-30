"use client";

import { useState, useRef } from "react";
import {
  ArrowDown,
  Lock,
  Hand,
  Sparkles,
  Check,
  MoonStar,
  HandHeart,
  Brain,
  Compass,
  Sprout,
  Home,
  Footprints,
  Eye,
  HelpCircle,
  Mountain,
  Info,
  ShieldCheck,
  MessageCircle,
  RotateCcw,
  ArrowRight,
  Globe,
} from "lucide-react";
import Reveal from "../Reveal";

const WHATSAPP_NUMBER = "972500000000";

const RESULTS = {
  interest: {
    shabbat: {
      title: "השבת הראשונה שלך — בגרסה הרכה",
      actions: [
        "הדלקת נרות בשישי בערב — 5 דקות של שקט מוחלט, בלי טלפון.",
        "קידוש קצר על כוס יין או מיץ ענבים, עם מילים משלך.",
        "שעה אחת בלי מסכים — רק אתם, הבית והאוויר.",
      ],
    },
    mitzvot: {
      title: "מצווה אחת קטנה, כל יום",
      actions: [
        "תפילין בבוקר — גם שתי דקות נחשבות התחלה אמיתית.",
        "ברכה ראשונה לפני שאתם אוכלים משהו.",
        "קריאת שמע לפני השינה, בשכיבה, בלי לחץ.",
      ],
    },
    philosophy: {
      title: "להבין לפני לעשות",
      actions: [
        "קריאת 5 דקות ביום על משמעות המצוות או היהדות.",
        "לימוד מושג אחד ביהדות, בלי לקבל עלייך שום התחייבות.",
        "לשאול שאלה אחת שעניינה אותך ולא מצאת לה תשובה.",
      ],
    },
    creation: {
      title: "איך הכל התחיל",
      actions: [
        "לקרוא על איך העולם נברא ממה הכל התחיל.",
        "להבין את המשמעות של בריאת העולם בראי המדע והתורה.",
        "לחקור את הנושא לעומק בלי לחץ ובלי שיפוטיות."
      ],
    },
    general: {
      title: "סקרנות כללית — להתחיל בלי התחייבות",
      actions: [
        "לקרוא סיפור אחד על אנשים שעשו דרך דומה.",
        "לדבר 5 דקות ביום עם ה' בשפה שלך.",
        "לעשות מעשה חסד קטן אחד ביום.",
      ],
    },
  },
  level: {
    zero: "מתחיל מאפס? מעולה. אף אחד לא נולד יודע, והצעד הראשון הוא תמיד הכי חשוב.",
    some: "יש לך קצת ידע ורקע, זה מצוין! אפשר לבנות על זה לאט לאט.",
    steps: "כבר התחלת לעשות צעדים, וזה מדהים. בוא נחשוב איך אפשר להוסיף עוד צעד קטן.",
  },
  fear: {
    say: 'הפחד מ"מה יגידו" הוא הכי טבעי בעולם. אתה לא חייב לשתף אף אחד מיד. עשה צעדים קטנים בשקט שלך.',
    knowledge: "חוסר ידע יכול להיות מתסכל, אבל זה גם אומר שיש המון מה לגלות. נתחיל לאט.",
    hard: "הקושי הוא חלק מהדרך. לא צריך להצליח בהכל מיד, ומותר מדי פעם גם ליפול. העיקר להמשיך.",
  },
};

type Interest = keyof typeof RESULTS.interest | null;
type Level = keyof typeof RESULTS.level | null;
type Fear = keyof typeof RESULTS.fear | null;

export default function QuizSection() {
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState<Interest>(null);
  const [level, setLevel] = useState<Level>(null);
  const [fear, setFear] = useState<Fear>(null);
  
  const quizAnchorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (field: "interest" | "level" | "fear", value: any) => {
    if (field === "interest") setInterest(value);
    if (field === "level") setLevel(value);
    if (field === "fear") setFear(value);

    setTimeout(() => {
      if (field === "interest") setStep(2);
      else if (field === "level") setStep(3);
      else if (field === "fear") setStep(4);
    }, 280);
  };

  const handleReset = () => {
    setStep(1);
    setInterest(null);
    setLevel(null);
    setFear(null);
    if (quizAnchorRef.current) {
      const y = quizAnchorRef.current.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const resultInterest = interest ? RESULTS.interest[interest] : RESULTS.interest.general;
  const whatsappMsg = `שלום, השלמתי את השאלון באתר "מתחזקים".\nהנושא שלי: ${resultInterest.title}.\nאשמח לייעוץ.`;

  return (
    <section className="relative overflow-hidden py-16 bg-slate-50/50 border-t border-slate-200/50" id="quiz-section">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-[12px] font-medium text-sky-700">
            בוא נגלה מאיפה מתחילים
          </span>
          <h2 className="t-display mt-4 text-3xl text-slate-900 sm:text-4xl">מה הכי מסקרן אותך כרגע?</h2>
          <p className="mt-3 text-[15px] text-slate-500">
            ענה על 3 שאלות קצרות וקבל הצעה לצעדים קטנים שמתאימים בדיוק לך.
          </p>
        </Reveal>

        <Reveal delay={200} className="scroll-mt-32 mx-auto max-w-2xl">
          <div
            id="quizAnchor"
            ref={quizAnchorRef}
            className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8"
          >
            {/* Stepper */}
            <div className="mb-7 flex items-center gap-2.5">
              <div className={`dot ${step >= 1 ? (step === 1 ? 'active' : 'done') : ''}`}>1</div>
              <div className={`dot-line ${step > 1 ? 'done' : ''}`}></div>
              <div className={`dot ${step >= 2 ? (step === 2 ? 'active' : 'done') : ''}`}>2</div>
              <div className={`dot-line ${step > 2 ? 'done' : ''}`}></div>
              <div className={`dot ${step >= 3 ? (step === 3 ? 'active' : 'done') : ''}`}>3</div>
              <div className={`dot-line ${step > 3 ? 'done' : ''}`}></div>
              <div className={`dot ${step >= 4 ? 'active' : ''}`}>
                <Check className="h-3 w-3" />
              </div>
            </div>

            <div>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                  <h2 className="t-title text-lg text-slate-900 sm:text-xl">
                    מה מכל הדברים הבאים מסקרן אותך עכשיו?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-slate-500">
                    זה יעזור לנו להמליץ לך על כיוון התחלה.
                  </p>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleSelect("interest", "shabbat")}
                      className={`opt ${interest === "shabbat" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <MoonStar className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          שבת ומנוחה
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          שקט, ניתוק, משפחה, הדלקת נרות
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("interest", "mitzvot")}
                      className={`opt ${interest === "mitzvot" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <HandHeart className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          מצוות ומעשים
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          תפילין, ברכות, תפילה קצרה
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("interest", "philosophy")}
                      className={`opt ${interest === "philosophy" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <Brain className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          אמונה ומחשבה
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          המשמעות שמאחורי הדברים
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("interest", "creation")}
                      className={`opt ${interest === "creation" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <Globe className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          איך הכל התחיל
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          בריאת העולם והמדע
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("interest", "general")}
                      className={`opt ${interest === "general" ? "selected" : ""} sm:col-span-2`}
                    >
                      <span className="opt-icon">
                        <Compass className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          עדיין לא בטוח / סקרנות כללית
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          רוצה רק להציץ, בלי מחויבות
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                  <h2 className="t-title text-lg text-slate-900 sm:text-xl">
                    איפה אתה מרגיש שאתה נמצא היום?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-slate-500">
                    אל תחשוב על זה יותר מדי, בחר מה שמרגיש נכון.
                  </p>

                  <div className="mt-5 grid gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleSelect("level", "zero")}
                      className={`opt ${level === "zero" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <Sprout className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          מתחיל מאפס
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          לא יודע כלום, מחפש את הצעד הראשון
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("level", "some")}
                      className={`opt ${level === "some" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <Home className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          יש לי רקע בסיסי
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          מכיר קצת, אבל רוצה להתחזק
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("level", "steps")}
                      className={`opt ${level === "steps" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <Footprints className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          כבר עושה צעדים בשטח
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          שומר דברים בסיסיים, מחפש להתקדם
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                  <h2 className="t-title text-lg text-slate-900 sm:text-xl">
                    מה הפחד או האתגר הכי גדול שלך כרגע?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-slate-500">
                    לכולנו יש פחדים. זה בסדר גמור. מה עוצר אותך?
                  </p>

                  <div className="mt-5 grid gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleSelect("fear", "say")}
                      className={`opt ${fear === "say" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <Eye className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          מה המשפחה והחברים יגידו
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          פחד מסביבה שיפוטית או חוסר הבנה
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("fear", "knowledge")}
                      className={`opt ${fear === "knowledge" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <HelpCircle className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          חוסר ידע והבנה
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          מרגיש שאני לא יודע איך עושים דברים נכון
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("fear", "hard")}
                      className={`opt ${fear === "hard" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <Mountain className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1 text-right">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          שזה פשוט יהיה קשה מדי
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          חשש שאשבר בדרך או לא אצליח להתמיד
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* RESULT */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700">
                      <Sparkles className="h-3 w-3" />
                      הנה הצעד הראשון שלך
                    </span>
                    <h2 className="t-title mt-4 text-xl text-slate-900 sm:text-2xl">
                      {resultInterest.title}
                    </h2>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-900 text-white">
                        <Info className="h-2.5 w-2.5" />
                      </span>
                      <p className="text-[13px] leading-relaxed text-slate-700 text-right">
                        {level ? RESULTS.level[level] : RESULTS.level.zero}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/60 p-4">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-500 text-white">
                        <ShieldCheck className="h-2.5 w-2.5" />
                      </span>
                      <p className="text-[13px] leading-relaxed text-slate-700 text-right">
                        {fear ? RESULTS.fear[fear] : RESULTS.fear.knowledge}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-[12px] font-semibold text-right uppercase tracking-wide text-slate-400">
                    רעיונות מעשיים להתחלה:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {resultInterest.actions.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <span className="text-[13px] leading-relaxed text-slate-700 text-right">
                          {a}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                    >
                      <MessageCircle className="h-4 w-4" />
                      התייעץ בוואטסאפ
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600"
                    >
                      <RotateCcw className="h-4 w-4" />
                      התחל מחדש
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Back button */}
            {step > 1 && step < 4 && (
              <div className="mt-5 animate-in fade-in duration-300">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-400 transition hover:text-slate-700"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  חזור שלב אחד אחורה
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
