import Image from "next/image";
import KeywordHighlighted from "@/components/detail/KeywordHighlighted";
import useGetEngName from "@/hooks/useGetEngName";
import { IdentitySkillLevelInfo } from "@/interfaces/passive";

export interface PassiveThumbnailCardProps {
  sinnerName: string;
  identityName: string;
  season: number;
  grade: number;
  keyword: string[];
  afterProfileImage: string;
  isSync: boolean;
  identitySkillLevelInfos: IdentitySkillLevelInfo[];
}

const PassiveThumbnailCard = ({
  sinnerName,
  identityName,
  grade,
  afterProfileImage,
  isSync,
  identitySkillLevelInfos,
}: PassiveThumbnailCardProps) => {
  const getEngName = useGetEngName();

  const baseSkill =
    identitySkillLevelInfos.find((lvl) => lvl.level === 3)
      ?.identitySkillInfos[0] ?? null;

  const activeCondText = baseSkill?.activeCond ?? "";

  const resourceKey = baseSkill ? Object.keys(baseSkill.resource)[0] : "";
  const resourceEngName = resourceKey ? getEngName(resourceKey) : "";
  const resourceCount = baseSkill ? baseSkill.resource[resourceKey] : 0;

  const targetLevel = isSync ? 4 : 3;
  const targetSkill =
    identitySkillLevelInfos.find((lvl) => lvl.level === targetLevel)
      ?.identitySkillInfos[0] ?? null;
  const effectText = targetSkill?.effect ?? "";

  return (
    <div className="bg-primary-500 rounded-lg py-4 px-10 space-y-2">
      {/* 첫 번째 줄 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Image
            src={`/assets/common/${grade}.webp`}
            alt={`grade-${grade}`}
            width={30}
            height={20}
            className="object-contain flex-shrink-0"
          />
          <div className="text-primary-100 flex flex-col items-center justify-center text-center">
            <p className="text-sm md:text-base font-semibold">{identityName}</p>
            <p className="text-xs md:text-sm">{sinnerName}</p>
          </div>
        </div>

        {/* 발동조건 */}
        <div className="flex items-center gap-4">
          <p className="text-base text-white whitespace-nowrap">
            {activeCondText}
          </p>
          {resourceEngName && (
            <div className="flex items-center">
              <Image
                src={`/assets/resource/${resourceEngName}.webp`}
                alt={resourceEngName}
                width={24}
                height={24}
                className="inline-block w-6 h-6 object-contain"
                loading="lazy"
              />
              <span className="text-base text-white ml-1">
                x{resourceCount}
              </span>
            </div>
          )}
          <Image
            src={afterProfileImage}
            alt={identityName}
            width={60}
            height={60}
            className="rounded-full object-cover flex-shrink-0"
          />
        </div>
      </div>

      {/* 두 번째 줄: 레벨별 effect */}

      <KeywordHighlighted text={effectText} />
    </div>
  );
};

export default PassiveThumbnailCard;
