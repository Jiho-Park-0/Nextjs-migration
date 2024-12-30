"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Tooltip } from "@material-tailwind/react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import axios from "axios";
import { getIdentity } from "@/app/api/ditionaryApi";
import useStore from "@/zustand/store"; // zustand 스토어 import
import IdentityThumbnailCard from "./IdentityThumbnailCard";
import { Spinner } from "@material-tailwind/react";
import ErrorMessage from "@/app/ui/ErrorMessage";
import nicknamesData from "@/app/constants/nicknames.json";
import Filter from "./Filter";

interface FilterModalProps {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  openFilter,
  setOpenFilter,
}) => {
  // 모달 배경 클릭 시 닫기
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setOpenFilter(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
          openFilter ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackgroundClick}
      >
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
    </>
  );
};

const TopTitleAndThumnailList = () => {
  const [isSync, setIsSync] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const options = useStore((state) => state.optionsState); // options 상태 가져오기

  const [nicknames, setNicknames] = useState<{ [key: string]: string[] }>({});
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dataRef = useRef(null);

  const { isLoading, isError, error } = useStore(
    (state) => state.identityState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIdentity(options); // options를 getIdentity에 넘기기
        setData(response);
        dataRef.current = response; // 데이터를 캐시에 저장
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [options]); // options가 변경될 때마다 호출

  // 별명 데이터를 상태로 저장
  useEffect(() => {
    // JSON 파일의 데이터를 상태로 설정
    const nicknamesMap: { [key: string]: string[] } = {};
    nicknamesData.forEach((item: { id: string; nicknames: string[] }) => {
      nicknamesMap[item.id] = item.nicknames;
    });
    setNicknames(nicknamesMap);
  }, []);

  // 이름 및 별명 검색 필터링
  useEffect(() => {
    if (searchTerm) {
      const filteredIds = Object.keys(nicknames).filter((id) =>
        nicknames[id].some((nickname) =>
          nickname.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      const filteredResults = data.filter((item: { id: string }) =>
        filteredIds.includes(item.id.toString())
      );
      setFilteredData(filteredResults.reverse());
    } else {
      setFilteredData(data.reverse());
    }
  }, [searchTerm, nicknames, data]);

  return (
    <>
      {/* 상단 제목, 버튼 */}
      <div className="flex justify-between items-center">
        <span className="text-3xl lg:text-4xl whitespace-nowrap hidden lg:block pr-2">
          인격
        </span>
        <div className="my-2 grid grid-cols-1 sm:flex sm:justify-between w-full lg:w-fit gap-2 h-fit md:h-10">
          <Button
            className="h-8 lg:hidden bg-primary-400 lg:h-8 py-0.5 px-4 text-lg lg:text-sm text-primary-100 hover:bg-primary-300 rounded"
            onClick={() => setOpenFilter(true)}
            placeholder={undefined}
          >
            <span className="whitespace-nowrap">필터</span>
          </Button>
          <div className="flex gap-2">
            <Tooltip
              className="bg-primary-500 text-primary-100 text-xs"
              content={
                <span>체크 시 3 동기화 후 이미지를 확인할 수 있습니다.</span>
              }
            >
              <Button
                className="min-w-[80px] flex gap-2 items-center bg-primary-400 px-2 md:px-4 py-0 md:py-1 font-sansLight text-sm md:text-base text-white hover:bg-primary-300 rounded"
                placeholder={undefined}
                onClick={() => setIsSync((prev) => !prev)}
              >
                <span className="pt-1 whitespace-nowrap">동기화</span>
                {isSync ? (
                  <FaCheckCircle className="text-primary-200" />
                ) : (
                  <FaRegCircle className="text-primary-200" />
                )}
              </Button>
            </Tooltip>
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                placeholder="이름으로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                containerProps={{
                  className:
                    "min-w-[100px] md:min-w-[200px] !bg-primary-400 !rounded-full !pt-1 !h-8 md:!h-10",
                }}
                className="!border-none pl-9 placeholder:text-primary-100 text-white focus:!border-primary-300 !focus:ring-0 !focus:outline-none !focus:ring-0 !focus:ring-offset-0 !focus:ring-offset-transparent !focus:border-transparent !focus:ring-transparent"
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
      </div>
      <FilterModal openFilter={openFilter} setOpenFilter={setOpenFilter} />
      {/* 썸네일 리스트 */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="w-8 h-8 text-primary-200" />
        </div>
      ) : isError ? (
        axios.isAxiosError(error) && error.response?.status === 404 ? (
          <div className="text-primary-200 text-center w-full my-8 h-screen">
            해당하는 인격이 없습니다.
          </div>
        ) : (
          <div className="text-primary-200 text-center w-full my-8">
            <ErrorMessage />
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 my-8">
          {filteredData.length > 0 ? (
            filteredData.map(
              (
                item: {
                  id: number;
                  name: string;
                  grade: number;
                  character: string;
                  beforeImage: string | null;
                  afterImage: string | null;
                },
                index: number
              ) => (
                <IdentityThumbnailCard
                  key={index}
                  id={item.id}
                  grade={item.grade}
                  name={item.name}
                  character={item.character}
                  imageBefore={
                    item.beforeImage ? item.beforeImage.trimEnd() : ""
                  }
                  imageAfter={item.afterImage ? item.afterImage.trimEnd() : ""}
                  isSync={isSync}
                />
              )
            )
          ) : (
            <div className="text-primary-200 text-center w-full">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TopTitleAndThumnailList;
