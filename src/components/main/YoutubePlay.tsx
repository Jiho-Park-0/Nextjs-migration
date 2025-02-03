"use client";

import { useState, useEffect } from "react";
import { getYoutube } from "@/api/mainApi";
import YouTube from "react-youtube";
import { ApiError } from "@/interfaces/apiError";

interface News {
  videoId: string;
}
const YoutubePlay = () => {
  const [data, setData] = useState<News[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getYoutube();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (data === undefined || data.length === 0) {
          setData([{ videoId: "HTRQgFYCXHY" }]);
        } else {
          setData(data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="w-full mx-auto">
        <div className="aspect-video bg-gray-800 animate-pulse"></div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="w-full mx-auto">
        <div className="aspect-video ">
          <YouTube
            videoId={"HTRQgFYCXHY"}
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
  }

  return (
    <div className="w-full mx-auto">
      <div className="aspect-video">
        <YouTube
          videoId={data[0]?.videoId || "HTRQgFYCXHY"}
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
