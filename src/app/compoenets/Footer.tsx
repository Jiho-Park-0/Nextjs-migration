"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import nav from "@/app/constants/nav.json";
import PrivacyPolicy from "@/app/compoenets/PrivacyPolicy";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-primary-400 px-4 md:px-16 py-6">
      <hr className="border-primary-100 mb-6" />
      <div className="md:flex md:justify-between">
        <div className="text-center md:text-left mt-2 text-primary-100">
          <Typography className="font-title text-md">
            단테의 빵과 수프
          </Typography>
          <Typography className="text-xs py-2 font-light">
            팀 단테의 빵과 수프입니다.
            <br />
            문의사항이나 버그 제보는 아래로 연락해주세요.
            <br />
            bas.limbus@gmail.com
            <br />
            <br />© 2024 baslimbus
            <br />
            단테의 빵과 수프는 프로젝트문 공식 서비스가 아니며, 모든 게임
            아트워크, 정보, 애셋의 권리와 저작권은 해당
          </Typography>
        </div>
        <div className="hidden md:flex mb-14">
          <ul className="mt-2 mb-2 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
            {nav.map((item) => (
              <Typography
                key={`footer_nav:${item.title}`}
                as="li"
                variant="small"
                className="p-1 font-light text-xs md:text-sm text-primary-100"
              >
                <Link href={item.link}>{item.title}</Link>
              </Typography>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Image
          src="/assets/logo_footer.webp"
          alt="footer_logo"
          className="w-8 h-8 md:w-10 md:h-10"
          width={1024}
          height={1024}
        />

        <div className="flex items-center">
          <div className="p-1 font-light text-xs md:text-sm text-primary-100">
            <Typography
              variant="small"
              className="p-1 font-light text-xs md:text-sm text-primary-100 cursor-pointer"
              placeholder=""
            >
              <a
                href="https://toon.at/donate/breadandsoup"
                target="_blank"
                rel="noopener noreferrer"
              >
                후원하기(투네이션)
              </a>
            </Typography>
            <Typography
              variant="small"
              className="p-1 font-light text-xs md:text-sm text-primary-100 cursor-pointer"
              placeholder=""
            >
              <a
                href="https://www.patreon.com/BreadAndSoup"
                target="_blank"
                rel="noopener noreferrer"
              >
                후원하기(패트리온)
              </a>
            </Typography>
          </div>

          <div className="p-1 font-light text-xs md:text-sm text-primary-100">
            <PrivacyPolicy />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
