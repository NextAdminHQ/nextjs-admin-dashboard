"use client";

import { Card } from "@/components/tailgrids/core/card";
import { ChartContainer, ChartTooltip } from "@/components/tailgrids/core/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { mockBarChartOneData } from "./data";
import BarChartOneTooltip from "./tooltip";

export default function BarChartOne() {
  return (
    <Card className="p-0">
      {/* Header Container */}
      <div className="border-b border-card-border px-6 py-4">
        <h3 className="text-base font-medium text-text-primary">Bar Chart 1</h3>
      </div>

      {/* Body Container */}
      <div className="p-6">
        <div className="h-67.5 w-full">
          <ChartContainer className="h-full w-full" height={270} width="100%">
            <BarChart
              data={mockBarChartOneData.points}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 800]}
                ticks={[0, 200, 400, 600, 800]}
              />
              <ChartTooltip
                cursor={{ fill: "transparent" }}
                content={BarChartOneTooltip}
              />
              <Bar
                dataKey="sales"
                fill="var(--color-background-gray-quaternary)"
                activeBar={{ fill: "var(--color-brand-500)" }}
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
