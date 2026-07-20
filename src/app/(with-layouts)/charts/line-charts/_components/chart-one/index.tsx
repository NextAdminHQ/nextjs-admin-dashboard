"use client";

import { Card } from "@/components/tailgrids/core/card";
import { ChartContainer, ChartTooltip } from "@/components/tailgrids/core/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { mockLineChartOneData } from "./data";
import LineChartOneTooltip from "./tooltip";

export default function LineChartOne() {
  return (
    <Card className="p-0">
      {/* Header Container */}
      <div className="border-b border-card-border px-6 py-4">
        <h3 className="text-base font-medium text-text-primary">Line Chart 1</h3>
      </div>

      {/* Body Container */}
      <div className="p-6">
        <div className="h-67.5 w-full">
          <ChartContainer className="h-full w-full" height={270} width="100%">
            <AreaChart
              data={mockLineChartOneData.points}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="chartOneGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-brand-500)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-brand-500)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 1000]}
                ticks={[0, 200, 400, 600, 800, 1000]}
              />
              <ChartTooltip
                cursor={{
                  stroke: "var(--color-brand-500)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                content={LineChartOneTooltip}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-brand-500)"
                strokeWidth={2}
                fill="url(#chartOneGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "var(--color-brand-500)",
                  strokeWidth: 2,
                  fill: "var(--color-card-background)",
                }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </Card>
  );
}
