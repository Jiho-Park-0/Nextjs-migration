import React from "react";
import keywords from "@/constants/keyword.json";

interface KeywordHighlightedProps {
  text: string;
}

const KeywordHighlighted = ({ text }: KeywordHighlightedProps) => {
  if (text === "") return <span></span>;

  const keywordNames = keywords.map((keyword) => keyword.name);
  const regex = new RegExp(
    `(${keywordNames.join("|")}|\\[.*?\\]|정신력|\\[피아식별불가\\])`,
    "gi"
  );

  // \n을 기준으로 텍스트를 분할
  const lines = text.split("\n");

  return (
    <span className="font-body font-thin text-brown-100 text-xs sm:text-sm">
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {line.split(regex).map((part, index) => {
            if (
              keywordNames.some(
                (keyword) => keyword.toLowerCase() === part.toLowerCase()
              )
            ) {
              return (
                <span key={index} className="text-yellow-500">
                  {part}
                </span>
              );
            } else if (part.match(/^\[.*?\]$/)) {
              if (part.toLowerCase() === "[피아식별불가]") {
                return (
                  <span key={index} className="text-red-500">
                    {part}
                  </span>
                );
              }
              return (
                <span key={index} className="text-orange-300">
                  {part}
                </span>
              );
            } else if (part.toLowerCase() === "정신력") {
              return (
                <span key={index} className="text-light-blue-200">
                  {part}
                </span>
              );
            } else {
              return <span key={index}>{part}</span>;
            }
          })}
          {lineIndex <= lines.length - 1 && <br />} {/* 줄바꿈 처리 */}
        </span>
      ))}
    </span>
  );
};

export default KeywordHighlighted;
