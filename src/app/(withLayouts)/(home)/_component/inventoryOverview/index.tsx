"use client";

import { Card } from "@/components/tailgrids/core/card";
import { ChartContainer } from "@/components/tailgrids/core/chart";
import { MenuDotsIcon } from "@/utils/icon";
import { Pie, PieChart } from "recharts";

const chartData = [
  { month: "current", "total-stock": 1000, "low-stock": 400, "out-of-stock": 146 },
];
const totalUnits =
  chartData[0]["total-stock"] + chartData[0]["low-stock"] + chartData[0]["out-of-stock"];
const availablePercent = Math.round((chartData[0]["total-stock"] / totalUnits) * 100);
const gaugeSegmentCount = 32;
const inStockSegments = Math.round((chartData[0]["total-stock"] / totalUnits) * gaugeSegmentCount);
const gaugeSegments = Array.from({ length: gaugeSegmentCount }, (_, index) => {
  return {
    fill:
      index < inStockSegments
        ? "var(--color-brand-500)"
        : "var(--color-background-gray-secondary_alt)",
    id: `segment-${index + 1}`,
    value: 1,
  };
});
const inventorySummary = [
  {
    label: "Total Stock",
    value: chartData[0]["total-stock"],
  },
  {
    label: "Low stock",
    value: chartData[0]["low-stock"],
  },
  {
    label: "Out of stock",
    value: chartData[0]["out-of-stock"],
  },
] as const;

export default function InventoryOverview() {
  return (
    <Card className="p-2 pt-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 mb-6">
        <p className="text-text-primary font-semibold leading-6">Inventory Overview</p>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors">
          <MenuDotsIcon />
        </button>
      </div>

      <div className="flex flex-col justify-between flex-1 lg:mt-10">
        <div className="px-5">
          <div className="h-[169px] w-full">
            <ChartContainer className="w-full h-full relative">
              <PieChart>
                <Pie
                  cx="50%"
                  cy="100%"
                  cornerRadius={6}
                  data={gaugeSegments}
                  dataKey="value"
                  endAngle={0}
                  innerRadius={110}
                  outerRadius={145}
                  paddingAngle={2}
                  startAngle={180}
                  stroke="none"
                  strokeWidth={0}
                ></Pie>
              </PieChart>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <p className="text-text-primary font-semibold text-xl leading-6">
                  {availablePercent}%
                </p>
                <p className="text-text-tertiary text-sm leading-5">Available</p>
              </div>
            </ChartContainer>
          </div>
        </div>

        <div className="grid grid-cols-3  bg-background-gray-secondary_alt rounded-[9px] py-2 px-11 divide-x divide-gray-200 mt-5">
          {inventorySummary.map((item, _index) => (
            <div key={item.label} className="pt-3 flex flex-col items-center">
              <div>
                <div className="text-text-tertiary leading-4 text-xs mb-0.5">{item.label}</div>
                <p className="font-semibold text-text-primary leading-6">
                  {item.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
