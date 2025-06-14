"use client";

import DeckBuildingCard from "./DeckBuildingCard";
import { Button, Input, Tooltip } from "@material-tailwind/react";
import { LuSearch } from "react-icons/lu";

export default function DeckBuildingWrap() {
  return (
    <div>
      <div className="flex justify-between w-full">
        <span className="text-3xl lg:text-4xl whitespace-nowrap hidden lg:block pr-2">
          덱 빌딩
        </span>
        <div className="flex gap-2">
          <Tooltip
            className="bg-primary-500 text-primary-100 text-xs"
            content={<span>uuid 추출</span>}
          >
            <Button
              className="min-w-[80px] flex gap-2 items-center bg-primary-400 px-2 md:px-4 py-0 md:py-1 font-sansLight text-sm md:text-base text-white hover:bg-primary-300 rounded"
              placeholder={undefined}
            >
              <span className="pt-1 whitespace-nowrap">추출</span>
            </Button>
          </Tooltip>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              placeholder="이름으로 검색"
              className="!border-none pl-9 placeholder:text-primary-100 text-white focus:!border-primary-300 !focus:ring-0 !focus:outline-none !focus:ring-0 !focus:ring-offset-0 !focus:ring-offset-transparent !focus:border-transparent !focus:ring-transparent"
              containerProps={{
                className:
                  "min-w-[100px] md:min-w-[200px] !bg-primary-400 !rounded-full !pt-1 !h-8 md:!h-10",
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
            />
            <div className="!absolute left-3 top-[8px]">
              <LuSearch className="md:w-6 md:h-6" />
            </div>
          </div>
        </div>
      </div>
      <DeckBuildingCard />
    </div>
  );
}
