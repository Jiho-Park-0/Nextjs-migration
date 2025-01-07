import React, { useEffect, useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  title: string;
  optionList: Option[];
  selectedOption: Option[];
  handleSelectChange: (option: readonly Option[]) => void;
}

const FilterSelect = ({
  title,
  optionList,
  selectedOption,
  handleSelectChange,
}: FilterSelectProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // 서버 렌더링 중에는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <Select
      options={optionList}
      value={selectedOption}
      onChange={handleSelectChange}
      isMulti
      name={title}
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          primary25: "#996633", // hover 색
          primary50: "#996633", // 누르는 이펙트 색
          primary: "#170C0A", // focus때 테두리 색
          neutral0: "#281910", // 배경색
          neutral10: "#3A2716", // 고른 키워드 배경 색
          neutral20: "#170C0A", // 포커스 해제 시 테두리, 아이콘 색
          neutral30: "#FFD7AC", // hover 컨테이너 테두리 색
          neutral40: "#FFD7AC", // hover 아이콘 색
          neutral50: "#FFFFFF", // placeholder 색
          neutral60: "#FFFFFF", // 글자색
          neutral70: "#996633", // ??
          neutral80: "#FFFFFF", // 고른 키워드 글자 색
          neutral90: "#996633", // ??
          danger: "#FFD7AC", // 삭제 표시 글자 색
          dangerLight: "#170C0A", // 삭세 표시 배경 색
        },
      })}
    />
  );
};

export default FilterSelect;
