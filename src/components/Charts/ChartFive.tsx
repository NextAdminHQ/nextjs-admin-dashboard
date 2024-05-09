import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartFive: React.FC = () => {
  const series = [
    {
      name: "Visitors",
      data: [168, 385, 201, 298, 187, 195, 291],
    },
  ];

  const options: ApexOptions = {
    colors: ["#5750F1"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 3,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",

      markers: {
        radius: 99,
      },
    },
    grid: {
      strokeDashArray: 7,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
    },
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex justify-between border-b border-stroke px-6 pb-4.5 pt-5.5 dark:border-dark-3">
        <div>
          <h2 className="mb-1.5 text-body-2xlg font-bold text-dark dark:text-white">
            Campaign Visitors
          </h2>
          <p className="text-body-sm font-medium">Last Campaign Performance</p>
        </div>
        <div>
          <h3 className="mb-0.5 text-body-2xlg font-bold text-dark dark:text-white">
            784k
          </h3>
          <p className="flex items-center justify-end gap-1 text-right text-red">
            <svg
              className="fill-current"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0157 4.74707C12.7532 4.74707 12.5344 4.96582 12.5344 5.22832V7.65645L9.4063 5.57832C8.94693 5.27207 8.37818 5.27207 7.9188 5.57832L5.0313 7.50332C4.92193 7.59082 4.7688 7.59082 4.63755 7.50332L1.24693 5.2502C1.02818 5.09707 0.721929 5.1627 0.568804 5.38145C0.415679 5.6002 0.481304 5.90645 0.700054 6.05957L4.09068 8.3127C4.55005 8.61895 5.1188 8.61895 5.57818 8.3127L8.46568 6.3877C8.57505 6.3002 8.72818 6.3002 8.85943 6.3877L11.6594 8.26895H9.49381C9.23131 8.26895 9.01255 8.4877 9.01255 8.7502C9.01255 9.0127 9.23131 9.23145 9.49381 9.23145H13.0157C13.2782 9.23145 13.4969 9.0127 13.4969 8.7502V5.22832C13.5188 4.96582 13.2782 4.74707 13.0157 4.74707Z"
                fill="#"
              />
            </svg>

            <span className="text-body-sm font-medium">-1.5%</span>
          </p>
        </div>
      </div>

      <div className="px-6 pb-1 pt-7.5">
        <div id="chartFive" className="-ml-3.5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFive;
