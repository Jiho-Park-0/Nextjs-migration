"use client";

import { TierData } from "@/interfaces/identity";
import { getIdentity } from "@/api/dictionaryApi";
import { IdentityOptions } from "@/interfaces/identity";

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
  const [data, setData] = useState<TierData[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터 가져오기

  useEffect(() => {
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

    const fetchIdentity = async () => {
      try {
        const data = await getIdentity(options);
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdentity();
  }, []);

  // 분류 기준
  // 여기서 id만 설정하면 티어 바꿀 수 있음

  // 발푸밤 이벤트 추가 (2025.01.09~2025.01.23)
  // S+: 119
  // S:  120, 13, 132, 131,103
  // A:  83

  // S+: 100 약상, 147 흑파우, 139 동섕돈, 119 적슈, 98 넬슈, 123 섕르소, 132 탕루, 131 탕히스, 118 마히스, 122 츠이스, 128 돌로쟈, 75 섕싱
  const S = [100, 147, 139, 119, 98, 123, 132, 131, 118, 122, 128, 75];

  // S:  148 시춘마엘, 120 죽나상, 13 후파우, 137 리상, 130 실돈키, 85 디루, 146 흑쟈, 121 제로쟈, 61 디로쟈,
  //       72 쥐싱, 129 제싱클, 103 런싱, 138 불그렉, 145 흑그렉

  const A = [148, 120, 13, 137, 130, 85, 146, 121, 61, 72, 129, 103, 138, 145];

  // A:    3 떱돈, 141 묘슈, 66 떱슈,30 콩루, 27 퀴히스, 135 흑히스, 102 선장마엘, 136 흑이스, 91 리쟈, 125 혈티스, 83 마티스, 94 치티스, 142 중싱
  const B = [3, 141, 66, 30, 27, 135, 102, 136, 91, 125, 83, 94, 142];

  // B: 81 떱상,10 쥐파, 12 세파우,134 홍파우, 114 디뫼, 32 k루, 143 R루, 23 r히스, 115 떱티스, 127 혈그렉, 96 퐁그렉, 20 갈그렉
  const C = [81, 10, 12, 114, 134, 32, 143, 23, 115, 127, 96, 20];

  // C: 79 동상, 112 티돈, 40 리우마엘, 93 외히스
  const D = [79, 112, 40, 93];

  // D: 78 검상, 38 r스마엘, 52 셉티스
  const E = [78, 38, 52];

  // E:  5 섕돈,47 코뫼, 59 장로쟈, 19 츠그렉
  const F = [5, 47, 59, 19];

  // F: 44 떱뫼, 57 흑로쟈, 64흑슈
  const G = [44, 57, 64];

  // X: 45 N르소, 25 여히스, 71 검싱, 16 쥐그렉
  const H = [45, 25, 71, 16];

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

      {loading ? (
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
