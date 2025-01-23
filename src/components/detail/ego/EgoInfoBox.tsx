import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Button, Collapse } from "@material-tailwind/react";
import Image from "next/image";

interface EgoInfoBoxProps {
  character: string;
  name: string;
  zoomImage: string;
  grade: string; // 에고는 문자열, 인격은 넘버
  season: number;
  resistance: string[];
  releaseDate: string;
  obtainingMethod: string;
  cost: number[];
}

// TODO: 이미지 경로 변경된 점 있어서 머지 후 수정 필요
const resourseImg = [
  "/assets/resource/Wrath.webp",
  "/assets/resource/Lust.webp",
  "/assets/resource/Sloth.webp",
  "/assets/resource/Gluttony.webp",
  "/assets/resource/Gloom.webp",
  "/assets/resource/Pride.webp",
  "/assets/resource/Envy.webp",
];

const EgoInfoBox = ({
  character,
  name,
  zoomImage,
  grade,
  season,
  resistance,
  releaseDate,
  obtainingMethod,
  cost,
}: EgoInfoBoxProps) => {
  const [open, setOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 960);

  const toggleOpen = () => setOpen((prevOpen) => !prevOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 960);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderCollapseContent = () => {
    return (
      <div className="flex flex-col items-center pb-4">
        <p className="text-primary-100">내성</p>
        <p className="p-1 text-xs md:text-sm flex flex-wrap justify-center items-center text-center">
          {Array.isArray(resistance) &&
            resistance.map((type, index) => (
              <span
                key={index}
                className={`flex items-center mr-2 mb-2 ${
                  type === "내성"
                    ? "text-gray-500"
                    : type === "취약"
                    ? "text-red-500"
                    : type === "견딤"
                    ? "text-gray-600"
                    : ""
                }`}
              >
                <Image
                  src={resourseImg[index]}
                  alt="beforeImage"
                  className="w-[14px] h-[14px] mr-[0.1rem]"
                  width={1024}
                  height={1024}
                  quality={10}
                  loading="lazy"
                />
                {type}{" "}
              </span>
            ))}
        </p>
        <p className="text-primary-100">코스트</p>
        <p className="p-1 text-xs md:text-sm flex">
          {Array.isArray(cost) &&
            cost.map((type, index) => (
              <span
                key={index}
                className={`flex items-center mr-2 ${
                  type === 0 ? "text-gray-600" : ""
                }`}
              >
                <Image
                  src={resourseImg[index]}
                  alt="beforeImage"
                  className="w-[14px] h-[14px] mr-[0.1rem]"
                  width={1024}
                  height={1024}
                  quality={10}
                  loading="lazy"
                />
                {type}{" "}
              </span>
            ))}
        </p>
        <p className="p-1 text-xs md:text-xs">
          <span className="text-primary-100">시즌</span>: {season}
        </p>

        <p className="p-1 text-xs md:text-xs">
          <span className="text-primary-100">출시시기</span>: {releaseDate}
        </p>

        <p className="p-1 text-xs md:text-xs text-center">{obtainingMethod}</p>
      </div>
    );
  };

  return (
    <div className="bg-primary-500 text-white w-64 rounded-md">
      <div className="w-64 h-auto py-4 gap-2 flex flex-col items-center relative">
        {/* tailwind에 퍼센티지는 없어서 일단 유지 */}
        <Image
          src={zoomImage}
          alt="profile"
          className="h-auto w-2/5"
          width={1024}
          height={1024}
          quality={50}
          loading="lazy"
        />

        <Image
          src={`/assets/common/${grade}.webp`}
          alt="grade"
          className=" h-auto"
          style={{ width: "40%" }}
          width={1024}
          height={1024}
        />

        <p className="text-xl font-bold font-sans text-primary-100">{name}</p>
        <p className="text-xl font-bold font-sans text-primary-100 -mt-2">
          {character}
        </p>

        {/* Button to trigger collapse on smaller screens */}
        <div className="lg:hidden">
          <Button
            onClick={toggleOpen}
            className="text-white flex items-center bg-transparent border-none shadow-none outline-none focus:outline-none"
            placeholder={"button"}
          >
            상세정보
            {open ? <FaArrowUp /> : <FaArrowDown />}
          </Button>
        </div>
      </div>

      {!isLargeScreen ? (
        <Collapse open={open}>{renderCollapseContent()}</Collapse>
      ) : (
        renderCollapseContent()
      )}
    </div>
  );
};

export default EgoInfoBox;
