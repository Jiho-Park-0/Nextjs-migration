import { create } from "zustand";

interface IdentityOptions {
  [key: string]: string[] | number;
  sinner: string[];
  season: string[];
  grade: string[];
  affiliation: string[];
  keyword: string[];
  etcKeyword: string[];
  resources: string[];
  types: string[];
  minSpeed: number;
  maxSpeed: number;
  minWeight: number;
  maxWeight: number;
}

interface EgoOptions {
  [key: string]: string[] | number;
  sinner: string[];
  season: string[];
  grade: string[];
  keyword: string[];
  etcKeyword: string[];
  resources: string[];
  types: string[];
  minWeight: number;
  maxWeight: number;
}

interface Synchronization {
  synchronization: number;
}

interface IdentityState {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface StoreState {
  optionsState: IdentityOptions;
  egoOptionsState: EgoOptions;
  synchronizationState: Synchronization;
  identityState: IdentityState;
  setOptionsState: (options: IdentityOptions) => void;
  setEgoOptionsState: (options: EgoOptions) => void;
  setSynchronizationState: (sync: Synchronization) => void;
  setIdentityState: (state: IdentityState) => void;
}

const useStore = create<StoreState>((set) => ({
  optionsState: {
    sinner: [],
    season: [],
    grade: [],
    affiliation: [],
    keyword: [],
    etcKeyword: [],
    resources: [],
    types: [],
    minSpeed: 1,
    maxSpeed: 9,
    minWeight: 1,
    maxWeight: 9,
  },
  egoOptionsState: {
    sinner: [],
    season: [],
    grade: [],
    keyword: [],
    etcKeyword: [],
    resources: [],
    types: [],
    minWeight: 1,
    maxWeight: 6,
  },
  synchronizationState: {
    synchronization: 0,
  },
  identityState: {
    isLoading: false,
    isError: false,
    error: null,
  },
  setOptionsState: (options) => set({ optionsState: options }),
  setEgoOptionsState: (options) => set({ egoOptionsState: options }),
  setSynchronizationState: (sync) => set({ synchronizationState: sync }),
  setIdentityState: (state) => set({ identityState: state }),
}));

export default useStore;
