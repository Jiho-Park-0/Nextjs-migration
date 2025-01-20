import type { Metadata, Viewport } from "next";
import Header from "@/components/main/layout_components/Header";
import Footer from "@/components/main/layout_components/Footer";
import QueryProvider from "@/components/main/layout_components/QueryProvider";
import "./globals.css";
import { GoogleAdSense } from "./GoogleAdSense";
import { GoogleAnalytics } from "./GoogleAnalytics";

export const metadata: Metadata = {
  title: "림버스 컴퍼니 정보 사이트 - 단빵숲",
  description: "최신 티어표 · 인격 · 에고 · 도감 · 필터링",
  keywords: ["림버스 컴퍼니", "인격", "에고", "도감", "필터링"],
  authors: [{ name: "단빵숲" }],
  metadataBase: new URL("https://bas-limbus.info/"),
  openGraph: {
    title: "림버스 컴퍼니 정보 사이트 단빵숲",
    description: "최신 티어표 · 인격 · 에고 · 도감 · 필터링",
    url: "https://bas-limbus.info/",
    siteName: "단빵숲",
    images: "/logo.webp",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "림버스 컴퍼니 정보 사이트 단빵숲",
    description: "최신 티어표 · 인격 · 에고 · 도감 · 필터링",
    images: "/logo.webp",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "G-SZT3Y0FH40",
    other: {
      "naver-site-verification": "dc7096e8902186b63c161c36249b62c3768f75f8",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3A2716",
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
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="7b3cd3678a44f4544fe00c8528369f8068301d64"
        />
      </head>
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
