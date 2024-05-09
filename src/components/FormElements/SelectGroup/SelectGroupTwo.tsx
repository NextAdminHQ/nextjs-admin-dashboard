"use client";
import React, { useState } from "react";

const SelectGroupTwo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Select Country
      </label>

      <div className="relative z-20 rounded-[7px] bg-white dark:bg-dark-2">
        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1680_14985)">
              <path
                d="M9.99935 18.3334C5.39697 18.3334 1.66602 14.6024 1.66602 10.0001C1.66602 5.39771 5.39697 1.66675 9.99935 1.66675C14.6017 1.66675 18.3327 5.39771 18.3327 10.0001C18.3327 14.6024 14.6017 18.3334 9.99935 18.3334ZM8.09103 16.3896C7.28887 14.6883 6.79712 12.8119 6.68877 10.8334H3.38426C3.71435 13.4805 5.59634 15.6457 8.09103 16.3896ZM8.35827 10.8334C8.4836 12.8657 9.06418 14.7748 9.99935 16.4601C10.9345 14.7748 11.5151 12.8657 11.6404 10.8334H8.35827ZM16.6144 10.8334H13.3099C13.2016 12.8119 12.7098 14.6883 11.9077 16.3896C14.4023 15.6457 16.2844 13.4805 16.6144 10.8334ZM3.38426 9.16675H6.68877C6.79712 7.18822 7.28887 5.31181 8.09103 3.61055C5.59634 4.35452 3.71435 6.51966 3.38426 9.16675ZM8.35827 9.16675H11.6404C11.5151 7.13443 10.9345 5.22529 9.99935 3.54007C9.06418 5.22529 8.4836 7.13443 8.35827 9.16675ZM11.9077 3.61055C12.7098 5.31181 13.2016 7.18822 13.3099 9.16675H16.6144C16.2844 6.51966 14.4023 4.35452 11.9077 3.61055Z"
                fill="#6B7280"
              />
            </g>
            <defs>
              <clipPath id="clip0_1680_14985">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>

        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-10 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-11.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 ${
            isOptionSelected ? "text-dark dark:text-white" : ""
          }`}
        >
          <option value="UnitedStates" className="text-dark-5 dark:text-dark-6">
            United States
          </option>
          <option value="UK" className="text-dark-5 dark:text-dark-6">
            UK
          </option>
          <option value="Canada" className="text-dark-5 dark:text-dark-6">
            Canada
          </option>
        </select>

        <span className="absolute right-4.5 top-1/2 z-10 -translate-y-1/2 text-dark-4 dark:text-dark-6">
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.69149 7.09327C3.91613 6.83119 4.31069 6.80084 4.57277 7.02548L9.99936 11.6768L15.4259 7.02548C15.688 6.80084 16.0826 6.83119 16.3072 7.09327C16.5319 7.35535 16.5015 7.74991 16.2394 7.97455L10.4061 12.9745C10.172 13.1752 9.82667 13.1752 9.59261 12.9745L3.75928 7.97455C3.4972 7.74991 3.46685 7.35535 3.69149 7.09327Z"
              fill=""
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroupTwo;
