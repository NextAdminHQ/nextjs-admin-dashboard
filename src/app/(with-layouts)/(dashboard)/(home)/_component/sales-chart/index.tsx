"use client";

import { Card, CardContent } from "@/components/tailgrids/core/card";
import { ChartContainer } from "@/components/tailgrids/core/chart";
import { getSalesChartData } from "@/services/api/home";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import SalesChartTooltip from "./custom-tooltip";
import { mapSalesChartResponse } from "./data";
import HeaderSection from "./header";
import SalesChartSkeleton from "./skeleton";
import type { Granularity } from "@/services/api/home";
import { getSalesChartStats } from "./utils";

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
      fill="url(#sales-chart-cursor-gradient)"
      stroke="none"
      pointerEvents="none"
      className="recharts-tooltip-cursor"
    />
  );
}

export default function SalesChart() {
  const [timeRange, setTimeRange] = useState<Granularity>("monthly");
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  const { data: rawResponse, isLoading } = useQuery({
    queryKey: ["sales-chart", timeRange],
    queryFn: () => getSalesChartData(timeRange),
  });

  const chartData = rawResponse ? mapSalesChartResponse(rawResponse) : undefined;
  const stats = chartData ? getSalesChartStats(chartData.summary) : [];

  return (
    <Card>
      <HeaderSection
        isLoading={isLoading}
        chartData={chartData}
        stats={stats}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />

      {/* Chart */}
      <CardContent className="relative h-67.5 w-full p-0">
        {isLoading || !chartData ? (
          <SalesChartSkeleton />
        ) : (
          <ChartContainer className="h-full w-full" height="100%" width="100%">
            <AreaChart data={chartData.data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <defs>
                <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={"5%"} stopColor="#3758F9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3758F9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sales-chart-cursor-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={isDark ? "rgba(255, 255, 255, 0.1)" : "#ffffff"}
                    stopOpacity={1}
                  />
                  <stop offset="100%" stopColor="#9CB9FF" stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                domain={[0, 1000]}
                ticks={[0, 200, 400, 600, 800, 1000]}
              />
              <Tooltip cursor={<CustomCursor />} content={SalesChartTooltip} />
              <Area
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#5750F1"
                strokeWidth={2}
                fill="url(#background)"
                dot={false}
                activeDot={{ r: 4, fill: "#5750F1", stroke: "#fff", strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#D8B4FE"
                strokeWidth={2}
                fill="transparent"
                dot={false}
                activeDot={{ r: 4, fill: "#D8B4FE", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
