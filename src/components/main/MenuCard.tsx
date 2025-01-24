"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Menu {
  name: string;
  image: string;
  link: string;
}

const MenuCard = ({ menu }: { menu: Menu }) => {
  return (
    <div className="rounded-lg w-full h-full overflow-hidden">
      <Link href={menu.link}>
        <div className="relative w-full h-full group">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 rounded-lg">
            <Image
              src={menu.image}
              alt={menu.name}
              fill
              className="object-cover transition-transform duration-500 ease-out transform group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              quality={30}
            />
          </div>

          {/* 오버레이: 배경 이미지 위에 반투명한 레이어 */}
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>

          {/* 텍스트 오버레이 */}
          <div className="relative z-10 text-center flex items-center justify-center h-full p-1">
            <div className="relative">
              <div className="text-white font-sans md:font-sansBold text-xs md:text-base lg:text-xl">
                {menu.name}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-200 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuCard;
