"use client";

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export interface UserProgressState {
  currentTrack: string | null; // This will now be the track UUID
  currentDay: number;
  completedDays: Record<string, number[]>; // trackId (UUID) -> array of completed day numbers
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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function initUser() {
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      let currentUser = session?.user;

      if (!currentUser) {
        // Sign in anonymously
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error("Anonymous auth failed:", error);
          // Fallback to local storage if anonymous auth is disabled
          loadFromLocal();
          return;
        }
        currentUser = data?.user || undefined;
      }

      if (currentUser) {
        setUserId(currentUser.id);
        
        // Ensure profile exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', currentUser.id)
          .single();
          
        if (!profile) {
          await supabase.from('profiles').insert({ 
            id: currentUser.id,
            current_stage: 'NEW'
          });
        }

        // Fetch tracks mapping (slug -> uuid)
        const { data: tracksData } = await supabase.from('content_items').select('id, slug').eq('type', 'TRACK');
        const uuidToSlug: Record<string, string> = {};
        const slugToUuid: Record<string, string> = {};
        if (tracksData) {
          tracksData.forEach(t => {
            uuidToSlug[t.id] = t.slug;
            slugToUuid[t.slug] = t.id;
          });
          // Store mapping in window object safely for the session (MVP hack)
          (window as any).__trackMap = { uuidToSlug, slugToUuid };
        }

        // Fetch progress from Supabase
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', currentUser.id);

        if (progressError) {
          console.error("Error fetching progress", progressError);
          loadFromLocal();
          return;
        }

        if (progressData && progressData.length > 0) {
          // Reconstruct state
          const sorted = [...progressData].sort((a, b) => new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime());
          const latest = sorted[0];
          
          const completedMap: Record<string, number[]> = {};
          progressData.forEach(p => {
             const days = Array.from({ length: p.completed ? p.current_day : p.current_day - 1 }, (_, i) => i + 1);
             const localSlug = (window as any).__trackMap?.uuidToSlug[p.track_id] || p.track_id;
             completedMap[localSlug] = days;
          });

          const latestSlug = (window as any).__trackMap?.uuidToSlug[latest.track_id] || latest.track_id;

          setState({
            currentTrack: latest.completed ? null : latestSlug,
            currentDay: latest.current_day,
            completedDays: completedMap,
            lastActive: latest.last_activity
          });
        }
        setIsLoaded(true);
      }
    }

    initUser();
  }, []);

  const loadFromLocal = () => {
    const saved = localStorage.getItem('mitchazkim_progress');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    setIsLoaded(true);
  };

  const saveStateLocalFallback = (newState: UserProgressState) => {
    newState.lastActive = new Date().toISOString();
    localStorage.setItem('mitchazkim_progress', JSON.stringify(newState));
    setState(newState);
  };

  const startTrack = async (trackId: string) => {
    if (userId) {
      const uuid = (window as any).__trackMap?.slugToUuid[trackId] || trackId;
      // Upsert into Supabase
      await supabase.from('user_progress').upsert({
        user_id: userId,
        track_id: uuid,
        current_day: 1,
        completed: false,
        last_activity: new Date().toISOString()
      }, { onConflict: 'user_id,track_id' });
      
      setState(prev => ({
        ...prev,
        currentTrack: trackId,
        currentDay: 1,
      }));
    } else {
      saveStateLocalFallback({
        ...state,
        currentTrack: trackId,
        currentDay: 1,
      });
    }
  };

  const completeDay = async (trackId: string, dayNumber: number, isLastDay: boolean = false) => {
    const nextDay = dayNumber + 1;
    
    if (userId) {
      const uuid = (window as any).__trackMap?.slugToUuid[trackId] || trackId;
      await supabase.from('user_progress').update({
        current_day: isLastDay ? dayNumber : nextDay,
        completed: isLastDay,
        last_activity: new Date().toISOString()
      }).match({ user_id: userId, track_id: uuid });
    }

    const trackCompleted = state.completedDays[trackId] || [];
    if (!trackCompleted.includes(dayNumber)) {
      trackCompleted.push(dayNumber);
    }
    
    const newState = {
      ...state,
      completedDays: {
        ...state.completedDays,
        [trackId]: trackCompleted
      },
      currentDay: isLastDay ? dayNumber : nextDay,
      currentTrack: isLastDay ? null : trackId
    };
    
    setState(newState);
    if (!userId) saveStateLocalFallback(newState);
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
