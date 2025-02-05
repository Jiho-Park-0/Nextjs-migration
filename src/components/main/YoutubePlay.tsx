"use client";

import { Suspense, useState, useEffect } from "react";
import { getYoutube } from "@/api/mainApi";
import YouTube from "react-youtube";
import { ErrorBoundary } from "react-error-boundary";

type YoutubeVideo = {
  videoId: string;
  // 추가 필드가 있을 경우 여기에 확장
};

const YoutubePlayerContent = () => {
  const [videoData, setVideoData] = useState<YoutubeVideo>({
    videoId: "HTRQgFYCXHY",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getYoutube();

        // 응답 데이터 구조 검증 강화
        const isValidSingle = (data: unknown): data is YoutubeVideo =>
          !!data && typeof data === "object" && "videoId" in data;

        const isValidArray = (data: unknown): data is YoutubeVideo[] =>
          Array.isArray(data) && data.length > 0 && isValidSingle(data[0]);

        if (isValidSingle(response)) {
          setVideoData(response);
        } else if (isValidArray(response)) {
          setVideoData(response[0]);
        } else {
          console.warn("Unexpected API response structure:", response);
          throw new Error("Invalid API response format");
        }
      } catch (error) {
        console.error("YouTube data fetch failed:", error);
        // 오류 발생 시 기본 영상 ID 유지
      }
    };

    fetchData();
  }, []);

  return (
    <YouTube
      videoId={videoData.videoId}
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
  );
};

// Error Boundary로 감싼 최종 컴포넌트
const YoutubePlay = () => (
  <ErrorBoundary fallback={<div>영상을 불러올 수 없습니다.</div>}>
    <Suspense fallback={<div>로딩 중...</div>}>
      <YoutubePlayerContent />
    </Suspense>
  </ErrorBoundary>
);

export default YoutubePlay;
