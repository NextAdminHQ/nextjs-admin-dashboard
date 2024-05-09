import React, { useState } from "react";

const Star: React.FC = () => {
  const [stared, setStared] = useState(false);

  function toggleStar() {
    setStared(() => !stared);
  }

  return (
    <svg
      className={`hover:fill-[#FFD02C] dark:hover:hover:fill-[#FFD02C] ${stared ? "fill-[#FFD02C] " : "fill-[#DFE3F0] dark:fill-[#E5E7EE]/70"}`}
      onClick={toggleStar}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1044 3.81665C11.4712 3.07349 12.531 3.07349 12.8978 3.81665L14.8587 7.78911C15.0042 8.08396 15.2854 8.28842 15.6107 8.33598L19.9973 8.97714C20.8172 9.09698 21.144 10.1048 20.5504 10.683L17.3779 13.773C17.142 14.0028 17.0344 14.3339 17.09 14.6584L17.8385 19.0227C17.9787 19.8396 17.1211 20.4626 16.3875 20.0768L12.4666 18.0148C12.1752 17.8616 11.827 17.8616 11.5357 18.0148L7.61475 20.0768C6.88112 20.4626 6.02357 19.8396 6.16369 19.0227L6.9122 14.6584C6.96786 14.3339 6.8602 14.0028 6.62433 13.773L3.45179 10.683C2.8582 10.1048 3.18498 9.09698 4.0049 8.97714L8.39148 8.33598C8.71684 8.28842 8.99802 8.08396 9.14356 7.78911L11.1044 3.81665Z"
        fill=""
      />
    </svg>
  );
};

export default Star;
