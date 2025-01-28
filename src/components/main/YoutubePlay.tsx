"use client";

import { useState, useEffect } from "react";
import { getYoutube } from "@/api/mainApi"; // YouTube API 호출 함수
import YouTube from "react-youtube";
import { ApiError } from "@/interfaces/apiError";
import { Spinner } from "@material-tailwind/react";

interface News {
  videoId: string;
}

const YoutubePlay = () => {
  const [data, setData] = useState<News[]>([]); // 초기 상태는 빈 배열
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true); // API 호출 시작 시 로딩 상태 true
        const result = await getYoutube();

        // result가 유효하지 않을 경우 기본값으로 설정
        if (!result || result.length === 0) {
          setData([{ videoId: "HTRQgFYCXHY" }]);
        } else {
          setData(result);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      } finally {
        setIsLoading(false); // API 호출이 끝나면 로딩 상태 false
      }
    };

    fetchNews();
  }, []);

  console.log(data);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner className="w-8 h-8 text-primary-200" />;
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="text-center">
        <p>Error: {error.message}</p>
        <YouTube
          videoId="HTRQgFYCXHY" // 에러 발생 시 기본 영상 재생
          className="aspect-video"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 0,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          }}
        />
      </div>
    );
  }

  // 데이터가 없는 경우 처리
  if (data.length === 0) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <div className="w-full mx-auto">
      <div className="aspect-video">
        <YouTube
          videoId={data[0]?.videoId || "HTRQgFYCXHY"} // API에서 받은 데이터 출력, 없으면 기본값
          className="aspect-video"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 0,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          }}
        />
      </div>
    </div>
  );
};

export default YoutubePlay;
