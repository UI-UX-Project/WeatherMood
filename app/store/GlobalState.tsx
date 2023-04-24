import { create } from 'zustand';

interface GlobalState {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  currentCity: string;
  setCurrentCity: (city: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  selectedCity: '',
  setSelectedCity: (city: string) => {
    set(() => ({ selectedCity: city }));
  },
  currentCity: 'Loading...',
  setCurrentCity: (city: string) => {
    set(() => ({ currentCity: city }));
  },
}));
