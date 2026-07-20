"use client";

import { Card, CardContent } from "@/components/tailgrids/core/card";
import { ChartContainer } from "@/components/tailgrids/core/chart";
import { getSalesChartData } from "@/services/api/home";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import SalesChartTooltip from "./custom-tooltip";
import { mapSalesChartResponse } from "./data";
import HeaderSection from "./header";
import SalesChartSkeleton from "./skeleton";
import type { Granularity } from "@/services/api/home";
import { getSalesChartStats } from "./utils";

export default function SalesChart() {
  const [timeRange, setTimeRange] = useState<Granularity>("monthly");

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
              <Tooltip
                cursor={{ stroke: "#A1A1AA", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={SalesChartTooltip}
              />
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
