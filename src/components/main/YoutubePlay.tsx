"use client";

import { useState, useEffect } from "react";
import { getYoutube } from "@/api/mainApi"; // YouTube API 호출 함수
import YouTube from "react-youtube";
// import { useQuery } from "@tanstack/react-query";
// import { Main_Keys } from "@/constants/queryKeys";
import { ApiError } from "@/interfaces/apiError";

interface News {
  videoId: string;
}

const YoutubePlay = () => {
  // const { data } = useQuery({
  //   queryKey: Main_Keys.youtube,
  //   queryFn: getYoutube,
  //   staleTime: 1000 * 60 * 30,
  //   refetchOnWindowFocus: false,
  //   placeholderData: {
  //     videoId: "HTRQgFYCXHY", // 기본값 설정
  //   },
  // });

  const [data, setData] = useState<News[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getYoutube();

        if (data === undefined) {
          setData([{ videoId: "HTRQgFYCXHY" }]);
          return;
        }

        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="aspect-video">
        <YouTube
          videoId={
            // data[0]?.videoId || "HTRQgFYCXHY"
            error ? "HTRQgFYCXHY" : data[0]?.videoId
          } // data가 없는 경우 프로젝트문 대표 영상 출력 "HTRQgFYCXHY"
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
        {/* <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId || "HTRQgFYCXHY"}`} // 동적으로 videoId 추가
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
      </div>
    </div>
  );
};

export default YoutubePlay;
