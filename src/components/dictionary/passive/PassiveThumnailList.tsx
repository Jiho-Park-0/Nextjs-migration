"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Input, Tooltip, Spinner } from "@material-tailwind/react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { getPassivePaginated } from "@/api/dictionaryPaginated.api";
import useStore from "@/zustand/store";
import ErrorMessage from "@/ui/ErrorMessage";
import Filter from "./PassiveFilter";
import { PassiveData } from "@/interfaces/passive";
import { ApiError } from "@/interfaces/apiError";
import PassiveThumbnailCard from "./PassiveThumnailCard";

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
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const observerElem = useRef<HTMLDivElement | null>(null);

  // zustand에서 패시브 필터 옵션 가져오기
  const options = useStore((state) => state.passiveOptionsState);

  // 무한 스크롤 옵저버 콜백

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isLoading &&
        !isLastPage &&
        error === null
      ) {
        setPage((prev) => prev + 1);
      }
    },
    [isLoading, isLastPage, error]
  );

  useEffect(() => {
    setPage(0);
    setData([]);
  }, [options]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.2,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    const currentElem = observerElem.current;
    if (currentElem) observer.observe(currentElem);
    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [handleObserver]);

  // API 호출
  const lastFetchKeyRef = useRef<string>(""); // 중복 호출 방지용 키
  useEffect(() => {
    const fetchKey = JSON.stringify(options) + "|" + page;
    if (lastFetchKeyRef.current === fetchKey) {
      return; // 동일한 (options, page)이면 fetch 중복 금지
    }
    lastFetchKeyRef.current = fetchKey;
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        // size=15, page는 0부터 시작
        const result = await getPassivePaginated({
          ...options,
          size: 8,
          page,
        });
        const list: PassiveData[] = Array.isArray(result)
          ? result
          : result.list ?? [];

        if (result.last === false) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }

        if (page === 0) {
          setData(list);
        } else {
          setData((prev) => [...prev, ...list]);
        }
        setError(null);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : "An error occurred",
          status: 500,
        });
        if (page === 0) {
          setData([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [options, page]);
  // 검색 & 페이징 처리
  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    const term = searchTerm.trim().toLowerCase();
    const filtered = data.filter((item) => {
      if (!term) return true;
      const matchSinner = item.sinnerName.toLowerCase().includes(term);
      const matchIdentity = item.identityName.toLowerCase().includes(term);
      const matchKeyword = item.keyword.some((k) =>
        k.toLowerCase().includes(term)
      );
      return matchSinner || matchIdentity || matchKeyword;
    });

    const paginated = filtered.slice(0, (page + 1) * 15);
    setFilteredData(paginated);
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
      {isLoading && data.length === 0 ? (
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
        <div className="grid grid-cols-1 gap-4 my-8">
          {filteredData.length > 0 ? (
            filteredData.map((item: PassiveData, index: number) => (
              <PassiveThumbnailCard
                key={index}
                sinnerName={item.sinnerName}
                identityName={item.identityName}
                season={item.season}
                grade={item.grade}
                keyword={item.keyword}
                afterProfileImage={item.afterProfileImage}
                isSync={isSync}
                identitySkillLevelInfos={item.identitySkillLevelInfos}
              />
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
