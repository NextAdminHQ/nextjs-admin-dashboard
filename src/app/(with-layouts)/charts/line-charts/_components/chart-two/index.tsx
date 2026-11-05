"use client";

import { Card } from "@/components/tailgrids/core/card";
import { ChartContainer, ChartTooltip } from "@/components/tailgrids/core/chart";
import { useTheme } from "next-themes";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { mockLineChartTwoData } from "./data";
import LineChartTwoTooltip from "./tooltip";

interface CustomCursorProps {
  points?: Array<{ x: number; y: number }>;
  top?: number;
  height?: number;
}

function CustomCursor({ points, top, height }: CustomCursorProps) {
  if (!points || points.length < 2) return null;
  const x = points[0].x;
  const startY = top ?? Math.min(points[0].y, points[1].y);
  const rectHeight = height ?? Math.abs(points[1].y - points[0].y);

  return (
    <rect
      x={x - 1}
      y={startY}
      width={2}
      height={rectHeight}
      fill="url(#line-chart-two-cursor-gradient)"
      stroke="none"
      pointerEvents="none"
      className="recharts-tooltip-cursor"
    />
  );
}

export default function LineChartTwo() {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <Card className="p-0">
      {/* Header Container */}
      <div className="border-b border-card-border px-6 py-4">
        <h2 className="text-base font-medium text-text-primary">Line Chart 2</h2>
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
            <div className="size-2 shrink-0 rounded-xs bg-purple-300" />
            <p className="text-sm font-medium text-text-secondary">Group B</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-67.5 w-full">
          <ChartContainer className="h-full w-full" height={270} width="100%">
            <AreaChart
              data={mockLineChartTwoData.points}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="chartTwoGradientA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-brand-500)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-brand-500)" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="chartTwoGradientB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-purple-300)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-purple-300)" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="line-chart-two-cursor-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={isDark ? "rgba(255, 255, 255, 0.1)" : "#ffffff"}
                    stopOpacity={1}
                  />
                  <stop offset="100%" stopColor="#9CB9FF" stopOpacity={1} />
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
              <ChartTooltip cursor={<CustomCursor />} content={LineChartTwoTooltip} />
              <Area
                type="monotone"
                dataKey="groupA"
                stroke="var(--color-brand-500)"
                strokeWidth={2}
                fill="url(#chartTwoGradientA)"
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "var(--color-brand-500)",
                  strokeWidth: 2,
                  fill: "var(--color-card-background)",
                }}
              />
              <Area
                type="monotone"
                dataKey="groupB"
                stroke="var(--color-purple-300)"
                strokeWidth={2}
                fill="url(#chartTwoGradientB)"
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "var(--color-purple-300)",
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
