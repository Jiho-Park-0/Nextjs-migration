import React from "react";
import MainCarousel from "@/components/main/MainCarousel";
import MenuCard from "@/components/main/MenuCard";
import SiteButton from "@/components/main/SiteButton";
import Donation from "@/components/main/Donation";
import ApplyForm from "@/components/main/ApplyForm";
import Toss from "@/components/main/Toss";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";
import Image from "next/image";
// import Skeleton from "@/components/main/Skeleton";
import { lazy } from "react";
// import Link from "next/link";

const YoutubePlay = lazy(() => import("@/components/main/YoutubePlay"));
//const NewsCard = lazy(() => import("@/components/main/NewsCard"));

export default function Home() {
  return (
    <div className="py-1 md:py-10 flex flex-col gap-3 md:gap-12">
      {/* <div className="text-white bg-primary-300 rounded-md p-2 md:p-4 lg:p-6 flex flex-col justify-between">
        <div className="text-center">
          안녕하세요. 단빵숲 입니다. <br />
          신규 프론트엔드 팀원을 모집하고 있습니다. 많은 참여 바립니다!
          <br />
          <Link
            className="font-bold text-primary-100 hover:text-primary-500"
            href="https://docs.google.com/forms/d/1C0jJuaS8GgATmrvetARmOqRER6dx_MWx-YhnPUQ54Xg/edit"
          >
            지원하기
          </Link>
          <br />
        </div>
      </div> */}
      <div className="w-full mx-auto">
        <MainCarousel />
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-3 md:gap-10">
        {/* YoutubePlay가 화면의 60%를 차지하게 설정 */}
        <div className="w-full md:w-3/5">
          <YoutubePlay />
        </div>
        {/* NewsCard가 나머지 40%를 차지하게 설정 */}

        <div className="w-full md:w-2/5 flex flex-col gap-3 md:gap-6 ">
          <div className="flex-1 h-1/2">
            <ApplyForm />
          </div>
          <div className="flex-1 h-1/2">
            <Donation />
          </div>
          <div className="flex-1 h-1/2">
            <Toss />
          </div>
          {/* <Suspense fallback={<Skeleton />}>
            <NewsCard />
          </Suspense> */}
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
