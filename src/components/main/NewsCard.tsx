"use client";

import { getNews } from "@/api/mainApi";
import { useQuery } from "@tanstack/react-query";
import { Main_Keys } from "@/constants/queryKeys";

interface News {
  title: string;
  url: string;
  release: string;
  imageUrl: string;
}

const NewsCard = () => {
  const { data: news } = useQuery({
    queryKey: Main_Keys.news,
    queryFn: getNews,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    placeholderData: [],
  });

  return (
    <div className="w-full h-fit bg-primary-300 text-primary-100 rounded-md p-4 md:p-6 lg:p-10 flex flex-col justify-between">
      <h2 className="font-sansBold text-base md:text-xl lg:text-2xl">
        최신 소식
      </h2>
      <div className="font-body mt-4 flex flex-col justify-between flex-grow">
        {news?.map((news: News, index: number) => (
          <div key={index}>
            <p className="text-xs text-primary-200">
              {news.release.split("T")[0]}
            </p>
            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm truncate block w-full hover:underline"
            >
              {news.title}
            </a>
            {index < 2 && <hr className="border-t border-primary-200 my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
