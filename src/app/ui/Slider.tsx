import React, { useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import useStore from "@/zustand/store";

interface Props {
  minValue: number;
  maxValue: number;
  name: string;
  isIdentityPage?: boolean;
}

const Slider = ({ name, minValue, maxValue, isIdentityPage = true }: Props) => {
  const [value, setValue] = React.useState([minValue, maxValue]);

  const handleChange = (newValue: [number, number]) => {
    setValue(newValue);
  };

  const setOptions = useStore((state) => state.setOptionsState);
  const setEgoOptions = useStore((state) => state.setEgoOptionsState);
  const options = useStore((state) => state.optionsState);
  const egoOptions = useStore((state) => state.egoOptionsState);

  useEffect(() => {
    if (isIdentityPage) {
      if (
        options[`min${name}`] !== value[0] ||
        options[`max${name}`] !== value[1]
      ) {
        setOptions({
          ...options,
          [`min${name}`]: value[0],
          [`max${name}`]: value[1],
        });
      }
    } else {
      if (
        egoOptions[`min${name}`] !== value[0] ||
        egoOptions[`max${name}`] !== value[1]
      ) {
        setEgoOptions({
          ...egoOptions,
          [`min${name}`]: value[0],
          [`max${name}`]: value[1],
        });
      }
    }
  }, [
    value,
    isIdentityPage,
    name,
    setOptions,
    setEgoOptions,
    options,
    egoOptions,
  ]);

  return (
    <div className="md:flex md:gap-2">
      <div className="w-full flex gap-1 items-center lg:gap-2">
        <div className="text-xs lg:text-sm text-primary-200 w-4">
          {value[0]}
        </div>
        <RangeSlider
          id="mySlider"
          min={minValue}
          max={maxValue}
          value={value}
          onInput={handleChange}
        />
        <div className="text-xs lg:text-sm text-primary-200 w-3">
          {value[1]}
        </div>
      </div>
    </div>
  );
};

export default Slider;
