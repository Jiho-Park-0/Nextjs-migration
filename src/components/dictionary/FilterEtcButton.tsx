import React from "react";
import { Button } from "@material-tailwind/react";

interface FilterEtcButtonProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const FilterEtcButton = ({
  name,
  isSelected,
  onClick,
}: FilterEtcButtonProps) => {
  return (
    <Button
      size="sm"
      key={`button:${name}`}
      className={`bg-primary-450 w-[86px] h-[40px] px-1 py-1 hover:bg-primary-300 rounded ${
        isSelected ? "bg-primary-400 border border-primary-100" : ""
      }`}
      placeholder={undefined}
      ripple={false}
      onClick={onClick}
    >
      <span className="text-xs text-white leading-tight">{name}</span>
    </Button>
  );
};

export default FilterEtcButton;
