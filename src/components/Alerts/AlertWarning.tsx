import React from "react";

const AlertWarning = () => {
  return (
    <>
      <div className="flex w-full rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
        <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FBBF24]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.5 8.68038C2.5 6.01573 2.5 4.6834 2.8146 4.23518C3.12919 3.78695 4.38194 3.35813 6.88743 2.5005L7.36477 2.3371C8.67082 1.89004 9.32384 1.6665 10 1.6665C10.6762 1.6665 11.3292 1.89004 12.6352 2.3371L13.1126 2.5005C15.6181 3.35813 16.8708 3.78695 17.1854 4.23518C17.5 4.6834 17.5 6.01573 17.5 8.68038V9.99264C17.5 14.691 13.9675 16.9711 11.7512 17.9392C11.15 18.2019 10.8494 18.3332 10 18.3332C9.15062 18.3332 8.85001 18.2019 8.2488 17.9392C6.03247 16.9711 2.5 14.691 2.5 9.99264V8.68038ZM10 6.0415C10.3452 6.0415 10.625 6.32133 10.625 6.6665V9.99984C10.625 10.345 10.3452 10.6248 10 10.6248C9.65482 10.6248 9.375 10.345 9.375 9.99984V6.6665C9.375 6.32133 9.65482 6.0415 10 6.0415ZM10 13.3332C10.4602 13.3332 10.8333 12.9601 10.8333 12.4998C10.8333 12.0396 10.4602 11.6665 10 11.6665C9.53976 11.6665 9.16667 12.0396 9.16667 12.4998C9.16667 12.9601 9.53976 13.3332 10 13.3332Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="w-full">
          <h5 className="mb-3.5 text-lg font-bold leading-[22px] text-[#9D5425]">
            Attention needed
          </h5>
          <p className="w-full max-w-[740px] text-[#D0915C]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when
          </p>
        </div>
      </div>
    </>
  );
};

export default AlertWarning;
