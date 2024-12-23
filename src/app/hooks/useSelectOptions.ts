import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

const useSelectOptions = (initialValue: Option[] = []) => {
  const [selectedOptions, setSelectedOptions] =
    useState<Option[]>(initialValue);

  const handleSelectChange = (options: readonly Option[]) => {
    setSelectedOptions(options as Option[]);
  };

  return { selectedOptions, handleSelectChange };
};

export default useSelectOptions;
