"use client";

import { useState, useEffect } from 'react';

export interface UserProgressState {
  currentTrack: string | null;
  currentDay: number;
  completedDays: Record<string, number[]>; // trackId -> array of completed day numbers
  lastActive: string;
}

const DEFAULT_STATE: UserProgressState = {
  currentTrack: null,
  currentDay: 1,
  completedDays: {},
  lastActive: new Date().toISOString(),
};

export function useUserProgress() {
  const [state, setState] = useState<UserProgressState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mitchazkim_progress');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveState = (newState: UserProgressState) => {
    newState.lastActive = new Date().toISOString();
    localStorage.setItem('mitchazkim_progress', JSON.stringify(newState));
    setState(newState);
  };

  const startTrack = (trackId: string) => {
    saveState({
      ...state,
      currentTrack: trackId,
      currentDay: 1,
    });
  };

  const completeDay = (trackId: string, dayNumber: number) => {
    const trackCompleted = state.completedDays[trackId] || [];
    if (!trackCompleted.includes(dayNumber)) {
      trackCompleted.push(dayNumber);
    }
    saveState({
      ...state,
      completedDays: {
        ...state.completedDays,
        [trackId]: trackCompleted
      },
      currentDay: dayNumber + 1, // Advance to next day
    });
  };

  const isDayCompleted = (trackId: string, dayNumber: number) => {
    return (state.completedDays[trackId] || []).includes(dayNumber);
  };

  const getCurrentProgress = () => {
    return state;
  };

  return {
    state,
    isLoaded,
    startTrack,
    completeDay,
    isDayCompleted,
    getCurrentProgress
  };
}
