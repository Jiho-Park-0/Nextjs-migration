"use client";
import React from "react";
import { Button, Tooltip } from "@material-tailwind/react";
import Image from "next/image";

interface FilterButtonProps {
  name: string;
  imgSrc: string;
  type?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const FilterButton = ({
  name,
  imgSrc,
  type,
  isSelected,
  onClick,
}: FilterButtonProps) => {
  // width/height 클래스를 조건부로 결정
  const sizeClasses =
    type === "largeText" ? "w-[86px] h-[40px]" : "w-[40px] h-[40px]";

  return (
    <Tooltip
      content={name}
      className={`bg-primary-450 text-primary-100 text-xs rounded ${
        type === "text" ? "hidden" : ""
      }`}
    >
      <Button
        key={`button:${name}`}
        className={`
          bg-primary-450
          ${sizeClasses}
          px-1 py-1 text-md text-primary-100
          hover:bg-primary-300
          rounded
          ${type === "text" ? "!pt-2" : ""}
          ${isSelected ? "bg-primary-400 border border-primary-100" : ""}
        `}
        onClick={onClick}
        ripple={false}
        value={name}
      >
        {type === "text" || type === "largeText" ? (
          <span className="text-xl text-white">{name}</span>
        ) : (
          <Image
            src={imgSrc}
            alt={name}
            className={`w-auto h-6 object-fill mx-auto ${
              name.includes("성") ? "!h-5" : ""
            }`}
            width={24}
            height={24}
            unoptimized
            quality={10}
            loading="lazy"
          />
        )}
      </Button>
    </Tooltip>
  );
};

export default FilterButton;
