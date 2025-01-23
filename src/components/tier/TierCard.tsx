import React from "react";
import { TierData } from "@/interfaces/identity";
import Link from "next/link";
import Image from "next/image";

// 발푸밤
const walpurgisIds = [13, 34, 83, 84, 103, 119, 120, 131, 132]; // 후파우, 갈루, 마티스, 초돈, 런싱, 적슈, 죽나상, 탕히스, 탕후루

// 이번 시즌 자판기 획득 불가(전 시즌 인격에서 통상 제외)
const previousSeasonIds = [94, 95, 96, 97, 98, 99, 118];

// 이번 시즌 추출 및 자판기 획득 불가(전 시즌 이벤트 인격)
const previousEvent = [116, 117, 110, 111]; // 멀파우, 멀히스, 탐루, 유슈

const TierCard = ({ data, isSync }: { data: TierData; isSync: boolean }) => {
  const isWalpurgis = walpurgisIds.includes(data.id);
  const isPreviousSeason = previousSeasonIds.includes(data.id);
  const isPreviousEvent = previousEvent.includes(data.id);

  const getBackgroundColor = () => {
    if (isWalpurgis) {
      return "bg-[#0E321A] bg-opacity-70";
    } else if (isPreviousSeason) {
      return "bg-yellow-800 bg-opacity-40";
    } else if (isPreviousEvent) {
      return "bg-[#320E0E] bg-opacity-70";
    } else {
      return "bg-black bg-opacity-80";
    }
  };

  return (
    <Link href={`/identity/${data.id}`}>
      <li key={data.id} className="relative h-16 w-28 md:h-24 md:w-40">
        <div className="h-full w-full overflow-hidden flex items-center justify-center">
          <Image
            src={
              isSync ? data.afterImage.trimEnd() : data.beforeImage.trimEnd()
            }
            alt={data.name}
            className="min-h-full min-w-full object-center"
            width={1024}
            height={1024}
            quality={1}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>
        <div
          className={`absolute bottom-0 w-full h-2/5 flex flex-col items-end justify-center text-white text-[8px] leading-tight tracking-tighter md:text-xs font-sansLight pr-2 ${getBackgroundColor()}`}
        >
          <span>{data.name}</span>
          <span>{data.character}</span>
        </div>
      </li>
    </Link>
  );
};

export default TierCard;
