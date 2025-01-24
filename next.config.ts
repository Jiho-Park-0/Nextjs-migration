import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 기존 설정 유지
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // 이미지 최적화 설정
  images: {
    unoptimized: false, // Next.js 이미지 최적화 활성화
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "limbus-image-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "limbus-image-bucket.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },

  // 정적 파일 및 캐시 헤더 설정
  async headers() {
    return [
      {
        source: "/assets/:path*", // /public/assets 경로에 캐싱 헤더 추가
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1년간 캐싱
          },
        ],
      },
      {
        source: "/fonts/:path*", // /public/fonts 경로에도 캐싱 적용
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
