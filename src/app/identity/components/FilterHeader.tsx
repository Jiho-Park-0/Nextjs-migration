"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
import { useResetRecoilState } from "recoil";
import { optionsState } from "@/recoils/atoms";

const FilterHeader: React.FC = () => {
  const resetOptions = useResetRecoilState(optionsState);

  const handleResetOptions = () => {
    resetOptions();
    window.location.reload();
  };

  return (
    <div className={`w-[300px] min-w-[300px] hidden lg:block mt-2`}>
      <div className="flex justify-between items-center mb-8">
        <span className="text-3xl lg:text-4xl">필터</span>
        <Button
          onClick={handleResetOptions}
          className="bg-primary-400 px-4 py-1 text-lg text-primary-100 hover:bg-primary-300 rounded"
          placeholder={undefined}
        >
          초기화
        </Button>
      </div>
    </div>
  );
};

export default FilterHeader;
