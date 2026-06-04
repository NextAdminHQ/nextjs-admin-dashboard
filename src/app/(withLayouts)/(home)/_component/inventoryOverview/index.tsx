"use client";

import { ChartContainer } from "@/components/tailgrids/core/chart";
import { MenuDotsIcon } from "@/utils/icon";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
  { name: "Available", value: 61, color: "#5750F1" },
  { name: "Unavailable", value: 39, color: "#E5E7EB" },
];

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
                cx="50%"
                cy="100%"
                cornerRadius={6}
                data={chartData}
                dataKey="value"
                endAngle={0}
                innerRadius={80}
                outerRadius={110}
                paddingAngle={10}
                startAngle={180}
                stroke="var(--card)"
                strokeWidth={1}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
                          <tspan
                            className="fill-foreground font-medium text-2xl tabular-nums"
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 22}
                          >
                            {61}%
                          </tspan>
                          <tspan
                            className="fill-muted-foreground text-xs"
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 38}
                          >
                            Available
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
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
