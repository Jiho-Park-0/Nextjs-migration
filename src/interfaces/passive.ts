// passive.ts

export interface PasiveOptions {
  [key: string]: string | string[] | number;
  sinner: string[];
  season: string[];
  grade: string[];
  keyword: string[];
  resources: string[];
  activeConds: string;
  etcKeyword: string[];
}

export interface PassiveData {
  sinnerName: string;
  identityName: string;
  season: number;
  grade: number;
  keyword: string[];
  afterProfileImage: string;
  identitySkillLevelInfos: IdentitySkillLevelInfo[];
}

export interface IdentitySkillLevelInfo {
  level: number;
  identitySkillInfos: IdentitySkillInfo[];
}

export interface IdentitySkillInfo {
  rownum: number;
  skillName: string;
  isMain: boolean;
  resource: Record<string, number>;
  activeCond: string;
  effect: string;
  skillType: string;
}
