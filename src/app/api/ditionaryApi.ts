import { IdentityOptions } from "@/interfaces/identity";
import { EgoOptions } from "@/interfaces/ego";

export const getIdentity = async (options: IdentityOptions) => {
  // 옵션들을 쿼리 문자열로 변환

  const query = Object.entries(options)
    .filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value.length !== 0
    )
    .map(([key, value]) => {
      // 배열인 경우
      if (Array.isArray(value)) {
        // etcKeyword 처리
        if (key === "etcKeyword") {
          const encodedValues = value
            .map((val) => encodeURIComponent(val))
            .join(",");
          return `keyword=${encodedValues}`;
        } else {
          // 다른 배열 처리
          const encodedValues = value
            .map((val) => encodeURIComponent(val))
            .join(",");
          return `${key}=${encodedValues}`;
        }
      }

      // 배열이 아닌 경우: 속도랑 가중치 현재 API 에러로 제외하고 호출
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");
  console.log(query);
  const uri = query
    ? `${process.env.NEXT_PUBLIC_API_URL}/dictionary/identity?${query}`
    : "";

  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getEgo = async (options: EgoOptions) => {
  // 옵션들을 쿼리 문자열로 변환
  const query = Object.entries(options)
    .filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value.length !== 0
    )
    .map(([key, value]) => {
      // 배열인 경우
      if (Array.isArray(value)) {
        // etcKeyword 처리
        if (key === "etcKeyword") {
          const encodedValues = value
            .map((val) => encodeURIComponent(val))
            .join(",");
          return `keyword=${encodedValues}`;
        } else {
          // 다른 배열 처리
          const encodedValues = value
            .map((val) => encodeURIComponent(val))
            .join(",");
          return `${key}=${encodedValues}`;
        }
      }

      // 배열이 아닌 경우: 속도랑 가중치 현재 API 에러로 제외하고 호출
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");

  const uri = query
    ? `${process.env.NEXT_PUBLIC_API_URL}/dictionary/ego?${query}`
    : "";

  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getAllIdentity = async () => {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/identity?minSpeed=1&maxSpeed=9&minWeight=1&maxWeight=9`;

  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
