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
} from "lucide-react";
import Reveal from "./Reveal";

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
        "עשרה דקות קריאה על טעמי המצוות — בשפה מודרנית.",
        "לשאול שאלה אחת אמיתית, בלי לחפש תשובה מיידית.",
        "שיחה פתוחה עם מתחזקים על מה שמעסיק אותך.",
      ],
    },
    general: {
      title: "הצעד הקטן שלך — להתחיל מסקרנות",
      actions: [
        "לבחור נושא אחד שמעניין אותך ולצלול בו לעומק.",
        "עשר דקות ביום של תוכן בגובה העיניים.",
        "שיחה אחת פתוחה עם מתחזקים — בלי מחויבות.",
      ],
    },
  },
  level: {
    zero: "מתחילים מאפס? מעולה. אין מה לפספס — יש רק מה לגלות, ואתם קובעים את הקצב.",
    some: "אתם מכירים קצת מהבית. עכשיו הזמן לתת לזה מקום משלכם, במונחים שלכם.",
    steps: "אתם כבר עושים צעדים קטנים. נשאר רק להמשיך — בדיוק באותו קצב שנוח לכם.",
  },
  fear: {
    say: 'החשש מ"מה יגידו" הוא הכי נפוץ, וזה מובן. אתם לא חייבים להצהיר על כלום — צעדים קטנים לא רואים מבחוץ.',
    knowledge: "חוסר ידע הוא לא בעיה, הוא בדיוק הסיבה שמתחזקים קיים. שואלים, מקבלים תשובה, בלי מבחנים ובלי בושה.",
    hard: "זה לא קשה מדי — זה רק נראה ככה מהצד. כל צעד הוא בגודל שאתם בוחרים, ותמיד אפשר לעצור.",
  },
};

type Interest = keyof typeof RESULTS.interest | null;
type Level = keyof typeof RESULTS.level | null;
type Fear = keyof typeof RESULTS.fear | null;

export default function Hero() {
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
  const whatsappMsg = `היי, מילאתי את השאלון באתר "מתחזקים".
מעניין אותי: ${resultInterest.title}.
אשמח לשמוע על מתחזקים.`;

  return (
    <section className="relative overflow-hidden" id="top">
      <div className="grid-bg"></div>

      <div className="orb h-[500px] w-[500px] -top-32 -right-40 bg-sky-200/60"></div>
      <div className="orb h-[400px] w-[400px] top-40 -left-32 bg-indigo-200/50"></div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[12px] font-medium text-slate-600 shadow-xs backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-sky-400"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-500"></span>
              </span>
              כאן בשבילך — בלי לחץ, בלי שיפוטיות
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="t-display mt-7 text-4xl text-slate-900 sm:text-6xl lg:text-[4.5rem]">
              מתקרבים בקצב שלך.
              <span className="mt-2 block gradient-text">
                בלי לחץ. בלי שיפוטיות.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="t-body mx-auto mt-7 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              צעדים ראשונים, מדריכים בגובה העיניים וליווי אישי דיסקרטי — בדיוק
              במידה שנוחה לך.
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#quizAnchor"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
            >
              בואו נמצא את הצעד שלך
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#guides"
              className="btn-ghost inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-700"
            >
              לגלוש ולחקור לבד
            </a>
          </Reveal>

          <Reveal delay={400} className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[12.5px] font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-sky-500" /> דיסקרטי לחלוטין
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Hand className="h-3.5 w-3.5 text-sky-500" /> בלי התחייבות
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" /> בחינם, תמיד
            </span>
          </Reveal>
        </div>

        {/* QUIZ */}
        <Reveal delay={500} className="scroll-mt-32 mx-auto mt-16 max-w-2xl">
          <div
            id="quizAnchor"
            ref={quizAnchorRef}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/5 sm:p-8"
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
                    מה הכי מסקרן אותך כרגע?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-slate-500">
                    אין תשובה נכונה — רק מה שמדבר אליך עכשיו.
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          השקט של השבת
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          נרות, קידוש, שעה בלי מסכים
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          מצוות מעשיות
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          תפילין, ברכות, קריאת שמע
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          פילוסופיה ומחשבה
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          המשמעות שמאחורי המעשה
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("interest", "general")}
                      className={`opt ${interest === "general" ? "selected" : ""}`}
                    >
                      <span className="opt-icon">
                        <Compass className="h-4.5 w-4.5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          סקרנות כללית
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          עדיין לא בטוח — רק בא לגלות
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
                    איפה אתה מרגיש שאתה אוחז היום?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-slate-500">
                    כל נקודת התחלה היא נקודה טובה.
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          מתחיל מאפס
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          הכול חדש — וזה בסדר
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          מכיר קצת מהבית
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          יש זיכרונות, יש סקרנות
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          עושה צעדים קטנים
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          כבר בדרך, רוצה להמשיך
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
                    מה החשש המרכזי שלך?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-slate-500">
                    אנחנו שואלים כי זה בדיוק מה שאנחנו יודעים ללוות.
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          "מה יגידו"
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          המשפחה, החברים, הסביבה
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          חוסר ידע
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          לא יודע מה לעשות, איך ומתי
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
                      <span className="flex-1">
                        <span className="block text-[14px] font-semibold text-slate-800">
                          פחד שזה קשה מדי
                        </span>
                        <span className="mt-0.5 block text-[12px] text-slate-500">
                          שאצטרך לוותר על מי שאני
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
                      הצעד שלך לשבוע הזה
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
                      <p className="text-[13px] leading-relaxed text-slate-700">
                        {level ? RESULTS.level[level] : RESULTS.level.zero}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/60 p-4">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-500 text-white">
                        <ShieldCheck className="h-2.5 w-2.5" />
                      </span>
                      <p className="text-[13px] leading-relaxed text-slate-700">
                        {fear ? RESULTS.fear[fear] : RESULTS.fear.knowledge}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-[12px] font-semibold uppercase tracking-wide text-slate-400">
                    שלושה צעדים קטנים להתחלה
                  </p>
                  <ul className="mt-3 space-y-2">
                    {resultInterest.actions.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <span className="text-[13px] leading-relaxed text-slate-700">
                          {a}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                    >
                      <MessageCircle className="h-4 w-4" />
                      דברו איתי על מתחזקים
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600"
                    >
                      <RotateCcw className="h-4 w-4" />
                      מילוי מחדש
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
                  חזרה לשלב הקודם
                </button>
              </div>
            )}
          </div>

          <div className="mt-5 text-center">
            <a
              href="#guides"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 transition hover:text-slate-800"
            >
              אני מעדיף לגלוש ולחקור לבד
              <ArrowDown className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
