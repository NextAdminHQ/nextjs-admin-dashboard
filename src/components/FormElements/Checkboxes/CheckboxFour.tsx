import { useState } from "react";

const CheckboxFour = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelFour"
        className="flex cursor-pointer select-none items-center text-body-sm font-medium text-dark dark:text-white"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelFour"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked
                ? "border-primary bg-gray-2 dark:bg-dark-2"
                : "border-dark-5 dark:border-dark-6"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked && "!bg-primary"
              }`}
            >
              {" "}
            </span>
          </div>
        </div>
        Checkbox Text
      </label>
    </div>
  );
};

export default CheckboxFour;
