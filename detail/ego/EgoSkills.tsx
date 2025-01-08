import EgoSkillCard from "./EgoSkillCard";
import useStore from "@/zustand/store";

interface Props {
  EgoSkills: {
    EgoSkill1s: Skill[];
    EgoSkill2s: Skill[];
  };
}

interface Skill {
  name: string;
  power: string;
  mentalConsume: number; // 정신력 소모량
  atkType: string;
  resource: string;
  skillPower: number;
  coinPower: number;
  atkWeight: number;
  construeLevel: number;
  coinNum: number;
  normalEffect: string;
  coin1Effect: string;
  coin2Effect: string;
  coin3Effect: string;
  coin4Effect: string;
  coin5Effect: string;
}

const EgoSkills = ({ EgoSkills }: Props) => {
  const { EgoSkill1s, EgoSkill2s } = EgoSkills;
  const synchronization = useStore((state) => state.synchronizationState);

  return (
    <div>
      <EgoSkillCard
        type="Awakening"
        synchronization={synchronization.synchronization}
        skill={EgoSkill1s}
      />
      <EgoSkillCard
        type="Corrosion"
        synchronization={synchronization.synchronization}
        skill={EgoSkill2s}
      />
    </div>
  );
};

export default EgoSkills;
