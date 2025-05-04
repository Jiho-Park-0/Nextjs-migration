"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Input, Tooltip, Spinner } from "@material-tailwind/react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { getPassive } from "@/api/dictionaryApi";
import useStore from "@/zustand/store";
import ErrorMessage from "@/ui/ErrorMessage";
import Filter from "./PassiveFilter";
import { PassiveData } from "@/interfaces/passive";
import { ApiError } from "@/interfaces/apiError";

interface FilterModalProps {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  openFilter,
  setOpenFilter,
}) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpenFilter(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        openFilter ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-primary-500 rounded-lg w-11/12 max-w-sm h-5/6 max-h-screen overflow-y-auto transition-transform duration-300 ${
          openFilter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-end p-2">
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

const PassiveThumbnailList: React.FC = () => {
  const [data, setData] = useState<PassiveData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [isSync, setIsSync] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<PassiveData[]>([]);
  const [paginatedData, setPaginatedData] = useState<PassiveData[]>([]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const observerElem = useRef<HTMLDivElement | null>(null);

  // zustand에서 패시브 필터 옵션 가져오기
  const options = useStore((state) => state.passiveOptionsState);

  console.log(options);

  // 무한 스크롤 옵저버 콜백
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    const el = observerElem.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [handleObserver]);

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getPassive(options);
        setData(result);
        setError(null);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : "An error occurred",
          status: 500,
        });
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [options]);
  // 검색 & 페이징 처리
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = data
      .filter((item) => {
        if (!term) return true;
        const matchSinner = item.sinnerName.toLowerCase().includes(term);
        const matchIdentity = item.identityName.toLowerCase().includes(term);
        const matchKeyword = item.keyword.some((k) =>
          k.toLowerCase().includes(term)
        );
        return matchSinner || matchIdentity || matchKeyword;
      })
      .reverse();

    setFilteredData(filtered);
    setPaginatedData(filtered.slice(0, page * 15));
  }, [data, searchTerm, page]);

  return (
    <>
      {/* 헤더, 동기화, 검색 */}
      <div className="flex justify-between items-center">
        <span className="text-3xl lg:text-4xl whitespace-nowrap hidden lg:block pr-2">
          패시브
        </span>

        <div className="my-2 grid grid-cols-1 sm:flex sm:justify-between w-full lg:w-fit gap-2 h-fit md:h-10">
          <Button
            className="h-8 lg:hidden bg-primary-400 lg:h-8 py-0.5 px-4 text-lg lg:text-sm text-primary-100 hover:bg-primary-300 rounded"
            onClick={() => setOpenFilter(true)}
            placeholder={undefined}
          >
            <span className="whitespace-nowrap">필터</span>
          </Button>
          <span className="items-center flex gap-2"></span>

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

      {/* 필터 모달 */}
      <FilterModal openFilter={openFilter} setOpenFilter={setOpenFilter} />

      {/* 로딩 / 에러 / 그리드 */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="w-8 h-8 text-primary-200" />
        </div>
      ) : error ? (
        <div className="text-center my-8">
          {error.message.includes("404") ? (
            <p className="text-primary-200">해당하는 패시브이 없습니다.</p>
          ) : (
            <ErrorMessage />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, idx) => (
              <div
                key={idx}
                className="bg-primary-500 rounded-lg shadow overflow-hidden p-4"
              >
                <h3 className="text-lg font-semibold text-primary-100 truncate">
                  {item.sinnerName}
                </h3>
                <p className="text-sm text-primary-200 truncate">
                  {item.identityName}
                </p>
                <div className="flex justify-center gap-2 my-2">
                  <span className="text-xs px-2 py-1 bg-primary-400 rounded">
                    시즌 {item.season}
                  </span>
                  <span className="text-xs px-2 py-1 bg-primary-400 rounded">
                    등급 {item.grade}
                  </span>
                </div>
                {!isSync ? (
                  <p className="text-xs text-primary-200 line-clamp-3">
                    {item.keyword.join(", ")}
                  </p>
                ) : (
                  <div className="text-xs text-primary-200 space-y-2">
                    {item.identitySkillLevelInfos.map((lvl) => (
                      <div key={lvl.level}>
                        <p className="font-medium">레벨 {lvl.level}</p>
                        {lvl.identitySkillInfos.map((skill) => (
                          <p key={skill.rownum} className="truncate">
                            - {skill.skillName}: {skill.effect}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-primary-200 w-full">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}

      {/* 무한 스크롤 관찰용 div */}
      <div ref={observerElem} className="h-10" />
    </>
  );
};

export default PassiveThumbnailList;
