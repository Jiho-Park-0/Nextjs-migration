import React from "react";

const Error = () => {
  return (
    <div className="w-full h-fit bg-red-300 text-red-900 rounded-md p-4 md:p-6 lg:p-10 flex flex-col justify-between">
      <h2 className="font-sansBold text-base md:text-xl lg:text-2xl">
        에러 발생
      </h2>
      <div className="font-body mt-4 flex flex-col justify-between flex-grow">
        <p className="text-sm">
          뉴스를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    </div>
  );
};

export default Error;
