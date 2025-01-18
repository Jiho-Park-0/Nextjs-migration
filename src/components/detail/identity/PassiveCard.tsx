import React from "react";
import KeywordHighlighted from "../KeywordHighlighted";
import Image from "next/image";
import useGetEngName from "@/hooks/useGetEngName";

interface PassiveCardProps {
  type: string; // 패시브, 서포트 패시브
  passive: Passive;
}

interface Passive {
  name: string;
  isMain: boolean;
  resource: string;
  resQuantity: number;
  activeCond: string;
  effect: string;
}

const PassiveCard = ({ type, passive }: PassiveCardProps) => {
  const getEngName = useGetEngName();
  // resource 문자열을 ',' 기준으로 분리
  const resources = passive.resource.split(",").map((res) => res.trim());

  // resQuantity를 십의 자리와 일의 자리로 분리하여 resource 개수에 맞게 배열 생성
  const quantities =
    passive.resQuantity >= 30
      ? [Math.floor(passive.resQuantity / 10), passive.resQuantity % 10]
      : [passive.resQuantity];

  return (
    <div className="p-3 bg-primary-500 mb-2 rounded-md">
      <div className="xl:flex xl:gap-3 items-center pb-2 lg:pb-4">
        <div
          className={`text-sm sm:text-lg xl:text-xl font-bold pr-4 lg:p-0 pb-2 mb-2 xl:mb-0 border-b-4 ${
            resourceColorMap[resources[0]]
          }`}
        >
          <span className="pr-4">{type}</span>
          <span>{passive.name}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 text-sm lg:text-base">
          {resources.map((res, index) => (
            <div key={index} className="flex items-center gap-2">
              {res !== "없음" && (
                <>
                  <Image
                    src={`/assets/resource/${getEngName(res)}.webp`}
                    alt="resourceImg"
                    className="w-auto h-[1.3em] mb-0.5 inline-block"
                    width={1024}
                    height={1024}
                  />
                  <span>X</span>
                  <span>{quantities[index] ?? quantities[0]}</span>
                  <span>{passive.activeCond}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-sm sm:text-base">
        <KeywordHighlighted text={passive.effect} />
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

export default PassiveCard;
