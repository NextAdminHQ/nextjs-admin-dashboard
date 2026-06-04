"use client";

import { ChartContainer } from "@/components/tailgrids/core/chart";
import { MenuDotsIcon } from "@/utils/icon";
import { Cell, Pie, PieChart } from "recharts";

const chartData = [
  { name: "Available", value: 61, color: "#5750F1" },
  { name: "Unavailable", value: 39, color: "#E5E7EB" },
];
import GaugeComponent from "react-gauge-component";

const inventoryStats = [
  {
    label: "Total Stock",
    value: "14,500",
  },
  {
    label: "Low Stock",
    value: "7,00",
  },
  {
    label: "Out of stock",
    value: "146",
  },
];

export default function InventoryOverview() {
  return (
    <div className="border-[0.5px] border-card-border bg-card-background rounded-xl p-2 pt-5">
      {/* Header */}
      <div className="flex items-center justify-between px-3">
        <p className="text-text-primary font-semibold leading-6">Inventory Overview</p>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors">
          <MenuDotsIcon />
        </button>
      </div>
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SegmentedGauge value={61} />
    </div> */}
      {/* Chart Section */}
      
      <div className="flex flex-col items-center gap-6">
        <div className="w-64 h-64 flex items-center justify-center">
          <ChartContainer>
            <PieChart width={256} height={256}>
              <Pie
                data={chartData}
                cx={128}
                cy={128}
                innerRadius={70}
                outerRadius={110}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        {/* Percentage Display */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-text-primary font-semibold text-xl leading-7 tracking-[-0.2px]">61%</p>
          <p className="text-text-tertiary text-sm leading-5">Available</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-background-gray-secondary_alt rounded-lg p-6 flex items-center justify-between gap-8">
        {inventoryStats.map((stat, index) => (
          <div key={stat.label} className="flex-1 flex flex-col gap-1">
            <p className="text-text-tertiary font-normal text-xs leading-4">{stat.label}</p>
            <p className="text-text-primary font-semibold text-base leading-6 tracking-[-0.2px]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
