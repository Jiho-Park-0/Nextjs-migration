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

const KeywordTierTable = () => {
  const [sortedDataS, setSortedDataS] = useState<TierData[]>([]);
  const [sortedDataA, setSortedDataA] = useState<TierData[]>([]);
  const [sortedDataB, setSortedDataB] = useState<TierData[]>([]);
  const [sortedDataC, setSortedDataC] = useState<TierData[]>([]);
  const [sortedDataD, setSortedDataD] = useState<TierData[]>([]);
  const [sortedDataE, setSortedDataE] = useState<TierData[]>([]);
  const [sortedDataF, setSortedDataF] = useState<TierData[]>([]);
  const [isSync, setIsSync] = useState(false);

  // 필터링 옵션
  const options: IdentityOptions = {
    sinner: [],
    season: [],
    grade: [],
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

  // 출혈: 130 실돈키, 100 약상, 119 적슈, 128 돌로쟈, 102 선장마엘, 27 퀴히스, 127 혈그렉, 125 혈티스, 10 쥐파, 20 갈그렉, 6 중돈, 65 료슈, 72 쥐싱,
  //      64 흑슈, 34 갈루, 101 약티스, 30 콩루, 57 흑로쟈, 29 흑루, 82 피상, 90 흑그렉, 48 중뫼
  const S = [
    130, 100, 119, 128, 102, 27, 127, 125, 10, 20, 6, 65, 72, 64, 34, 101, 30,
    57, 29, 82, 90, 48,
  ];

  // 화상: 103 런싱, 40 리우마엘, 91 리쟈, 83 마티스, 92 리슈
  const A = [103, 40, 91, 83, 92];

  // 진동: 13 후파우, 53 어티스, 110 탐루, 122 츠이스, 93 외히스, 113 티로쟈, 112 티돈, 124 츠싱클, 111 유슈, 37 대리마엘
  const B = [13, 53, 110, 122, 93, 113, 112, 124, 111, 37];

  // 파열: 121 제로쟈, 12 세파우, 123 섕르소, 129 제싱클, 32 k루, 126 송루, 44 떱르소, 84 초돈, 26 셉히스, 52 셉티스, 95 데뫼, 18 장그렉
  const C = [121, 12, 123, 129, 32, 126, 44, 84, 26, 52, 95, 18];

  // 침잠: 120 죽나상, 118 와히스, 61 디로쟈, 114 디뫼, 85 디루, 94 치티스, 41 해녀마엘, 79 동상, 96 퐁그렉, 97 버파우
  const D = [120, 118, 61, 114, 85, 94, 41, 79, 96, 97];

  // 호흡: 132 탕후루, 132 탕히스, 88 검르소, 98 넬슈, 75 섕싱, 78 검상, 89 검파우, 87 검돈, 54 섕티스
  const E = [132, 131, 88, 98, 75, 78, 89, 87, 54];

  // 충전: 115 떱티스, 116 멀파우, 117 멀히스, 81 떱상, 66 떱슈, 3 떱돈, 38 순록마엘, 23 r히스, 47 코뫼
  const F = [115, 116, 117, 81, 66, 3, 38, 23, 47];

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
            title="화상"
            color="bg-res-red"
            data={sortedDataA}
            isSync={isSync}
          />
          <TierLine
            title="출혈"
            color="bg-res-orange"
            data={sortedDataS}
            isSync={isSync}
          />
          <TierLine
            title="진동"
            color="bg-res-yellow"
            data={sortedDataB}
            isSync={isSync}
          />
          <TierLine
            title="파열"
            color="bg-res-green"
            data={sortedDataC}
            isSync={isSync}
          />
          <TierLine
            title="침잠"
            color="bg-res-blue"
            data={sortedDataD}
            isSync={isSync}
          />
          <TierLine
            title="호흡"
            color="bg-res-navy"
            data={sortedDataE}
            isSync={isSync}
          />
          <TierLine
            title="충전"
            color="bg-res-purple"
            data={sortedDataF}
            isSync={isSync}
          />
        </div>
      )}
      <div className="flex justify-end gap-2 text-xs text-white font-sansLight my-2">
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

export default KeywordTierTable;
