import EgoSkillCard from "./EgoSkillCard";
import useStore from "@/zustand/store";

interface Props {
  EgoSkills: {
    EgoSkill1s: Skill[][];
    EgoSkill2s: Skill[][];
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
      {EgoSkill1s.map((skills, idx) => {
        // 2개씩 잘라서 chunk 배열 생성
        const chunks: Skill[][] = [];
        for (let i = 0; i < skills.length; i += 2) {
          chunks.push(skills.slice(i, i + 2));
        }
        return chunks.map((chunk, chunkIdx) => (
          <EgoSkillCard
            key={`awakening-${idx}-${chunkIdx}`}
            type="Awakening"
            synchronization={synchronization.synchronization}
            skill={chunk}
          />
        ));
      })}
      {EgoSkill2s.map((skills, idx) => {
        const chunks: Skill[][] = [];
        for (let i = 0; i < skills.length; i += 2) {
          chunks.push(skills.slice(i, i + 2));
        }
        return chunks.map((chunk, chunkIdx) => (
          <EgoSkillCard
            key={`corrosion-${idx}-${chunkIdx}`}
            type="Corrosion"
            synchronization={synchronization.synchronization}
            skill={chunk}
          />
        ));
      })}
    </div>
  );
};

export default EgoSkills;
