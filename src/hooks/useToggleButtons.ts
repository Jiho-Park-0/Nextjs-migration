import { useState } from "react";

interface ToggleButton {
  name: string;
  isSelected: boolean;
}

const useToggleButtons = (
  initialButtons: string[]
): [ToggleButton[], (name: string) => void] => {
  const [buttons, setButtons] = useState<ToggleButton[]>(
    initialButtons.map((name) => ({ name, isSelected: false }))
  );

  const toggleButton = (name: string) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.name === name
          ? { ...button, isSelected: !button.isSelected }
          : button
      )
    );

    return buttons;
  };

  return [buttons, toggleButton];
};

export default useToggleButtons;
