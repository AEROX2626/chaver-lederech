"use client";

import { useUserProgress } from "@/lib/userProgress";
import { Track } from "@/data/types";
import { CheckCircle, PlayCircle, Circle } from "lucide-react";
import Reveal from "./Reveal";

export default function TrackViewer({ track }: { track: Track }) {
  const { state, isLoaded, startTrack, completeDay, isDayCompleted } = useUserProgress();

  if (!isLoaded) return <div className="py-20 text-center text-slate-400">טוען נתונים...</div>;

  // Calculate progress
  const completedCount = (state.completedDays[track.id] || []).length;
  const isCompletedTrack = completedCount >= track.durationDays;
  const hasStarted = completedCount > 0 || state.currentTrack === track.id;

  if (!hasStarted) {
    return (
      <div className="text-center bg-white border border-slate-200 rounded-3xl p-10 max-w-2xl mx-auto shadow-sm">
        <h3 className="t-title text-2xl text-slate-900 mb-4">מוכן להתחיל?</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          זהו מסלול של {track.durationDays} ימים. בכל יום נשלח לך צעד קטן אחד. בלי עומס, רק רגע אחד לעצמך.
        </p>
        <button 
          onClick={() => startTrack(track.id)}
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-[15px] font-semibold"
        >
          <PlayCircle className="h-5 w-5" />
          אני מתחיל את המסלול
        </button>
      </div>
    );
  }

  const progressPercent = Math.min(100, Math.round((completedCount / track.durationDays) * 100));
  
  // The current active day is simply the next day after completed ones
  const activeDayNum = Math.min(track.durationDays, completedCount + 1);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900">ההתקדמות שלך</h3>
          <span className="text-sm font-medium text-slate-500">יום {activeDayNum} מתוך {track.durationDays}</span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-4 text-right">
          <span className="text-sm font-semibold text-emerald-600">{progressPercent}% הושלם</span>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-8 relative">
        <div className="absolute right-[27px] top-0 bottom-0 w-0.5 bg-slate-200"></div>

        {track.days.map((day, idx) => {
          const isCompleted = isDayCompleted(track.id, day.dayNumber);
          const isActive = day.dayNumber === activeDayNum && !isCompletedTrack;
          const isLocked = day.dayNumber > activeDayNum;

          if (isLocked) return null; // Hide future days for simplicity as requested

          return (
            <Reveal key={idx} delay={0}>
              <div className={`relative flex items-start gap-6 group ${isCompleted ? 'opacity-70' : ''}`}>
                <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-slate-50 ${isCompleted ? 'bg-emerald-500' : 'bg-rose-500'} text-white shadow-md`}>
                  {isCompleted ? <CheckCircle className="h-6 w-6" /> : <span className="font-bold">{day.dayNumber}</span>}
                </div>
                
                <div className="flex-1 pt-2">
                  <div className={`rounded-3xl border ${isActive ? 'border-rose-200 bg-white shadow-lg' : 'border-slate-200 bg-slate-50'} p-6 sm:p-8 transition-all`}>
                    <h3 className="t-title text-2xl text-slate-900 mb-4">{day.title}</h3>
                    <p className="text-[15.5px] leading-relaxed text-slate-600 mb-8">{day.content}</p>
                    
                    <div className={`rounded-2xl border p-5 mb-6 ${isActive ? 'bg-rose-50/50 border-rose-100' : 'bg-white border-slate-100'}`}>
                      <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-2">המשימה להיום:</span>
                      <p className="text-slate-800 font-medium">{day.action}</p>
                    </div>

                    {isActive && (
                      <button 
                        onClick={() => completeDay(track.id, day.dayNumber, day.dayNumber === track.durationDays)}
                        className="btn-primary w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl px-8 py-3.5 text-[15px] font-semibold"
                      >
                        <CheckCircle className="h-5 w-5" />
                        סיימתי ✓
                      </button>
                    )}
                    {isCompleted && (
                      <div className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" /> מעולה. הצעד הושלם.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      
      {isCompletedTrack && (
        <Reveal delay={200} className="mt-16 text-center bg-emerald-50 border border-emerald-200 rounded-3xl p-10">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="t-title text-3xl text-emerald-900 mb-2">כל הכבוד!</h2>
          <p className="text-emerald-700 font-medium text-lg">{track.completionMessage}</p>
        </Reveal>
      )}
    </div>
  );
}
