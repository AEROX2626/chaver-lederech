"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, PlayCircle, Sparkles } from "lucide-react";
import Reveal from "../Reveal";
import Link from "next/link";
import { useUserProgress } from "@/lib/userProgress";

export default function QuizSection() {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [stage, setStage] = useState("");
  const [time, setTime] = useState("");
  const { startTrack } = useUserProgress();

  const handleSelect = (field: string, val: string) => {
    if (field === "topic") { setTopic(val); setStep(2); }
    if (field === "stage") { setStage(val); setStep(3); }
    if (field === "time") { setTime(val); setStep(4); }
  };

  const getRecommendation = () => {
    if (topic === "תפילה") return { title: "תפילה מהלב", trackId: "track-06", reason: "כי סיפרת שאתה מתעניין בתפילה ורוצה להתחיל." };
    if (topic === "שבת") return { title: "השבת הראשונה שלי", trackId: "track-07", reason: "כי שבת היא הלב, ובקשת משהו פרקטי להתחיל איתו." };
    return { title: "מתחזקים באמונה", trackId: "track-08", reason: "כי אמונה היא הבסיס לכל, וחיפשת דרך להתחיל את המסע." };
  };

  const rec = getRecommendation();

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="quiz-section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="t-title text-3xl text-slate-900 sm:text-4xl">איפה אתה נמצא בדרך?</h2>
          <p className="mt-4 text-lg text-slate-600">3 שאלות קצרות כדי שנוכל להמליץ לך על הצעד הבא.</p>
        </Reveal>

        <Reveal delay={100} className="max-w-2xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl shadow-slate-200/50">
            {/* Step 1 */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <span className="text-sm font-semibold text-sky-600 mb-2 block">שאלה 1 מתוך 3</span>
                  <h3 className="text-2xl font-bold text-slate-900">מה הכי מעניין אותך כרגע?</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {["אמונה", "תפילה", "שבת", "משמעות", "אני לא בטוח"].map(opt => (
                    <button key={opt} onClick={() => handleSelect("topic", opt)} className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-right font-medium text-slate-700 transition">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <span className="text-sm font-semibold text-emerald-600 mb-2 block">שאלה 2 מתוך 3</span>
                  <h3 className="text-2xl font-bold text-slate-900">איך היית מגדיר את עצמך?</h3>
                </div>
                <div className="grid gap-4">
                  {[
                    { label: "בתחילת הדרך", desc: "אין לי מושג מאיפה מתחילים" },
                    { label: "כבר בדרך", desc: "אני שומר או מתפלל אבל חסר לי משהו" },
                    { label: "מתמודד עם קושי", desc: "התרחקתי או שקשה לי לאחרונה" }
                  ].map(opt => (
                    <button key={opt.label} onClick={() => handleSelect("stage", opt.label)} className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-right transition">
                      <span className="block font-bold text-slate-900">{opt.label}</span>
                      <span className="text-sm text-slate-500">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <span className="text-sm font-semibold text-rose-600 mb-2 block">שאלה אחרונה</span>
                  <h3 className="text-2xl font-bold text-slate-900">כמה זמן פנוי יש לך ביום?</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {["2 דקות", "10 דקות", "חצי שעה", "אני רוצה תהליך"].map(opt => (
                    <button key={opt} onClick={() => handleSelect("time", opt)} className="p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-right font-medium text-slate-700 transition">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 - Result */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-100 text-amber-600 mb-6">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">נראה לי שמצאנו לך התחלה טובה</h3>
                <h4 className="text-3xl font-black text-sky-600 mb-6">{rec.title}</h4>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-right mb-8">
                  <span className="block text-sm font-bold text-slate-400 mb-1">למה?</span>
                  <p className="text-slate-700">{rec.reason}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href={`/tracks/${rec.trackId}`}
                    onClick={() => startTrack(rec.trackId)}
                    className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[15px] font-semibold"
                  >
                    <PlayCircle className="h-5 w-5" />
                    אני מתחיל עכשיו
                  </Link>
                  <button onClick={() => setStep(1)} className="text-sm font-medium text-slate-500 hover:text-slate-800">
                    התחל מחדש
                  </button>
                </div>
              </div>
            )}

            {/* Back button */}
            {step > 1 && step < 4 && (
              <button onClick={() => setStep(step - 1)} className="mt-8 flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700">
                <ArrowRight className="h-4 w-4" /> חזור
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
