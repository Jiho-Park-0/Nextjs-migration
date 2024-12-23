import React from "react";

const Skeleton = () => {
  return (
    <div className="w-full h-fit bg-primary-300 text-primary-100 rounded-md p-4 md:p-6 lg:p-10 flex flex-col justify-between">
      <h2 className="font-sansBold text-base md:text-xl lg:text-2xl">
        최신 소식
      </h2>
      <div className="font-body mt-4 flex flex-col justify-between flex-grow">
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <div className="h-4 bg-primary-200 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-primary-200 rounded w-full mb-2"></div>
            {index < 2 && <hr className="border-t border-primary-200 my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
