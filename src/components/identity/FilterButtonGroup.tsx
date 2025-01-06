import useToggleButtons from "@/hooks/useToggleButtons";
import FilterButton from "./FilterButton";
import { useEffect } from "react";
import { Tooltip } from "@material-tailwind/react";
import useStore from "@/zustand/store";

interface Content {
  name: string;
}

interface FilterButtonGroupProps {
  title: string;
  content: Content[];
  src: string;
  buttonType?: string;
  propertyToSaveTo: string;
  isIdentityPage?: boolean;
}

const FilterButtonGroup = ({
  title,
  content,
  src,
  buttonType,
  propertyToSaveTo,
  isIdentityPage = true,
}: FilterButtonGroupProps) => {
  const [buttons, toggleButton] = useToggleButtons(
    content.map((item) => item.name)
  );

  const options = useStore((state) => state.optionsState);
  const setOptions = useStore((state) => state.setOptionsState);
  const egoOptions = useStore((state) => state.egoOptionsState);
  const setEgoOptions = useStore((state) => state.setEgoOptionsState);

  const savePropertyToOptions = (selectedButtons: string[]) => {
    if (isIdentityPage) {
      setOptions({
        ...options,
        [propertyToSaveTo as keyof typeof options]: selectedButtons,
      });
    } else {
      setEgoOptions({
        ...egoOptions,
        [propertyToSaveTo as keyof typeof egoOptions]: selectedButtons,
      });
    }
  };

  useEffect(() => {
    const initialSelectedButtons: string[] | number | undefined = isIdentityPage
      ? options[propertyToSaveTo as keyof typeof options]
      : egoOptions[propertyToSaveTo as keyof typeof egoOptions];

    if (initialSelectedButtons && Array.isArray(initialSelectedButtons)) {
      initialSelectedButtons.forEach((buttonName) => {
        const button = buttons.find((button) => button.name === buttonName);
        if (button) {
          toggleButton(buttonName);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    savePropertyToOptions(
      buttons.filter((button) => button.isSelected).map((button) => button.name)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttons]);

  return (
    <div>
      <span className="text-xs flex items-center">
        {title}
        {title === "사용 자원" && (
          <Tooltip
            placement="right"
            content={
              <span className="text-xs">
                선택한 모든 자원을 요구하는 에고를 보여줍니다.
              </span>
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-3.5 w-3.5 cursor-pointer text-primary-100 ml-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </Tooltip>
        )}
      </span>

      <div className="grid grid-cols-6 gap-1.5">
        {content.map((item, index) => (
          <FilterButton
            key={`button:${index}`}
            name={item.name}
            imgSrc={src + item.name + ".webp"}
            type={buttonType}
            isSelected={buttons[index].isSelected}
            onClick={() => toggleButton(item.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterButtonGroup;
