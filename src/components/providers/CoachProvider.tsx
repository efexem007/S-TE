'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import {
  CoachState,
  StudentProfile,
  CoachMessage,
  TopicProgress,
  StudyPlan,
  CoachAgent,
  DEFAULT_PROFILE,
} from '@/lib/coach/types';

interface CoachContextValue extends CoachState {
  setProfile: (profile: Partial<StudentProfile>) => void;
  addMessage: (message: Omit<CoachMessage, 'id' | 'timestamp'>) => void;
  updateProgress: (progress: TopicProgress) => void;
  setCurrentPlan: (plan: StudyPlan | null) => void;
  setCurrentAgent: (agent: CoachAgent) => void;
  togglePanel: () => void;
  toggleFullscreen: () => void;
  clearMessages: () => void;
  isOnboarded: boolean;
}

const CoachContext = createContext<CoachContextValue | null>(null);

const STORAGE_KEY = 'dueMWeWork-coach-state-v1';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function loadInitialState(): CoachState {
  if (typeof window === 'undefined') {
    return {
      profile: null,
      messages: [],
      progress: [],
      currentPlan: null,
      streak: 0,
      lastActiveDate: null,
      currentAgent: 'general',
      isPanelOpen: false,
      isFullscreen: false,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CoachState;
      // Ensure all fields exist for backward compatibility
      return {
        profile: parsed.profile ?? null,
        messages: parsed.messages ?? [],
        progress: parsed.progress ?? [],
        currentPlan: parsed.currentPlan ?? null,
        streak: parsed.streak ?? 0,
        lastActiveDate: parsed.lastActiveDate ?? null,
        currentAgent: parsed.currentAgent ?? 'general',
        isPanelOpen: parsed.isPanelOpen ?? false,
        isFullscreen: parsed.isFullscreen ?? false,
      };
    }
  } catch {
    // ignore
  }
  return {
    profile: null,
    messages: [],
    progress: [],
    currentPlan: null,
    streak: 0,
    lastActiveDate: null,
    currentAgent: 'general',
    isPanelOpen: false,
    isFullscreen: false,
  };
}

export function CoachProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CoachState>(loadInitialState);
  const [hydrated, setHydrated] = useState(false);

  // Hydration check
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  // Streak logic on mount
  useEffect(() => {
    if (!hydrated) return;
    const today = getTodayStr();
    if (state.lastActiveDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    setState((prev) => ({
      ...prev,
      streak: prev.lastActiveDate === yesterdayStr ? (prev.streak || 0) + 1 : 1,
      lastActiveDate: today,
    }));
  }, [hydrated]);

  const setProfile = useCallback((profile: Partial<StudentProfile>) => {
    setState((prev) => {
      const existing = prev.profile ?? { ...DEFAULT_PROFILE };
      const updated: StudentProfile = {
        ...existing,
        ...profile,
        updatedAt: new Date().toISOString(),
        createdAt: existing.createdAt || new Date().toISOString(),
      };
      return { ...prev, profile: updated };
    });
  }, []);

  const addMessage = useCallback((message: Omit<CoachMessage, 'id' | 'timestamp'>) => {
    const fullMessage: CoachMessage = {
      ...message,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, fullMessage].slice(-100), // keep last 100
    }));
  }, []);

  const updateProgress = useCallback((progress: TopicProgress) => {
    setState((prev) => {
      const existingIndex = prev.progress.findIndex((p) => p.topic === progress.topic);
      let newProgress: TopicProgress[];
      if (existingIndex >= 0) {
        newProgress = [...prev.progress];
        newProgress[existingIndex] = progress;
      } else {
        newProgress = [...prev.progress, progress];
      }
      return { ...prev, progress: newProgress };
    });
  }, []);

  const setCurrentPlan = useCallback((plan: StudyPlan | null) => {
    setState((prev) => ({ ...prev, currentPlan: plan }));
  }, []);

  const setCurrentAgent = useCallback((agent: CoachAgent) => {
    setState((prev) => ({ ...prev, currentAgent: agent }));
  }, []);

  const togglePanel = useCallback(() => {
    setState((prev) => ({ ...prev, isPanelOpen: !prev.isPanelOpen }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    setState((prev) => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  }, []);

  const clearMessages = useCallback(() => {
    setState((prev) => ({ ...prev, messages: [] }));
  }, []);

  const isOnboarded = !!state.profile?.name && !!state.profile?.targetExam;

  const value: CoachContextValue = {
    ...state,
    setProfile,
    addMessage,
    updateProgress,
    setCurrentPlan,
    setCurrentAgent,
    togglePanel,
    toggleFullscreen,
    clearMessages,
    isOnboarded,
  };

  return <CoachContext.Provider value={value}>{children}</CoachContext.Provider>;
}

export function useCoach() {
  const ctx = useContext(CoachContext);
  if (!ctx) {
    throw new Error('useCoach must be used within a CoachProvider');
  }
  return ctx;
}
