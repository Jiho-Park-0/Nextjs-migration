import type { Metadata } from "next";
import Header from "@/components/main/layout_components/Header";
import Footer from "@/components/main/layout_components/Footer";
import QueryProvider from "@/components/main/layout_components/QueryProvider";
import "./globals.css";
import { GoogleAdSense } from "./GoogleAdSense";
import { GoogleAnalytics } from "./GoogleAnalytics";

export const metadata: Metadata = {
  title: "림버스 컴퍼니 정보 사이트 - 단빵숲",
  description: "최신 티어표 · 인격 · 에고 · 도감 · 필터링",
};

/**
 * 헤더, 푸터 등을 포함한 메인 레이아웃
 * 가로 여백: px-4 md:px-10
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-primary-450`}>
        <Header />

        <div className="w-full max-w-7xl py-4 mx-auto px-4 md:px-16 font-content">
          <QueryProvider>{children}</QueryProvider>
        </div>
        <Footer />
      </body>
      <GoogleAdSense />
      <GoogleAnalytics />
    </html>
  );
}
