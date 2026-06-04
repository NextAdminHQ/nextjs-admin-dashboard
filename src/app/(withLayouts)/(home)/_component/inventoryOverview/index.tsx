"use client";

import { Card } from "@/components/tailgrids/core/card";
import { ChartContainer } from "@/components/tailgrids/core/chart";
import { MenuDotsIcon } from "@/utils/icon";
import { Label, Pie, PieChart } from "recharts";

const chartData = [{ month: "current", "in-stock": 760, "low-stock": 320, "out-of-stock": 160 }];
const totalUnits =
  chartData[0]["in-stock"] + chartData[0]["low-stock"] + chartData[0]["out-of-stock"];
const availablePercent = Math.round((chartData[0]["in-stock"] / totalUnits) * 100);
const gaugeSegmentCount = 32;
const inStockSegments = Math.round((chartData[0]["in-stock"] / totalUnits) * gaugeSegmentCount);
const lowStockSegments = Math.round((chartData[0]["low-stock"] / totalUnits) * gaugeSegmentCount);
const gaugeSegments = Array.from({ length: gaugeSegmentCount }, (_, index) => {
  const status =
    index < inStockSegments
      ? "in-stock"
      : index < inStockSegments + lowStockSegments
        ? "low-stock"
        : "out-of-stock";

  return {
    fill: `var(--color-${status})`,
    id: `segment-${index + 1}`,
    status,
    value: 1,
  };
});
const inventorySummary = [
  {
    label: "In stock",
    value: chartData[0]["in-stock"],
  },
  {
    label: "Low stock",
    value: chartData[0]["low-stock"],
  },
  {
    label: "Out",
    value: chartData[0]["out-of-stock"],
  },
] as const;

const chartConfig = {
  "in-stock": {
    label: "In stock",
    color: "var(--chart-2)",
  },
  "low-stock": {
    label: "Low stock",
    color: "var(--chart-1)",
  },
  "out-of-stock": {
    label: "Out of stock",
    color: "var(--destructive)",
  },
};

export default function InventoryOverview() {
  return (
    <Card className="p-2 pt-5">
      {/* Header */}
      <div className="flex items-center justify-between px-3">
        <p className="text-text-primary font-semibold leading-6">Inventory Overview</p>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors">
          <MenuDotsIcon />
        </button>
      </div>

      <div className="h-60 w-full">
        <ChartContainer className="w-full h-full">
          <PieChart>
            <Pie
              cx="50%"
              cy="100%"
              cornerRadius={6}
              data={gaugeSegments}
              dataKey="value"
              endAngle={0}
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              startAngle={180}
              stroke="var(--color-background-gray-secondary-alt)"
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
                          {availablePercent}%
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

      <div className="flex justify-between bg-background-gray-secondary_alt rounded-[9px] py-2 px-11">
        {inventorySummary.map((item, _index) => (
          <div key={item.label} className="pt-3">
            <div>
              <div className="text-text-tertiary leading-4 text-xs mb-0.5">{item.label}</div>
              <p className="font-semibold text-text-primary leading-6">
                {item.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
