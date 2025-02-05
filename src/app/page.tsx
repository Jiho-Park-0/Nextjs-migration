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
      <div className="text-white bg-primary-300 rounded-md p-2 md:p-4 lg:p-6 flex flex-col justify-between">
        안녕하세요 단빵숲 입니다.
        <br />
        2월 6일 업데이트와 함께 사이트 서버 점검으로 잠시 비활성화 될 수
        있습니다.
        <br />
        <br />
        이용 시 참고 바랍니다.
      </div>
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
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flimbus-image-bucket.s3.amazonaws.com%2F%EB%8F%88%ED%82%A4%ED%98%B8%ED%85%8C%2FIdentity%2FLCB%20%EC%88%98%EA%B0%90%EC%9E%90%2F10301_normal.webp&w=1080&q=10",
    link: "/identity",
  },
  {
    name: "에고 도감",
    image:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flimbus-image-bucket.s3.amazonaws.com%2F%EB%A3%8C%EC%8A%88%2FEGO%2F%ED%9D%89%ED%86%B5%2FThoracalgia_Ry%C5%8Dsh%C5%AB.webp&w=640&q=10",
    link: "/ego",
  },
  {
    name: "리세마라 티어표",
    image:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flimbus-image-bucket.s3.amazonaws.com%2F%EB%A1%9C%EC%9F%88%2FIdentity%2F%EB%82%A8%EB%B6%80%20%EB%A6%AC%EC%9A%B0%20%ED%98%91%ED%9A%8C%204%EA%B3%BC%20%EB%B6%80%EC%9E%A5%2F10908_normal.webp&w=1080&q=10",
    link: "/tier",
  },
  {
    name: "키워드별 인격 분류표",
    image:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Flimbus-image-bucket.s3.ap-northeast-2.amazonaws.com%2F%ED%8C%8C%EC%9A%B0%EC%8A%A4%ED%8A%B8%2FIdentity%2FLCE%20E.G.O%3A%3A%ED%99%8D%EC%97%BC%EC%82%B4%2F10211_gaksung.webp&w=1080&q=10",
    link: "/keyword",
  },
];
