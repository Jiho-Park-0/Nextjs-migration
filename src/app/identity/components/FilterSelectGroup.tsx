import FilterSelect from "./FilterSelect";

interface Option {
  value: string;
  label: string;
}

interface FilterSelectGroupProps {
  title: string;
  optionList: Option[];
  selectedOption: Option[];
  handleSelectChange: (option: readonly Option[]) => void;
  zIndex: string;
}

const FilterSelectGroup = ({
  title,
  optionList,
  selectedOption,
  handleSelectChange,
  zIndex,
}: FilterSelectGroupProps) => {
  return (
    <div className={zIndex}>
      <span className=" text-xs flex">{title}</span>
      <div className="text-sm text-white font-sansLight">
        <FilterSelect
          title={title}
          optionList={optionList}
          selectedOption={selectedOption}
          handleSelectChange={handleSelectChange}
        />
      </div>
    </div>
  );
};

export default FilterSelectGroup;
