"use client";

import { useState, useEffect } from "react";
import { getYoutube } from "@/api/mainApi"; // YouTube API 호출 함수
import YouTube from "react-youtube";
import { ApiError } from "@/interfaces/apiError";

interface News {
  videoId: string;
}

const YoutubePlay = () => {
  const [data, setData] = useState<News[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getYoutube();

        if (data === undefined || data.length === 0) {
          setData([{ videoId: "HTRQgFYCXHY" }]); // 기본값 설정
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

  console.log(data);

  return (
    <div className="w-full mx-auto">
      <div className="aspect-video">
        <YouTube
          videoId={
            error || data.length === 0 ? "HTRQgFYCXHY" : data[0]?.videoId
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
      </div>
    </div>
  );
};

export default YoutubePlay;
