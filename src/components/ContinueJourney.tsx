"use client";

import { useUserProgress } from "@/lib/userProgress";
import { TRACKS_DB } from "@/data/tracks";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";

export default function ContinueJourney() {
  const { state, isLoaded } = useUserProgress();

  if (!isLoaded || !state.currentTrack) return null;

  const track = TRACKS_DB[state.currentTrack];
  if (!track) return null;

  // Find the next day
  const completedCount = (state.completedDays[track.id] || []).length;
  if (completedCount >= track.durationDays) return null; // Finished the track

  const activeDayNum = Math.min(track.durationDays, completedCount + 1);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12">
      <div className="rounded-3xl border border-sky-200 bg-sky-50/50 p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="t-title text-2xl text-slate-900 mb-2">טוב שחזרת!</h2>
          <p className="text-slate-600 font-medium">
            הצעד הבא שלך: יום {activeDayNum} במסלול "{track.title}"
          </p>
        </div>
        <Link 
          href={`/tracks/${track.id}`}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold whitespace-nowrap"
        >
          <PlayCircle className="h-5 w-5" />
          להמשיך במסלול
        </Link>
      </div>
    </div>
  );
}
