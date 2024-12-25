import { create } from "zustand";

interface IdentityOptions {
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

interface StoreState {
  optionsState: IdentityOptions;
  egoOptionsState: EgoOptions;
  synchronizationState: Synchronization;
  setOptionsState: (options: IdentityOptions) => void;
  setEgoOptionsState: (options: EgoOptions) => void;
  setSynchronizationState: (sync: Synchronization) => void;
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
  setOptionsState: (options) => set({ optionsState: options }),
  setEgoOptionsState: (options) => set({ egoOptionsState: options }),
  setSynchronizationState: (sync) => set({ synchronizationState: sync }),
}));

export default useStore;
