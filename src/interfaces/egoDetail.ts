export interface EgoDetail {
  id: number;
  character: string;
  name: string;
  image: string;
  zoomImage: string;
  corImage: string;
  grade: string;
  season: number;
  resistance: string[];
  keyword: string[];
  passive: Passive;
  releaseDate: string;
  obtainingMethod: string;
  cost: number[];
  egoskills: EgoSkill[];
  egoCorSkills: EgoSkill[];
}

export interface Passive {
  name: string;
  content: string;
}

export interface EgoSkill {
  name: string;
  power: string;
  mentalConsume: number;
  atkType: string;
  resource: string;
  skillPower: number;
  coinPower: number;
  coinNum: number;
  atkWeight: number;
  construeLevel: number;
  normalEffect: string;
  coin1Effect: string;
  coin2Effect: string;
  coin3Effect: string;
  coin4Effect: string;
  coin5Effect: string;
}
