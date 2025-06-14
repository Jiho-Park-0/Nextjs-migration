export const getSearch = async (sinner: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  // 1부터 매핑될 이름 목록
  const names = [
    "이상",
    "파우스트",
    "돈키호테",
    "료슈",
    "뫼르소",
    "홍루",
    "히스클리프",
    "이스마엘",
    "로쟈",
    "싱클레어",
    "오티스",
    "그레고르",
  ];

  const idx = names.indexOf(sinner);

  const uri = `${baseUrl}/dictionary/search/${idx + 1}`;

  const response = await fetch(uri, {
    cache: "no-cache",
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
