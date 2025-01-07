import Slider from "@/ui/Slider";

interface FilterSliderGroupProps {
  title: string;
  minValue: number;
  maxValue: number;
  name: string;
  isIdentityPage?: boolean;
}

const FilterSliderGroup = ({
  title,
  minValue,
  maxValue,
  name,
  isIdentityPage,
}: FilterSliderGroupProps) => {
  return (
    <div>
      <span className=" text-xs">{title}</span>
      <div className="text-sm text-white font-sansLight">
        <Slider
          name={name}
          minValue={minValue}
          maxValue={maxValue}
          isIdentityPage={isIdentityPage}
        />
      </div>
    </div>
  );
};

export default FilterSliderGroup;
