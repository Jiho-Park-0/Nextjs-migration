export interface IdentityOptions {
  [key: string]: string | number | string[];
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

export interface TierData {
  id: number;
  name: string;
  character: string;
  season: number;
  beforeImage: string;
  afterImage: string;
}

export interface Identity {
  id: number;
  name: string;
  character: string;
  season: number;
  beforeImage: string;
  afterImage: string;
  speed: number;
  weight: number;
  grade: string;
  affiliation: string;
  keyword: string;
  etcKeyword: string[];
  resources: string[];
  types: string[];
}
