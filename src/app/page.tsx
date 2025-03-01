import React from "react";
import MainCarousel from "@/components/main/MainCarousel";
import MenuCard from "@/components/main/MenuCard";
import SiteButton from "@/components/main/SiteButton";
import Donation from "@/components/main/Donation";
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
        안녕하세요 단빵숲 입니다.
        <br />
        <div>
          금일 22일 오후 6시 부터 간단한 점검이 있어 사이트가 잠시 비활성화 될
          예정입니다. <br />
          이용에 참고 바랍니다.
        </div>
        <br />
        <div> 감사합니다.</div>
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

        <div className="w-full md:w-2/5 flex flex-col gap-3 md:gap-6">
          <Suspense fallback={<Skeleton />}>
            <NewsCard />
          </Suspense>

          <Donation />
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
      "https://limbus-image-bucket.s3.amazonaws.com/돈키호테/Identity/LCB 수감자/10301_normal.webp",
    link: "/identity",
  },
  {
    name: "에고 도감",
    image:
      "https://limbus-image-bucket.s3.amazonaws.com/오티스/EGO/마탄/21108_cg.webp",
    link: "/ego",
  },
  {
    name: "리세마라 티어표",
    image:
      "https://limbus-image-bucket.s3.amazonaws.com/로쟈/Identity/남부 리우 협회 4과 부장/10908_normal.webp",
    link: "/tier",
  },
  {
    name: "키워드별 인격 분류표",
    image:
      "https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/이스마엘/Identity/흑운회 부조장/10811_gaksung.webp",
    link: "/keyword",
  },
];
