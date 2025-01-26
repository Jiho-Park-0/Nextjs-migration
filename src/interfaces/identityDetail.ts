export interface IdentityData {
  id: number;
  character: string;
  name: string;
  beforeImage: string;
  beforeZoomImage: string;
  afterImage: string;
  afterZoomImage: string;
  afterProfileImage: string;
  affiliation: string;
  grade: number;
  season: number;
  releaseDate: string;
  obtainingMethod: string;
  resistance: string[];
  keyword: string[];
  status: {
    life: string;
    speed: string;
    defend: string;
  };
  identitySkill1s: Skill[];
  identitySkill2s: Skill[];
  identitySkill3s: Skill[];
  identityDefSkills: Skill[];
  identityPassives: Passive[];
}

export interface Skill {
  name: string;
  power: string;
  type: string;
  resource: string;
  skillSeq: number;
  quantity: number | null;
  skillPower: number;
  coinPower: number;
  coinNum: number;
  atkWeight: number;
  level: number;
  normalEffect: string;
  coin1Effect: string;
  coin2Effect: string;
  coin3Effect: string;
  coin4Effect: string;
  coin5Effect: string;
}

export interface Passive {
  name: string;
  isMain: boolean;
  resource: string;
  resQuantity: number;
  activeCond: string;
  effect: string;
  level: number;
}
