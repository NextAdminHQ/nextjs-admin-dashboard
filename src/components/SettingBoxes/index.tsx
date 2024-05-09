"use client";
import React from "react";
import Image from "next/image";

const SettingBoxes = () => {
  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
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
                            d="M10.0008 1.0415C7.81464 1.0415 6.04243 2.81371 6.04243 4.99984C6.04243 7.18596 7.81464 8.95817 10.0008 8.95817C12.1869 8.95817 13.9591 7.18596 13.9591 4.99984C13.9591 2.81371 12.1869 1.0415 10.0008 1.0415ZM7.29243 4.99984C7.29243 3.50407 8.50499 2.2915 10.0008 2.2915C11.4965 2.2915 12.7091 3.50407 12.7091 4.99984C12.7091 6.49561 11.4965 7.70817 10.0008 7.70817C8.50499 7.70817 7.29243 6.49561 7.29243 4.99984Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.0008 10.2082C8.0728 10.2082 6.29653 10.6464 4.9803 11.3868C3.68367 12.1161 2.7091 13.2216 2.7091 14.5832L2.70904 14.6681C2.7081 15.6363 2.70692 16.8515 3.77277 17.7195C4.29733 18.1466 5.03116 18.4504 6.0226 18.6511C7.01681 18.8523 8.31262 18.9582 10.0008 18.9582C11.6889 18.9582 12.9847 18.8523 13.9789 18.6511C14.9704 18.4504 15.7042 18.1466 16.2288 17.7195C17.2946 16.8515 17.2934 15.6363 17.2925 14.6681L17.2924 14.5832C17.2924 13.2216 16.3179 12.1161 15.0212 11.3868C13.705 10.6464 11.9287 10.2082 10.0008 10.2082ZM3.9591 14.5832C3.9591 13.8737 4.47691 13.1041 5.59313 12.4763C6.68976 11.8594 8.24682 11.4582 10.0008 11.4582C11.7547 11.4582 13.3118 11.8594 14.4084 12.4763C15.5246 13.1041 16.0424 13.8737 16.0424 14.5832C16.0424 15.673 16.0088 16.2865 15.4394 16.7502C15.1307 17.0016 14.6145 17.2471 13.7309 17.4259C12.8501 17.6042 11.646 17.7082 10.0008 17.7082C8.35558 17.7082 7.15138 17.6042 6.27059 17.4259C5.38703 17.2471 4.87086 17.0016 4.56209 16.7502C3.99269 16.2865 3.9591 15.673 3.9591 14.5832Z"
                            fill=""
                          />
                        </svg>
                      </span>
                      <input
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Devid Jhon"
                        defaultValue="Devid Jhon"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
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
                            d="M4.77789 1.70226C5.79233 0.693575 7.46264 0.873121 8.31207 2.00777L9.36289 3.41144C10.0541 4.33468 9.99306 5.62502 9.17264 6.44079L8.97367 6.63863C8.96498 6.66387 8.9439 6.74322 8.96729 6.89401C9.01998 7.23359 9.30354 7.95393 10.494 9.1376C11.684 10.3209 12.4094 10.6041 12.7538 10.657C12.9099 10.6809 12.9915 10.6586 13.0168 10.6498L13.3568 10.3117C14.0862 9.58651 15.2069 9.45095 16.1099 9.94183L17.702 10.8073C19.0653 11.5484 19.4097 13.4015 18.2928 14.5121L17.109 15.6892C16.736 16.06 16.2344 16.3693 15.6223 16.4264C14.1148 16.5669 10.5996 16.3876 6.90615 12.7151C3.45788 9.28642 2.79616 6.29643 2.71244 4.82323L3.33643 4.78777L2.71244 4.82323C2.67011 4.07831 3.02212 3.44806 3.46989 3.00283L4.77789 1.70226ZM7.31141 2.75689C6.88922 2.19294 6.10232 2.1481 5.65925 2.58866L4.35125 3.88923C4.07632 4.1626 3.94404 4.46388 3.96043 4.75231C4.02695 5.92281 4.56136 8.62088 7.78751 11.8287C11.1721 15.194 14.298 15.2944 15.5062 15.1818C15.7531 15.1587 15.9986 15.0305 16.2276 14.8028L17.4114 13.6257C17.8926 13.1472 17.7865 12.276 17.105 11.9055L15.5129 11.0401C15.0733 10.8011 14.5582 10.8799 14.2382 11.1981L13.8586 11.5755L13.418 11.1323C13.8586 11.5755 13.858 11.5761 13.8574 11.5767L13.8562 11.5779L13.8537 11.5804L13.8483 11.5856L13.8361 11.5969C13.8273 11.6049 13.8173 11.6137 13.806 11.6231C13.7833 11.6418 13.7555 11.663 13.7222 11.6853C13.6555 11.73 13.5674 11.7786 13.4567 11.8199C13.231 11.904 12.9333 11.9491 12.5643 11.8925C11.842 11.7817 10.8851 11.2893 9.61261 10.024C8.34054 8.75915 7.84394 7.80671 7.73207 7.08564C7.67487 6.71693 7.72049 6.41918 7.8056 6.1933C7.84731 6.0826 7.89646 5.99458 7.94157 5.928C7.96407 5.8948 7.98548 5.86704 8.00437 5.84449C8.01382 5.83322 8.02265 5.82323 8.03068 5.81451L8.04212 5.80235L8.04737 5.79697L8.04986 5.79445L8.05107 5.79323C8.05167 5.79264 8.05227 5.79204 8.49295 6.23524L8.05227 5.79204L8.29128 5.55439C8.64845 5.19925 8.69847 4.60971 8.36223 4.16056L7.31141 2.75689Z"
                            fill=""
                          />
                        </svg>
                      </span>

                      <input
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="+990 3343 7865"
                        defaultValue="+990 3343 7865"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
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
                          d="M8.28567 2.7085H11.713C13.2445 2.70848 14.4575 2.70847 15.4069 2.83611C16.3839 2.96747 17.1747 3.24423 17.7983 3.86787C18.4219 4.4915 18.6987 5.28229 18.8301 6.25931C18.9577 7.20866 18.9577 8.42169 18.9577 9.95315V10.0472C18.9577 11.5786 18.9577 12.7917 18.8301 13.741C18.6987 14.718 18.4219 15.5088 17.7983 16.1325C17.1747 16.7561 16.3839 17.0329 15.4069 17.1642C14.4575 17.2919 13.2445 17.2918 11.713 17.2918H8.28567C6.75421 17.2918 5.54118 17.2919 4.59183 17.1642C3.61481 17.0329 2.82402 16.7561 2.20039 16.1325C1.57675 15.5088 1.29999 14.718 1.16863 13.741C1.04099 12.7917 1.041 11.5786 1.04102 10.0472V9.95315C1.041 8.42168 1.04099 7.20866 1.16863 6.25931C1.29999 5.28229 1.57675 4.4915 2.20039 3.86787C2.82402 3.24423 3.61481 2.96747 4.59183 2.83611C5.54118 2.70847 6.7542 2.70848 8.28567 2.7085ZM4.75839 4.07496C3.91998 4.18768 3.43694 4.39907 3.08427 4.75175C2.73159 5.10442 2.5202 5.58746 2.40748 6.42587C2.29234 7.28226 2.29102 8.41115 2.29102 10.0002C2.29102 11.5892 2.29234 12.7181 2.40748 13.5745C2.5202 14.4129 2.73159 14.8959 3.08427 15.2486C3.43694 15.6013 3.91998 15.8126 4.75839 15.9254C5.61478 16.0405 6.74367 16.0418 8.33268 16.0418H11.666C13.255 16.0418 14.3839 16.0405 15.2403 15.9254C16.0787 15.8126 16.5618 15.6013 16.9144 15.2486C17.2671 14.8959 17.4785 14.4129 17.5912 13.5745C17.7064 12.7181 17.7077 11.5892 17.7077 10.0002C17.7077 8.41115 17.7064 7.28226 17.5912 6.42587C17.4785 5.58746 17.2671 5.10442 16.9144 4.75175C16.5618 4.39907 16.0787 4.18768 15.2403 4.07496C14.3839 3.95982 13.255 3.9585 11.666 3.9585H8.33268C6.74367 3.9585 5.61478 3.95982 4.75839 4.07496ZM4.51921 6.26671C4.74019 6.00154 5.13429 5.96571 5.39946 6.18669L7.19854 7.68592C7.97601 8.33381 8.51579 8.78218 8.9715 9.07527C9.41263 9.35899 9.71179 9.45423 9.99935 9.45423C10.2869 9.45423 10.5861 9.35899 11.0272 9.07527C11.4829 8.78218 12.0227 8.33381 12.8002 7.68592L14.5992 6.18669C14.8644 5.96571 15.2585 6.00154 15.4795 6.26671C15.7005 6.53189 15.6646 6.92599 15.3995 7.14697L13.5691 8.67231C12.8304 9.28785 12.2318 9.78676 11.7034 10.1266C11.153 10.4806 10.6169 10.7042 9.99935 10.7042C9.38179 10.7042 8.84574 10.4806 8.29533 10.1266C7.76695 9.78677 7.16828 9.28786 6.42965 8.67232L4.59923 7.14697C4.33406 6.92599 4.29823 6.53189 4.51921 6.26671Z"
                          fill=""
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="devidjond45@gmail.com"
                      defaultValue="devidjond45@gmail.com"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="Username"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
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
                          d="M10.0008 1.0415C7.81464 1.0415 6.04243 2.81371 6.04243 4.99984C6.04243 7.18596 7.81464 8.95817 10.0008 8.95817C12.1869 8.95817 13.9591 7.18596 13.9591 4.99984C13.9591 2.81371 12.1869 1.0415 10.0008 1.0415ZM7.29243 4.99984C7.29243 3.50407 8.50499 2.2915 10.0008 2.2915C11.4965 2.2915 12.7091 3.50407 12.7091 4.99984C12.7091 6.49561 11.4965 7.70817 10.0008 7.70817C8.50499 7.70817 7.29243 6.49561 7.29243 4.99984Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0008 10.2082C8.0728 10.2082 6.29653 10.6464 4.9803 11.3868C3.68367 12.1161 2.7091 13.2216 2.7091 14.5832L2.70904 14.6681C2.7081 15.6363 2.70692 16.8515 3.77277 17.7195C4.29733 18.1466 5.03116 18.4504 6.0226 18.6511C7.01681 18.8523 8.31262 18.9582 10.0008 18.9582C11.6889 18.9582 12.9847 18.8523 13.9789 18.6511C14.9704 18.4504 15.7042 18.1466 16.2288 17.7195C17.2946 16.8515 17.2934 15.6363 17.2925 14.6681L17.2924 14.5832C17.2924 13.2216 16.3179 12.1161 15.0212 11.3868C13.705 10.6464 11.9287 10.2082 10.0008 10.2082ZM3.9591 14.5832C3.9591 13.8737 4.47691 13.1041 5.59313 12.4763C6.68976 11.8594 8.24682 11.4582 10.0008 11.4582C11.7547 11.4582 13.3118 11.8594 14.4084 12.4763C15.5246 13.1041 16.0424 13.8737 16.0424 14.5832C16.0424 15.673 16.0088 16.2865 15.4394 16.7502C15.1307 17.0016 14.6145 17.2471 13.7309 17.4259C12.8501 17.6042 11.646 17.7082 10.0008 17.7082C8.35558 17.7082 7.15138 17.6042 6.27059 17.4259C5.38703 17.2471 4.87086 17.0016 4.56209 16.7502C3.99269 16.2865 3.9591 15.673 3.9591 14.5832Z"
                          fill=""
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="devidjhon24"
                      defaultValue="devidjhon24"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="bio"
                  >
                    BIO
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-8">
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
                          d="M9.95153 1.0415L11.2493 1.0415C11.5945 1.0415 11.8743 1.32133 11.8743 1.6665C11.8743 2.01168 11.5945 2.2915 11.2493 2.2915H9.99935C8.01749 2.2915 6.59398 2.29283 5.51066 2.43848C4.44533 2.58171 3.80306 2.85412 3.32835 3.32883C2.85363 3.80355 2.58122 4.44582 2.43799 5.51115C2.29234 6.59447 2.29102 8.01798 2.29102 9.99984C2.29102 11.9817 2.29234 13.4052 2.43799 14.4885C2.58122 15.5539 2.85363 16.1961 3.32835 16.6708C3.80306 17.1456 4.44533 17.418 5.51066 17.5612C6.59398 17.7068 8.01749 17.7082 9.99935 17.7082C11.9812 17.7082 13.4047 17.7068 14.488 17.5612C15.5534 17.418 16.1956 17.1456 16.6704 16.6708C17.1451 16.1961 17.4175 15.5539 17.5607 14.4885C17.7064 13.4052 17.7077 11.9817 17.7077 9.99984V8.74984C17.7077 8.40466 17.9875 8.12484 18.3327 8.12484C18.6779 8.12484 18.9577 8.40466 18.9577 8.74984V10.0476C18.9577 11.9713 18.9577 13.4788 18.7996 14.6551C18.6377 15.859 18.2999 16.809 17.5542 17.5547C16.8086 18.3004 15.8585 18.6382 14.6546 18.8C13.4784 18.9582 11.9708 18.9582 10.0472 18.9582H9.95154C8.02788 18.9582 6.52034 18.9582 5.3441 18.8C4.14016 18.6382 3.19014 18.3004 2.44446 17.5547C1.69879 16.809 1.361 15.859 1.19914 14.6551C1.041 13.4788 1.04101 11.9713 1.04102 10.0477V9.95202C1.04101 8.02836 1.041 6.52083 1.19914 5.34459C1.361 4.14065 1.69879 3.19063 2.44446 2.44495C3.19014 1.69928 4.14016 1.36149 5.3441 1.19963C6.52034 1.04148 8.02787 1.04149 9.95153 1.0415ZM13.9748 1.89643C15.1147 0.756528 16.9628 0.756528 18.1028 1.89643C19.2427 3.03634 19.2427 4.88449 18.1028 6.02439L12.5627 11.5645C12.2533 11.8739 12.0595 12.0678 11.8432 12.2365C11.5884 12.4352 11.3128 12.6055 11.0211 12.7445C10.7735 12.8625 10.5135 12.9492 10.0983 13.0875L7.6779 13.8943C7.23103 14.0433 6.73835 13.927 6.40528 13.5939C6.0722 13.2608 5.95589 12.7682 6.10485 12.3213L6.91166 9.90086C7.05001 9.48572 7.13667 9.22566 7.25468 8.97805C7.39367 8.6864 7.56402 8.41077 7.76272 8.15602C7.93142 7.93973 8.12527 7.74591 8.43472 7.4365L13.9748 1.89643ZM17.2189 2.78032C16.5671 2.12857 15.5104 2.12857 14.8587 2.78032L14.5448 3.09417C14.5637 3.17405 14.5902 3.26923 14.627 3.37539C14.7465 3.71961 14.9725 4.17293 15.3994 4.59983C15.8263 5.02673 16.2796 5.25272 16.6238 5.37215C16.73 5.40898 16.8251 5.43544 16.905 5.45436L17.2189 5.14051C17.8706 4.48876 17.8706 3.43207 17.2189 2.78032ZM15.9203 6.43908C15.4903 6.25417 14.9895 5.95772 14.5155 5.48372C14.0415 5.00971 13.745 4.50886 13.5601 4.07888L9.34727 8.29172C9.00018 8.63881 8.86405 8.77647 8.74836 8.92479C8.6055 9.10795 8.48302 9.30613 8.38308 9.51582C8.30215 9.68564 8.23991 9.86895 8.08469 10.3346L7.72477 11.4144L8.58482 12.2744L9.66456 11.9145C10.1302 11.7593 10.3136 11.697 10.4834 11.6161C10.6931 11.5162 10.8912 11.3937 11.0744 11.2508C11.2227 11.1351 11.3604 10.999 11.7075 10.6519L15.9203 6.43908Z"
                          fill=""
                        />
                      </svg>
                    </span>

                    <textarea
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-5 pl-13 pr-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      name="bio"
                      id="bio"
                      rows={6}
                      placeholder="Write your bio here"
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales, enim arcu pellentesque lectus
 ac suscipit diam sem a felis. Cras sapien ex, blandit eu dui et suscipit gravida nunc. Sed sed est quis dui."
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Your Photo
              </h3>
            </div>
            <div className="p-7">
              <form>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full">
                    <>
                      <Image
                        src="/images/user/user-03.png"
                        width={55}
                        height={55}
                        alt="User"
                        className="overflow-hidden rounded-full"
                      />
                    </>
                  </div>
                  <div>
                    <span className="mb-1.5 font-medium text-dark dark:text-white">
                      Edit your photo
                    </span>
                    <span className="flex gap-3">
                      <button className="text-body-sm hover:text-red">
                        Delete
                      </button>
                      <button className="text-body-sm hover:text-primary">
                        Update
                      </button>
                    </span>
                  </div>
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
                >
                  <input
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    accept="image/png, image/jpg, image/jpeg"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <span className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4613 2.07827C10.3429 1.94876 10.1755 1.875 10 1.875C9.82453 1.875 9.65714 1.94876 9.53873 2.07827L6.2054 5.7241C5.97248 5.97885 5.99019 6.37419 6.24494 6.6071C6.49969 6.84002 6.89502 6.82232 7.12794 6.56756L9.375 4.10984V13.3333C9.375 13.6785 9.65482 13.9583 10 13.9583C10.3452 13.9583 10.625 13.6785 10.625 13.3333V4.10984L12.8721 6.56756C13.105 6.82232 13.5003 6.84002 13.7551 6.6071C14.0098 6.37419 14.0275 5.97885 13.7946 5.7241L10.4613 2.07827Z"
                          fill="#5750F1"
                        />
                        <path
                          d="M3.125 12.5C3.125 12.1548 2.84518 11.875 2.5 11.875C2.15482 11.875 1.875 12.1548 1.875 12.5V12.5457C1.87498 13.6854 1.87497 14.604 1.9721 15.3265C2.07295 16.0765 2.2887 16.7081 2.79029 17.2097C3.29189 17.7113 3.92345 17.9271 4.67354 18.0279C5.39602 18.125 6.31462 18.125 7.45428 18.125H12.5457C13.6854 18.125 14.604 18.125 15.3265 18.0279C16.0766 17.9271 16.7081 17.7113 17.2097 17.2097C17.7113 16.7081 17.9271 16.0765 18.0279 15.3265C18.125 14.604 18.125 13.6854 18.125 12.5457V12.5C18.125 12.1548 17.8452 11.875 17.5 11.875C17.1548 11.875 16.875 12.1548 16.875 12.5C16.875 13.6962 16.8737 14.5304 16.789 15.1599C16.7068 15.7714 16.5565 16.0952 16.3258 16.3258C16.0952 16.5565 15.7714 16.7068 15.1599 16.789C14.5304 16.8737 13.6962 16.875 12.5 16.875H7.5C6.30382 16.875 5.46956 16.8737 4.8401 16.789C4.22862 16.7068 3.90481 16.5565 3.67418 16.3258C3.44354 16.0952 3.29317 15.7714 3.21096 15.1599C3.12633 14.5304 3.125 13.6962 3.125 12.5Z"
                          fill="#5750F1"
                        />
                      </svg>
                    </span>
                    <p className="mt-2.5 text-body-sm font-medium">
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1 text-body-xs">
                      SVG, PNG, JPG or GIF (max, 800 X 800px)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex items-center justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingBoxes;
