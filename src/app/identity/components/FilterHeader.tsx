"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
import { useResetRecoilState } from "recoil";
import { optionsState } from "@/recoils/atoms";

const FilterHeader = () => {
  const resetOptions = useResetRecoilState(optionsState);

  const handleResetOptions = () => {
    resetOptions();
    window.location.reload();
  };

  return (
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
  );
};

export default FilterHeader;
