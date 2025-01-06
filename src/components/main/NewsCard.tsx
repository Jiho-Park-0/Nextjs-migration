"use client";

import React, { useState, useEffect } from "react";
import { fetchNews } from "@/api/mainApi";
import Skeleton from "./Skeleton";
import Error from "./ErrorCompoenet";

interface News {
  title: string;
  url: string;
  release: string;
  imageUrl: string;
}

const NewsCard = () => {
  const [news, setNews] = useState<News[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchNews();
        setNews(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="w-full h-fit bg-primary-300 text-primary-100 rounded-md p-4 md:p-6 lg:p-10 flex flex-col justify-between">
      <h2 className="font-sansBold text-base md:text-xl lg:text-2xl">
        최신 소식
      </h2>
      <div className="font-body mt-4 flex flex-col justify-between flex-grow">
        {news.map((newsItem, index) => (
          <div key={index}>
            <p className="text-xs text-primary-200">
              {newsItem.release.split("T")[0]}
            </p>
            <a
              href={newsItem.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm truncate block w-full hover:underline"
            >
              {newsItem.title}
            </a>
            {index < 2 && <hr className="border-t border-primary-200 my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
