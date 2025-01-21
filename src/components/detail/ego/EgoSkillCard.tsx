import React from "react";
import KeywordHighlighted from "../KeywordHighlighted";
import Image from "next/image";
import useGetEngName from "@/hooks/useGetEngName";

interface SkillCardProps {
  type: string;
  synchronization: number; // 3동기화 기준 0, 4동기화 기준 1
  skill: Skill[];
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

const EgoSkillCard = ({ type, synchronization, skill }: SkillCardProps) => {
  const getEngName = useGetEngName();
  const currentSkill = skill[synchronization];

  if (!skill || skill.length === 0) {
    return null;
  }

  const resourceEngName = getEngName(currentSkill.resource);
  const typeEngName = getEngName(currentSkill.atkType);

  return (
    <div
      className={`p-3 mb-2 bg-primary-450 rounded-md border-primary-300 border ${
        type === "Corrosion" && "shadow-inner-black border-primary-450"
      }`}
    >
      <div className="xl:flex xl:gap-3 items-center pb-2 lg:pb-4">
        {/* 스킬 이름 */}
        <div
          className={`text-sm sm:text-lg xl:text-xl font-bold pr-4 lg:p-0 pb-2 mb-2 xl:mb-0 border-b-4 ${
            resourceColorMap[currentSkill.resource]
          }`}
        >
          {currentSkill.resource !== "없음" && (
            <Image
              src={`/assets/resource/${resourceEngName}.webp`}
              alt="resourceImg"
              className="inline-block w-auto h-6 mr-1 mb-1"
              width={1024}
              height={1024}
              quality={10}
              loading="lazy"
            />
          )}
          {/* 각성, 침식 */}
          <span
            className={type === "Corrosion" ? "text-gray-600" : "text-white"}
          >
            {currentSkill.name}
          </span>
          <Image
            src={`/assets/attackType/${typeEngName}.webp`}
            alt="attackTypeImg"
            className="inline-block w-auto h-8 ml-[1px] mb-1"
            width={1024}
            height={1024}
            quality={10}
            loading="lazy"
          />
        </div>
        {/* 스킬 스펙 */}
        <div className=" items-center text-primary-100 text-xs lg:text-sm">
          {/* 윗단 */}
          <div className="md:flex pb-2 items-center gap-1 md:gap-3">
            <span className="flex items-center">
              <span className="flex items-center justify-center">
                {/* 코인 이미지 */}
                {[...Array(currentSkill.coinNum)].map((_, index) => {
                  const effectKey = `coin${index + 1}Effect`;
                  const effect = currentSkill[
                    effectKey as keyof Skill
                  ] as string;
                  const effectParts = effect.split("\n");
                  let coinString = "normal_coin";
                  // 첫 문장이 '파괴 불가 코인'인 경우
                  const isUnbreakableCoin = effectParts[0] === "파괴 불가 코인";
                  if (isUnbreakableCoin) {
                    coinString = "unbreakable_coin";
                  }
                  return (
                    <Image
                      key={index}
                      src={`/assets/coin/${coinString}.webp`}
                      alt="coinImg"
                      className="w-auto h-[1em] mr-[2px]"
                      width={16}
                      height={16}
                      quality={10}
                      loading="lazy"
                    />
                  );
                })}
              </span>
              <span className="pr-1">정신력 소모량</span>
              <span className="flex items-center gap-1">
                <Image
                  src={`/assets/Sanity.webp`}
                  alt="attackTypeImg"
                  className="inline-block w-auto h-5 ml-[1px] mb-1"
                  width={1024}
                  height={1024}
                  quality={10}
                  loading="lazy"
                />
                <span className="text-white">{currentSkill.mentalConsume}</span>
              </span>
            </span>

            <span className="">
              공격 레벨{" "}
              <Image
                src={`/assets/attack_level.webp`}
                alt="attackTypeImg"
                className="inline-block w-auto h-5 pr-1 mb-1"
                width={1024}
                height={1024}
                quality={10}
                loading="lazy"
              />
              <span className="text-white">{currentSkill.power}</span>
            </span>

            <span className="flex items-center">
              <span className="w-[3em]">가중치 </span>
              {[...Array(currentSkill.atkWeight)].map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-600 ml-[3px] mb-0.5"
                ></div>
              ))}
            </span>
            <span className="mr-2 sm:mr-0">
              스킬 위력{" "}
              <span className="text-white">{currentSkill.skillPower}</span>
            </span>
            <span className="">
              코인 위력{" "}
              <span className="text-white">{currentSkill.coinPower}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="text-sm sm:text-base">
        <KeywordHighlighted text={currentSkill.normalEffect} />
        <div>
          {[...Array(currentSkill.coinNum)].map((_, index) => {
            const effectKey = `coin${index + 1}Effect`;
            const effect = currentSkill[effectKey as keyof Skill] as string;
            if (effect.trim() !== "") {
              const effectParts = effect.split("\n");

              return (
                <div className="flex items-start" key={index}>
                  <Image
                    src={`/assets/coin/coin${index + 1}.webp`}
                    alt="coinImg"
                    className="mr-1 mt-0.5"
                    style={{ width: "auto", height: "16px" }}
                    width={1024}
                    height={1024}
                    quality={10}
                    loading="lazy"
                  />
                  <div>
                    {effectParts.map((part: string, partIndex: number) => (
                      <React.Fragment key={partIndex}>
                        <KeywordHighlighted text={part} />
                        {partIndex !== effectParts.length - 1}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

const resourceColorMap: { [key: string]: string } = {
  분노: "border-b-res-red",
  색욕: "border-b-res-orange",
  나태: "border-b-res-yellow",
  탐식: "border-b-res-green",
  우울: "border-b-res-blue",
  오만: "border-b-res-navy",
  질투: "border-b-res-purple",
};

export default EgoSkillCard;
