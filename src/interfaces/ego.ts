export interface EgoOptions {
  [key: string]: string | string[] | number;
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

export interface EgoData {
  id: number;
  name: string;
  grade: number;
  character: string;
  zoomImage: string;
  image: string;
}
