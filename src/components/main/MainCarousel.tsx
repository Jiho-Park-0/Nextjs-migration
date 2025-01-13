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
        imageUrl="https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/%ED%99%8D%EB%A3%A8/Identity/%EB%A7%88%EC%B9%A8%ED%91%9C%20%EC%82%AC%EB%AC%B4%EC%86%8C%20%ED%95%B4%EA%B2%B0%EC%82%AC/10611_gacksung.webp"
        spanText="발푸르기스의 밤"
        headingText="발푸르기스의 밤 인격 포함 티어 업데이트"
        linkPath="/tier"
        linkText="리세 티어 바로가기"
      />
      <Banner
        imageUrl="https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/%ED%99%8D%EB%A3%A8/Identity/%EB%A7%88%EC%B9%A8%ED%91%9C%20%EC%82%AC%EB%AC%B4%EC%86%8C%20%ED%95%B4%EA%B2%B0%EC%82%AC/10611_normal.webp"
        spanText="발푸르기스의 밤"
        headingText="마침표 사무소 해결사 홍루 추가"
        linkPath="/identity/132"
        linkText="인격 정보 바로가기"
      />
      <Banner
        imageUrl="https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/%ED%9E%88%EC%8A%A4%ED%81%B4%EB%A6%AC%ED%94%84/Identity/%EB%A7%88%EC%B9%A8%ED%91%9C%20%EC%82%AC%EB%AC%B4%EC%86%8C%20%ED%95%B4%EA%B2%B0%EC%82%AC/10711_gacksung.webp"
        spanText="발푸르기스의 밤"
        headingText="마침표 사무소 해결사 히스클리프 추가"
        linkPath="/identity/131"
        linkText="인격 정보 바로가기"
      />

      {/* 신규 기능 */}
      <Banner
        imageUrl="https://limbus-image-bucket.s3.ap-northeast-2.amazonaws.com/%ED%9E%88%EC%8A%A4%ED%81%B4%EB%A6%AC%ED%94%84/Identity/%EB%A7%88%EC%B9%A8%ED%91%9C%20%EC%82%AC%EB%AC%B4%EC%86%8C%20%ED%95%B4%EA%B2%B0%EC%82%AC/10711_normal.webp"
        spanText="내가 가진 인격 키워드를 모르겠다고?"
        headingText="내 인격 분류 기능 추가"
        linkPath="/deck"
        linkText="인격 분류 바로가기"
      />

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
