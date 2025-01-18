import { Button, Collapse } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Image from "next/image";

interface IdentityInfoBoxProps {
  character: string;
  name: string;
  affiliation: string;
  afterProfileImage: string;
  grade: number;
  season: number;
  releaseDate: string;
  obtainingMethod: string;
  resistance: string[];
  status: {
    life: string;
    speed: string;
    defend: string;
  };
}

// TODO: 이미지 경로 변경된 점 있어서 머지 후 수정 필요
const gradeImg = [
  "/assets/common/1.webp",
  "/assets/common/2.webp",
  "/assets/common/3.webp",
];
const statusImg = [
  "/assets/status/health.webp",
  "/assets/status/speed.webp",
  "/assets/status/deffense.webp",
];
const resistanceImg = [
  "/assets/attackType/infoAttackType/slash_small.webp",
  "/assets/attackType/infoAttackType/pierce_small.webp",
  "/assets/attackType/infoAttackType/blunt_small.webp",
];

const IdentityInfoBox = ({
  character,
  name,
  afterProfileImage,
  affiliation,
  grade,
  season,
  releaseDate,
  obtainingMethod,
  resistance,
  status,
}: IdentityInfoBoxProps) => {
  const statusArray = [status.life, status.speed, status.defend];

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
        {/* 체력 속도 방어력 */}
        <p className="p-1 text-xs md:text-xs flex">
          {statusArray.map((item, index) => (
            <span key={index} className="flex mr-2 items-center">
              <Image
                src={statusImg[index]}
                alt="beforeImage"
                className="w-[14px] h-[14px] mr-[0.1rem]"
                width={1024}
                height={1024}
              />
              {item}
            </span>
          ))}
        </p>
        {/* 내성 */}
        <p className="p-1 text-xs md:text-xs flex">
          {resistance.map((type, index) => (
            <span
              key={index}
              className={`flex mr-2 items-center ${
                type === "내성"
                  ? "text-gray-400"
                  : type === "취약"
                  ? "text-red-500"
                  : ""
              }`}
            >
              <Image
                src={resistanceImg[index]}
                alt="beforeImage"
                className="w-[14px] h-[14px] mr-[0.1rem]"
                width={1024}
                height={1024}
              />
              {type}{" "}
            </span>
          ))}
        </p>
        {/* 시즌 */}
        <p className="p-1 text-xs md:text-xs">
          <span className="text-primary-100">시즌</span>: {season}
        </p>
        {/* 소속 */}
        <p className="p-1 text-xs md:text-xs">
          <span className="text-primary-100">소속</span>: {affiliation}
        </p>
        {/* 출시시기 */}
        <p className="p-1 text-xs md:text-xs">
          <span className="text-primary-100">출시시기</span>: {releaseDate}
        </p>
        {/* 획득방법 */}
        <p className="p-1 text-xs md:text-xs text-center">{obtainingMethod}</p>
      </div>
    );
  };

  return (
    <div className="bg-primary-500 text-white w-64 rounded-md">
      <div className="w-64 h-auto py-4 gap-2 flex flex-col items-center relative">
        {/* tailwind에 퍼센티지는 없어서 일단 유지 */}
        <Image
          src={afterProfileImage}
          alt="profile"
          className="w-2/5 h-auto"
          width={1024}
          height={1024}
        />
        <Image
          src={gradeImg[grade - 1]}
          alt="grade"
          className="w-auto h-[35px]"
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
            className="text-white flex items-center bg-transparent border-none shadow-none focus:outline-none"
            placeholder={"button"}
          >
            상세정보
            {open ? <FaArrowUp /> : <FaArrowDown />}
          </Button>
        </div>
      </div>

      {/* Collapse content */}
      {!isLargeScreen ? (
        <Collapse open={open}>{renderCollapseContent()}</Collapse>
      ) : (
        renderCollapseContent()
      )}
    </div>
  );
};

export default IdentityInfoBox;
