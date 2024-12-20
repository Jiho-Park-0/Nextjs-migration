"use client";

import React, { useState, useEffect, Suspense } from "react";
import { fetchNews } from "@/app/api/mainApi";

interface News {
  title: string;
  url: string;
  release: string;
  imageUrl: string;
}

const NewsCard = () => {
  const [news, setNews] = useState<News[]>([]);

  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchNews();
        setNews(result);
      } catch (error) {
        setError(error);
      }
    };

    getData();
  }, []);

  if (error) return <div>Error: {String(error)}</div>;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      }
    >
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
    </Suspense>
  );
};

export default NewsCard;
