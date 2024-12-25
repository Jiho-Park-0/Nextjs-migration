"use client";

import FilterButtonGroup from "./FilterButtonGroup";
import FilterSelectGroup from "./FilterSelectGroup";
import FilterSliderGroup from "./FilterSliderGroup";
import FilterEtcButtonGroup from "./FilterEtcButtonGroup";

import sinners from "@/app/constants/sinners.json";
import resource from "@/app/constants/resource.json";
import attackType from "@/app/constants/attackType.json";
import keyword from "@/app/constants/keyword.json";
import affiliation from "@/app/constants/affiliation.json";
import etcKeyword from "@/app/constants/etcKeyword.json";

import useSelectOptions from "@/app/hooks/useSelectOptions";
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
  const setOptions = useStore((state) => state.setOptionsState);
  const options = useStore((state) => state.optionsState);

  const {
    selectedOptions: keywordOptions,
    handleSelectChange: handleSelectChangeKeyword,
  } = useSelectOptions();
  const {
    selectedOptions: affiliationOptions,
    handleSelectChange: handleSelectChangeAffiliation,
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
  console.log("options", options);
  return (
    <div className="bg-primary-500 w-full rounded p-4 flex flex-col gap-2">
      <FilterButtonGroup
        title="수감자"
        content={sinners}
        src="/assets/profile/logo/"
        propertyToSaveTo="sinner"
      />
      <FilterButtonGroup
        title="자원"
        content={resource}
        src="/assets/resource/"
        propertyToSaveTo="resources"
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
      <FilterSelectGroup
        title="소속"
        optionList={affiliation}
        selectedOption={affiliationOptions}
        handleSelectChange={(selectedOptions) => {
          handleSelectChangeAffiliation(selectedOptions);
          updateOptions("affiliation", [...selectedOptions]);
        }}
        zIndex="z-10"
      />
      <FilterButtonGroup
        title="유형"
        content={attackType}
        src="/assets/attackType/"
        propertyToSaveTo="types"
      />
      <FilterSliderGroup title="속도" name="Speed" minValue={1} maxValue={9} />
      <FilterSliderGroup
        title="가중치"
        name="Weight"
        minValue={1}
        maxValue={9}
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
      />
      <FilterButtonGroup
        title="등급"
        content={[{ name: "1" }, { name: "2" }, { name: "3" }]}
        src="/assets/common/"
        propertyToSaveTo="grade"
      />
      <FilterEtcButtonGroup
        title="기타"
        content={etcKeyword}
        propertyToSaveTo="etcKeyword"
      />
    </div>
  );
};

export default Filter;
