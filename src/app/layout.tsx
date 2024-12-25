import type { Metadata } from "next";
import Header from "@/app/layout_components/Header";
import Footer from "@/app/layout_components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
