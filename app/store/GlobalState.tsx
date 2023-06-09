import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GlobalState {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  currentCity: string;
  setCurrentCity: (city: string) => void;

  currentLocation: { lat: number; lon: number };
  setCurrentLocation: ({ lat, lon }: { lat: number; lon: number }) => void;
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

  currentLocation: { lat: 0, lon: 0 },
  setCurrentLocation: (data) => {
    set(() => ({
      currentLocation: data,
    }));
  },
}));

type LocationsState = {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  locations: any[];
  addLocation: (locations: any) => void;
  removeLocation: (locationName: string) => void;
  resetLocations: () => void;

  celsius: boolean;
  toggleCelsius: () => void;
};

export const useLocationsStore = create(
  persist<LocationsState>(
    (set, get) => ({
      celsius: true,
      toggleCelsius: () => {
        set((state) => ({ celsius: !state.celsius }));
      },
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      locations: [],
      addLocation: (location) => {
        const myLocations = get().locations;
        const canAdd = !myLocations.find((el) => el.name === location.name);

        if (canAdd) {
          return set((state) => ({ locations: [location, ...state.locations] }));
        }
      },
      removeLocation: (locationName) =>
        set((state) => ({
          locations: state.locations.filter((location) => location.name !== locationName),
        })),
      resetLocations: () => set(() => ({ locations: [] })),
    }),
    {
      name: 'locations-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
