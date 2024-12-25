import useToggleButtons from "@hooks/useToggleButtons";
import FilterEtcButton from "./FilterEtcButton";
import { egoOptionsState, optionsState } from "@recoils/atoms";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

interface Content {
  name: string;
}

interface FilterEtcButtonGroupProps {
  title: string;
  content: Content[];
  isIdentityPage?: boolean;
  propertyToSaveTo?: string;
}

const FilterEtcButtonGroup = ({
  title,
  content,
  isIdentityPage = true,
  propertyToSaveTo = "etcKeyword",
}: FilterEtcButtonGroupProps) => {
  const [buttons, toggleButton] = useToggleButtons(
    content.map((item) => item.name)
  );

  const setOptions = useSetRecoilState(optionsState);
  const setEgoOptions = useSetRecoilState(egoOptionsState);

  const savePropertyToOptions = (selectedButtons: string[]) => {
    if (isIdentityPage) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        [propertyToSaveTo]: selectedButtons,
      }));
    } else {
      setEgoOptions((prevOptions) => ({
        ...prevOptions,
        [propertyToSaveTo]: selectedButtons,
      }));
    }
  };

  useEffect(() => {
    savePropertyToOptions(
      buttons.filter((button) => button.isSelected).map((button) => button.name)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttons]);

  return (
    <div>
      <span className="text-xs">{title}</span>
      <div className="grid grid-cols-3 gap-1.5">
        {content.map((item, index) => (
          <FilterEtcButton
            key={index}
            name={item.name}
            isSelected={buttons[index].isSelected}
            onClick={() => toggleButton(item.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterEtcButtonGroup;
