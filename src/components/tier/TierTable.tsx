"use client";

import { TierData } from "@/interfaces/identity";
import { getIdentity } from "@/api/dictionaryApi";
import { queryClient } from "@/api/queryClient";
import { IdentityOptions } from "@/interfaces/identity";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TierLine from "./TierLine";
import { Button, Tooltip, Spinner } from "@material-tailwind/react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const TierTable = () => {
  const [sortedDataS, setSortedDataS] = useState<TierData[]>([]);
  const [sortedDataA, setSortedDataA] = useState<TierData[]>([]);
  const [sortedDataB, setSortedDataB] = useState<TierData[]>([]);
  const [sortedDataC, setSortedDataC] = useState<TierData[]>([]);
  const [sortedDataD, setSortedDataD] = useState<TierData[]>([]);
  const [sortedDataE, setSortedDataE] = useState<TierData[]>([]);
  const [sortedDataF, setSortedDataF] = useState<TierData[]>([]);
  const [sortedDataG, setSortedDataG] = useState<TierData[]>([]);
  const [sortedDataH, setSortedDataH] = useState<TierData[]>([]);
  const [isSync, setIsSync] = useState(false);

  // 필터링 옵션
  const options: IdentityOptions = {
    sinner: [],
    season: [],
    grade: ["3"],
    affiliation: [],
    keyword: [],
    etcKeyword: [],
    resources: [],
    types: [],
    minSpeed: 1,
    maxSpeed: 9,
    minWeight: 1,
    maxWeight: 9,
  };

  // 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["identity", options],
    queryFn: () => getIdentity(options),
    retry: 1,
    placeholderData: () => {
      const cachedData = queryClient.getQueryData(["identity", options]);
      return cachedData || [];
    },
    staleTime: 1000 * 60 * 60 * 24, // 하루
    refetchOnWindowFocus: false, // 포커스 할 때마다 다시 불러오는 기능 끔
  });

  // 분류 기준
  // 여기서 id만 설정하면 티어 바꿀 수 있음

  // 발푸밤 이벤트 추가 (2025.01.09~2025.01.23)
  // S+: 119
  // S:  120, 13, 132, 131,103
  // A:  83

  // S+: 100 약상, 130 실돈키, 119, 적슈 128 돌로쟈,  118 마히스, 134 홍파우
  const S = [100, 130, 119, 128, 118, 134];

  // S:  120 죽나상, 13 후파우, 122 츠이스, 102 선장마엘, 72 쥐싱, 61 디로쟈,98 넬슈, 85 디루, 132 탕히스,  27 퀴히스, 131 탕히스 75 섕싱, 121 제로쟈, 123 섕르소, 제싱클,  127 혈그렉, 94 치티스, 103 런싱
  const A = [
    120, 13, 122, 102, 72, 61, 98, 85, 132, 27, 131, 75, 121, 123, 129, 127, 94,
    103,
  ];

  // A: 125 혈티스, 3 떱돈, 66 떱슈, 23 r히스, 114 디뫼, 96 퐁그렉, 20 갈그렉, 32 k루, 30 콩루, 83 마티스
  const B = [125, 3, 66, 23, 114, 96, 20, 32, 30, 83];

  // B: 81 떱상, 115 떱티스, 6 중돈, 10 쥐파, 79 동상
  const C = [81, 115, 6, 10, 79];

  // C: 91 리쟈, 40 리우마엘, 12 세파우
  const D = [91, 40, 12];

  // D: 78 검상, 93 외히스, 38 r스마엘, 112 티돈
  const E = [78, 93, 38, 112];

  // E: 19 츠그렉, 5 섕돈, 52 셉티스, 59 장로쟈, 47 코뫼, 64흑슈
  const F = [19, 5, 52, 59, 47, 64];

  // F: 44 떱뫼, 57 흑로쟈
  const G = [44, 57];

  // X: 71 검싱, 16 쥐그렉, 45 N르소, 25 여히스
  const H = [71, 16, 45, 25];

  // 분류 함수
  const sortData = (data: TierData[], criteria: number[]) => {
    return criteria
      .map((id) => data.find((item) => item.id === id))
      .filter((item) => item !== undefined) as TierData[];
  };

  useEffect(() => {
    // 데이터를 분류하고 상태 업데이트
    setSortedDataS(sortData(data, S));
    setSortedDataA(sortData(data, A));
    setSortedDataB(sortData(data, B));
    setSortedDataC(sortData(data, C));
    setSortedDataD(sortData(data, D));
    setSortedDataE(sortData(data, E));
    setSortedDataF(sortData(data, F));
    setSortedDataG(sortData(data, G));
    setSortedDataH(sortData(data, H));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <div className="flex gap-2 justify-end my-3">
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
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="w-8 h-8 text-primary-200" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <TierLine
            title="S+"
            color="bg-res-red"
            data={sortedDataS}
            isSync={isSync}
          />
          <TierLine
            title="S"
            color="bg-res-orange"
            data={sortedDataA}
            isSync={isSync}
          />
          <TierLine
            title="A"
            color="bg-res-yellow"
            data={sortedDataB}
            isSync={isSync}
          />
          <TierLine
            title="B"
            color="bg-res-green"
            data={sortedDataC}
            isSync={isSync}
          />
          <TierLine
            title="C"
            color="bg-res-blue"
            data={sortedDataD}
            isSync={isSync}
          />
          <TierLine
            title="D"
            color="bg-res-navy"
            data={sortedDataE}
            isSync={isSync}
          />
          <TierLine
            title="E"
            color="bg-res-purple"
            data={sortedDataF}
            isSync={isSync}
          />
          <TierLine
            title="F"
            color="bg-gray-700"
            data={sortedDataG}
            isSync={isSync}
          />
          <TierLine
            title="X"
            color="bg-gray-900"
            data={sortedDataH}
            isSync={isSync}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-end gap-2 text-xs text-white font-sansLight my-2">
        <div className="flex items-center gap-1">
          <div className="bg-green-900 w-3 h-3"></div>
          <span>발푸르기스의 밤 한정</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-yellow-700 w-3 h-3"></div>
          <span>이번 시즌 자판기 획득 불가(추출 가능)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-red-900 w-3 h-3"></div>
          <span>이번 시즌 획득 불가</span>
        </div>
      </div>
    </div>
  );
};

export default TierTable;
