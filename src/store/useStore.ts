import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CubeState = string; // algorithm or state string

interface AppState {
  // Navigation
  view: 'home' | 'solo' | 'competition' | 'training' | 'rankings' | 'profile' | 'settings';
  setView: (view: AppState['view']) => void;

  // Game/Cube State
  cubeState: string;
  setCubeState: (state: string) => void;
  isSolving: boolean;
  setIsSolving: (val: boolean) => void;
  
  // Scramble
  currentScramble: string;
  setCurrentScramble: (val: string) => void;

  // Timer
  timerValue: number;
  setTimerValue: (val: number) => void;
  timerRunning: boolean;
  setTimerRunning: (val: boolean) => void;

  // Auth State (UI only, real auth in firebase hook)
  user: any | null;
  setUser: (user: any) => void;

  // Settings
  vibration: boolean;
  sound: boolean;
  toggleVibration: () => void;
  toggleSound: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      view: 'home',
      setView: (view) => set({ view }),

      cubeState: '',
      setCubeState: (cubeState) => set({ cubeState }),
      isSolving: false,
      setIsSolving: (isSolving) => set({ isSolving }),

      currentScramble: '',
      setCurrentScramble: (currentScramble) => set({ currentScramble }),

      timerValue: 0,
      setTimerValue: (timerValue) => set({ timerValue }),
      timerRunning: false,
      setTimerRunning: (timerRunning) => set({ timerRunning }),

      user: null,
      setUser: (user) => set({ user }),

      vibration: true,
      sound: true,
      toggleVibration: () => set((state) => ({ vibration: !state.vibration })),
      toggleSound: () => set((state) => ({ sound: !state.sound })),
    }),
    {
      name: 'nexus-core-storage',
      partialize: (state) => ({ 
        vibration: state.vibration, 
        sound: state.sound, 
        view: state.view 
      }),
    }
  )
);
