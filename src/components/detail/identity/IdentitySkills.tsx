import IdentitySkillCard from "./IdentitySkillCard";
import useStore from "@/zustand/store";
import { Skill } from "@/interfaces/identityDetail";

interface Props {
  identitySkills: Skill[][];
}

const IdentitySkills = ({ identitySkills }: Props) => {
  const synchronization = useStore((state) => state.synchronizationState);

  // 배열을 크기가 2인 배열로 변환하는 함수
  const splitIntoPairs = (skillsArray: Skill[][]): Skill[][] => {
    const result: Skill[][] = [];
    for (const skills of skillsArray) {
      for (let i = 0; i < skills.length; i += 2) {
        result.push(skills.slice(i, i + 2));
      }
    }
    return result;
  };

  // 변환된 배열을 저장
  const processedIdentitySkills = splitIntoPairs(identitySkills);

  // skillSeq에 따라 type을 설정하는 함수
  const getTypeBySkillSeq = (skillSeq: number) => {
    switch (skillSeq) {
      case 1:
        return "1 Skill";
      case 2:
        return "2 Skill";
      case 3:
        return "3 Skill";
      case 4:
        return "DEFENSE";
      default:
        return "Unknown Skill";
    }
  };

  return (
    <div>
      {processedIdentitySkills.map((skills, index) => (
        <IdentitySkillCard
          key={index}
          type={getTypeBySkillSeq(skills[0]?.skillSeq || 0)}
          synchronization={synchronization.synchronization}
          skill={skills}
        />
      ))}
    </div>
  );
};

export default IdentitySkills;
