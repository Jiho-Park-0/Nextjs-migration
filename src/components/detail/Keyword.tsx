import React from "react";
import Image from "next/image";
import keyword_data from "@/constants/keyword.json";
import KeywordHighlighted from "@/components/detail/KeywordHighlighted";

interface IdentityKeywordProps {
  keywords: string[];
}

const IdentityKeyword = ({ keywords }: IdentityKeywordProps) => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {keywords.map((keyword, index) => {
        const keywordInfo = keyword_data.find((item) => item.name === keyword);

        if (keywordInfo && keywordInfo.content) {
          const content = keywordInfo.content;
          return (
            <div key={index} className="p-4 rounded-md bg-primary-500">
              <Image
                src={`/assets/keyword/${keyword}.webp`}
                alt="resourceImg"
                className="inline-block h-[1.1em] mr-1 mb-[2px]"
                width={1024}
                height={1024}
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

export default IdentityKeyword;
