"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Input, Tooltip, Spinner } from "@material-tailwind/react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { getIdentityPaginated } from "@/api/dictionaryPaginated.api";
import useStore from "@/zustand/store"; // zustand 스토어 import
import IdentityThumbnailCard from "./IdentityThumbnailCard";
import ErrorMessage from "@/ui/ErrorMessage";
import nicknamesData from "@/constants/nicknames.json";
import Filter from "./IdentityFilter";
import { IdentityData } from "@/interfaces/identity";
import { ApiError } from "@/interfaces/apiError";

interface FilterModalProps {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  openFilter,
  setOpenFilter,
}) => {
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

const TopTitleAndThumnailList = () => {
  const [data, setData] = useState<IdentityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [isSync, setIsSync] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const options = useStore((state) => state.optionsState); // options 상태 가져오기

  const [nicknames, setNicknames] = useState<{ [key: string]: string[] }>({});
  const [filteredData, setFilteredData] = useState<IdentityData[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const observerElem = useRef<HTMLDivElement | null>(null);

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
    [isLoading, isLastPage, error] // ← now depends on isLoading
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

  useEffect(() => {
    const nicknamesMap: { [key: string]: string[] } = {};
    nicknamesData.forEach((item: { id: string; nicknames: string[] }) => {
      nicknamesMap[item.id] = item.nicknames;
    });
    setNicknames(nicknamesMap);
  }, []);

  const lastFetchKeyRef = useRef<string>("");

  useEffect(() => {
    const fetchKey = JSON.stringify(options) + "|" + page;
    if (lastFetchKeyRef.current === fetchKey) {
      return; // 이미 동일한 options+page로 fetch한 적이 있으면 중복 호출 금지
    }
    lastFetchKeyRef.current = fetchKey;
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        // size=15, page는 0부터 시작
        const result = await getIdentityPaginated({
          ...options,
          size: 15,
          page,
        });

        const list: IdentityData[] = Array.isArray(result)
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

  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    const filtered = data.filter((item: IdentityData) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const nicknameMatch =
        nicknames[item.id]?.some((nickname) =>
          nickname.toLowerCase().includes(searchTerm.toLowerCase())
        ) || false;

      return nameMatch || nicknameMatch;
    });

    const paginated = filtered.slice(0, (page + 1) * 15);
    setFilteredData(paginated);
  }, [data, searchTerm, nicknames, page]);

  return (
    <>
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
      <FilterModal openFilter={openFilter} setOpenFilter={setOpenFilter} />
      {isLoading && data.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="w-8 h-8 text-primary-200" />
        </div>
      ) : error ? (
        error.status === 404 ? (
          <div className="text-primary-200 text-center w-full my-8 h-screen">
            해당하는 인격이 없습니다.
          </div>
        ) : (
          <div className="text-primary-200 text-center w-full my-8">
            <ErrorMessage />
          </div>
        )
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 my-8">
            {filteredData.length > 0 ? (
              filteredData.map((item: IdentityData, index: number) => (
                <IdentityThumbnailCard
                  key={index}
                  id={item.id}
                  grade={item.grade}
                  name={item.name}
                  character={item.character}
                  imageBefore={item.beforeImage}
                  imageAfter={item.afterImage}
                  isSync={isSync}
                />
              ))
            ) : (
              <div className="text-primary-200 text-center w-full">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </>
      )}

      {/* ─── 반드시 항상 렌더되어야 하는 교차점 감지용 요소 ─── */}
      <div ref={observerElem} className="h-10" />
    </>
  );
};

export default TopTitleAndThumnailList;
