import React from "react";
import MainCarousel from "@/components/main/MainCarousel";
import MenuCard from "@/components/main/MenuCard";
import SiteButton from "@/components/main/SiteButton";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";
import Image from "next/image";
import Skeleton from "@/components/main/Skeleton";
import { Suspense, lazy } from "react";

const YoutubePlay = lazy(() => import("@/components/main/YoutubePlay"));
const NewsCard = lazy(() => import("@/components/main/NewsCard"));

export default function Home() {
  return (
    <div className="py-1 md:py-10 flex flex-col gap-3 md:gap-12">
      {/* <div className="text-white bg-primary-300 rounded-md p-2 md:p-4 lg:p-6 flex flex-col justify-between">
        커밋 테스트
        
      </div> */}
      <div className="w-full mx-auto">
        <MainCarousel />
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-10">
        {/* YoutubePlay가 화면의 60%를 차지하게 설정 */}
        <div className="w-full md:w-3/5">
          <YoutubePlay />
        </div>
        {/* NewsCard가 나머지 40%를 차지하게 설정 */}

        <div className="w-full md:w-2/5">
          <Suspense fallback={<Skeleton />}>
            <NewsCard />
          </Suspense>
        </div>
      </div>
      <div className="flex justify-between w-full h-20 md:h-28 lg:h-40 gap-2 md:gap-4">
        <MenuCard menu={menu[0]} />
        <MenuCard menu={menu[1]} />
        <MenuCard menu={menu[2]} />
        <MenuCard menu={menu[3]} />
      </div>
      <div className="flex gap-6 mx-auto">
        <SiteButton
          name={"공식 홈페이지"}
          link={"https://limbuscompany.kr"}
          icon={
            <Image
              src="https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcShROIHRbR4rWXlRoqw87jfeT3592yG1IN18E6titTVZNKsz9YNygkYhSM9e5Ts1xgDedkpjShwJIMaqDHd1mMn0GObkYg0hVPXAeMOndnEhZI1PpqaqKbEVQ"
              alt="LCB favicon"
              width={23}
              height={23}
            />
          }
        />
        <SiteButton
          name={"@LimbusCompany_B"}
          link={"https://twitter.com/LimbusCompany_B"}
          icon={<FaSquareXTwitter size={25} className="text-primary-500" />}
        />
        <SiteButton
          name={"ProjectMoon 유튜브"}
          link={"https://www.youtube.com/channel/UCpqyr6h4RCXCEswHlkSjykA"}
          icon={<FaSquareYoutube size={25} className="text-primary-500" />}
        />
      </div>
    </div>
  );
}

const menu = [
  {
    name: "인격 도감",
    image:
      "https://limbus-image-bucket.s3.amazonaws.com/%EC%9D%B4%EC%83%81/Identity/LCB%20%EC%88%98%EA%B0%90%EC%9E%90/10101_normal.webp",
    link: "/identity",
  },
  {
    name: "에고 도감",
    image:
      "https://limbus-image-bucket.s3.amazonaws.com/%EB%A1%9C%EC%9F%88/EGO/%ED%95%8F%EB%B9%9B%EC%9A%95%EB%A7%9D/20906_cg.webp",
    link: "/ego",
  },
  {
    name: "리세마라 티어표",
    image:
      "https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/%ED%99%8D%EB%A3%A8/Identity/20%EA%B5%AC%20%EC%9C%A0%EB%A1%9C%EC%A7%80%EB%B9%84/10609_gacksung.webp",
    link: "/tier",
  },
  {
    name: "키워드별 인격 분류표",
    image:
      "https://limbus-image-bucket.s3.amazonaws.com/%EA%B7%B8%EB%A0%88%EA%B3%A0%EB%A5%B4/Identity/%ED%9D%91%EC%9A%B4%ED%9A%8C%20%EB%B6%80%EC%A1%B0%EC%9E%A5/11208_normal.webp",
    link: "/keyword",
  },
];
