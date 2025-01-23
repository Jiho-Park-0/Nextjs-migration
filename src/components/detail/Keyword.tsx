import React from "react";
import Image from "next/image";
import keyword_data from "@/constants/keyword.json";
import keyword_names from "@/constants/keyword_names.json";
import KeywordHighlighted from "@/components/detail/KeywordHighlighted";

interface KeywordProps {
  keywords: string[];
}

const Keyword = ({ keywords }: KeywordProps) => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {keywords.map((keyword, index) => {
        const keywordInfo = keyword_data.find((item) => item.name === keyword);
        const keywordName = keyword_names.find((item) => item.name === keyword);

        if (keywordInfo && keywordInfo.content) {
          const content = keywordInfo.content;

          return (
            <div key={index} className="p-4 rounded-md bg-primary-500">
              <Image
                src={`/assets/keyword/${keywordName?.eng_name}.webp`}
                alt="resourceImg"
                className="inline-block mr-1 mb-[2px]"
                width={18}
                height={18}
                quality={10}
                loading="lazy"
              />
              <span>{keyword}</span>
              <br />
              <KeywordHighlighted text={content} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Keyword;
