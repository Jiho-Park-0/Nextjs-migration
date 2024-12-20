import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 기존 설정 유지 */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  /* 외부 이미지 도메인 설정 */
  images: {
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
    ],
  },
};

export default nextConfig;
