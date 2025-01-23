import { IdentityOptions } from "@/interfaces/identity";
import { EgoOptions } from "@/interfaces/ego";

function getLength(value: string | number | string[]): number {
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length;
  } else {
    return 0; // number 타입일 경우 length가 없으므로 0을 반환
  }
}

export const getIdentity = async (options: IdentityOptions) => {
  const query = Object.entries(options)
    .filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        getLength(value) &&
        _
    )
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "etcKeyword") {
          const encodedValues = value
            .map((val) => encodeURIComponent(val))
            .join(",");
          return `keyword=${encodedValues}`;
        } else {
          const encodedValues = value
            .map((val) => encodeURIComponent(val))
            .join(",");
          return `${key}=${encodedValues}`;
        }
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");

  const uri = query
    ? `${process.env.NEXT_PUBLIC_API_URL}/dictionary/identity?${query}`
    : `${process.env.NEXT_PUBLIC_API_URL}/dictionary/identity`;

  const response = await fetch(uri, { cache: "no-cache" });
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
        getLength(value) !== 0 &&
        _
    )
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "etcKeyword") {
          const encodedValues = value
            .map((val) => encodeURIComponent(val))
            .join(",");
          return `keyword=${encodedValues}`;
        } else {
          const encodedValues = value
            .map((val) => encodeURIComponent(val))
            .join(",");
          return `${key}=${encodedValues}`;
        }
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");

  // 배열이 아닌 경우: 속도랑 가중치 현재 API 에러로 제외하고 호출
  const uri = query
    ? `${process.env.NEXT_PUBLIC_API_URL}/dictionary/ego?${query}`
    : `${process.env.NEXT_PUBLIC_API_URL}/dictionary/ego`;

  const response = await fetch(uri, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getAllIdentity = async () => {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/identity?minSpeed=1&maxSpeed=9&minWeight=1&maxWeight=9`;

  const response = await fetch(uri, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
