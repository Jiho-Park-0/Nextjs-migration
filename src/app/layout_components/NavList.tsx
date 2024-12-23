"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import nav from "@/app/constants/nav.json";

interface NavListProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

const NavList: React.FC<NavListProps> = ({ setIsNavOpen }) => {
  const pathname = usePathname(); // 현재 경로를 가져옴

  return (
    <ul className="mt-2 mb-2 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
      {nav.map((item) => {
        const isActive = pathname === item.link; // 현재 경로와 nav의 링크를 비교

        return (
          <li key={`nav:${item.title}`} onClick={() => setIsNavOpen(false)}>
            <Link href={item.link}>
              <Typography
                as="span"
                variant="small"
                className={`p-1 font-bold text-base md:text-sm text-primary-100 ${
                  isActive
                    ? "pb-1 border-b-2 border-b-primary-100 transition duration-500 ease-in-out"
                    : "bg-transparent border-b-2 border-transparent"
                }`}
              >
                {item.title}
              </Typography>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavList;
