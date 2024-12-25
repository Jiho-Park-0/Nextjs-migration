"use client";

import React, { useState } from "react";
import Filter from "./Filter";

const FilterModal: React.FC = () => {
  const [openFilter, setOpenFilter] = useState(false);
  // 모달 배경 클릭 시 닫기
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setOpenFilter(false);
    }
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        openFilter ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackgroundClick}
    >
      {/* h-5/6 추가 */}
      {/* 화면 크기보다 크면 스크롤이 필요 */}
      <div
        className={`bg-primary-500 p-0 h-5/6 rounded-lg w-11/12 max-w-sm transition-transform duration-300 max-h-screen overflow-y-auto ${
          openFilter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-end items-center m-0 p-2 pb-0 ">
          <button
            onClick={() => setOpenFilter(false)}
            className="text-primary-100 hover:text-primary-200 text-2xl"
          >
            &times;
          </button>
        </div>
        <Filter />
      </div>
    </div>
  );
};

export default FilterModal;
