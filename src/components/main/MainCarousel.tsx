"use client";

import { Carousel } from "@material-tailwind/react";
import Banner from "./Banner";

const MainCarousel = () => {
  return (
    <Carousel
      placeholder=""
      className=""
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {/* 업데이트 */}

      <Banner
        imageUrl="https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/%EB%A1%9C%EC%9F%88/Identity/%ED%9D%91%EC%88%98-%EC%82%AC/10912_gacksung.webp"
        spanText="이걸로 팔십… 조금만 더 채우면 [짐승]으로 사는 것도 끝일 거야."
        headingText="흑수 - 사 로쟈 추가"
        linkPath="/identity/146"
        linkText="인격 정보 바로가기"
      />
      <Banner
        imageUrl="https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B7%B8%EB%A0%88%EA%B3%A0%EB%A5%B4/Identity/%ED%9D%91%EC%88%98-%EC%82%AC/11212_gacksung.webp"
        spanText="낯선 [도구]에 원한을 품는 건, 이상하잖아?"
        headingText="흑수 - 사 그레고르 추가"
        linkPath="/identity/145"
        linkText="인격 정보 바로가기"
      />
      {/* 신규 기능 */}
      {/* 발푸밤 리세 홍보 */}
      {/* <Banner
        imageUrl="https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/%EB%A3%8C%EC%8A%88/Identity/%EB%A1%9C%EB%B3%B4%ED%86%A0%EB%AF%B8%20E.G.O::%EC%A0%81%EC%95%88%20%C2%B7%20%EC%B0%B8%ED%9A%8C/10410_gacksung.webp"
        spanText="신규 관리자를 위한"
        headingText="리세마라용 티어표 출시 (발푸밤 포함)"
        linkPath="/tier"
        linkText="리세 티어표 바로가기"
      /> */}
    </Carousel>
  );
};

export default MainCarousel;
