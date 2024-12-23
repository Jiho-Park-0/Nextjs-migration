"use client";

import React, { useState, useEffect } from "react";
import { fetchYoutube } from "@/app/api/mainApi"; // YouTube API 호출 함수
import YouTube from "react-youtube";

const YoutubePlay = () => {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchYoutube(); // fetchYoutube는 { videoId: string } 형식의 데이터를 반환한다고 가정
        if (data?.videoId) {
          setVideoId(data.videoId); // API에서 받은 동영상 ID를 설정
        } else {
          throw new Error("Invalid video ID");
        }
      } catch (err) {
        console.error("Error fetching YouTube data:", err);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="aspect-video">
        <YouTube
          videoId={videoId || "HTRQgFYCXHY"} // data가 없는 경우 프로젝트문 대표 영상 출력 "HTRQgFYCXHY"
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
