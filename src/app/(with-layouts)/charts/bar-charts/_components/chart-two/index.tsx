"use client";

import { Card } from "@/components/tailgrids/core/card";
import { ChartContainer, ChartTooltip } from "@/components/tailgrids/core/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { mockBarChartTwoData } from "./data";
import BarChartTwoTooltip from "./tooltip";

export default function BarChartTwo() {
  return (
    <Card className="p-0">
      {/* Header Container */}
      <div className="border-b border-card-border px-6 py-4">
        <h3 className="text-base font-medium text-text-primary">Bar Chart 2</h3>
      </div>

      {/* Body Container */}
      <div className="flex flex-col gap-5 p-6">
        {/* Custom Legend */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="size-2 shrink-0 rounded-xs bg-brand-500" />
            <p className="text-sm font-medium text-text-secondary">Group A</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 shrink-0 rounded-xs bg-brand-300" />
            <p className="text-sm font-medium text-text-secondary">Group B</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-67.5 w-full">
          <ChartContainer className="h-full w-full" height={270} width="100%">
            <BarChart
              data={mockBarChartTwoData.points}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 20000]}
                ticks={[0, 5000, 10000, 15000, 20000]}
                tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}K`)}
              />
              <ChartTooltip
                cursor={{ fill: "transparent" }}
                content={BarChartTwoTooltip}
              />
              <Bar
                dataKey="groupA"
                stackId="a"
                fill="var(--color-brand-500)"
                barSize={20}
              />
              <Bar
                dataKey="groupB"
                stackId="a"
                fill="var(--color-brand-300)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </Card>
  );
}
