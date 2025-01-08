"use client";

import FilterButtonGroup from "../FilterButtonGroup";
import FilterSelectGroup from "../FilterSelectGroup";
import FilterSliderGroup from "../FilterSliderGroup";
import FilterEtcButtonGroup from "../FilterEtcButtonGroup";

import sinners from "@/constants/sinners.json";
import resource from "@/constants/resource.json";

import keyword from "@/constants/keyword.json";

import egoGrade from "@/constants/egoGrade.json";
import egoEtcKeyword from "@/constants/egoEtcKeyword.json";
import useSelectOptions from "@/hooks/useSelectOptions";
import useStore from "@/zustand/store";

interface Option {
  value: string;
  label: string;
}

const keywordOptionList: Option[] = keyword.map((item) => ({
  value: item.name,
  label: item.name,
}));

const Filter = () => {
  const setOptions = useStore((state) => state.setEgoOptionsState);
  const options = useStore((state) => state.egoOptionsState);

  const {
    selectedOptions: keywordOptions,
    handleSelectChange: handleSelectChangeKeyword,
  } = useSelectOptions();

  const updateOptions = (
    key: keyof typeof options,
    selectedOptions: Option[]
  ) => {
    const newSelectedOptions = selectedOptions.map(
      (option: Option) => option.value
    );
    setOptions({
      ...options,
      [key]: newSelectedOptions,
    });
  };

  return (
    <div className="bg-primary-500 w-full rounded p-4 flex flex-col gap-2">
      <FilterButtonGroup
        title="수감자"
        content={sinners}
        src="/assets/profile/logo/"
        propertyToSaveTo="sinner"
        isIdentityPage={false}
      />
      <FilterButtonGroup
        title="사용 자원"
        content={resource}
        src="/assets/resource/"
        propertyToSaveTo="resources"
        isIdentityPage={false}
      />
      <FilterSelectGroup
        title="키워드"
        optionList={keywordOptionList}
        selectedOption={keywordOptions}
        handleSelectChange={(selectedOptions: readonly Option[]) => {
          handleSelectChangeKeyword(selectedOptions);
          updateOptions("keyword", [...selectedOptions]);
        }}
        zIndex="z-20"
      />

      <FilterButtonGroup
        title="유형"
        content={[
          {
            name: "참격",
          },
          {
            name: "관통",
          },
          {
            name: "타격",
          },
        ]}
        src="/assets/attackType/"
        propertyToSaveTo="types"
        isIdentityPage={false}
      />
      <FilterSliderGroup
        title="가중치"
        name="Weight"
        minValue={1}
        maxValue={7}
        isIdentityPage={false}
      />
      <FilterButtonGroup
        title="시즌"
        content={[
          { name: "1" },
          { name: "2" },
          { name: "3" },
          { name: "4" },
          { name: "5" },
        ]}
        src=""
        buttonType="text"
        propertyToSaveTo="season"
        isIdentityPage={false}
      />
      <FilterEtcButtonGroup
        title="등급"
        content={egoGrade}
        propertyToSaveTo="grade"
        isIdentityPage={false}
      />
      <FilterEtcButtonGroup
        title="기타"
        content={egoEtcKeyword}
        propertyToSaveTo="etcKeyword"
        isIdentityPage={false}
      />
    </div>
  );
};

export default Filter;
