export interface IdentityOptions {
  [key: string]: any;
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
