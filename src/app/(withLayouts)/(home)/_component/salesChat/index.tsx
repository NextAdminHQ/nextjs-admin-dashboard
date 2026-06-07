"use client";

import { Card } from "@/components/tailgrids/core/card";
import { ChartContainer } from "@/components/tailgrids/core/chart";
import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tailgrids/core/select";
import { ArrowUpIcon } from "@/utils/icon";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

// Custom Tooltip Component
interface TooltipPayload {
  dataKey: string;
  name: string;
  value: number;
  color: string;
  payload?: Record<string, any>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-background rounded-lg border border-card-border p-3 shadow-lg">
        <p className="text-text-primary text-sm font-medium mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2.5 text-sm">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              <div className="flex gap-2 items-center">
                <span className="text-text-tertiary font-medium">{entry.name}</span>
                <span className="text-text-primary font-semibold">${entry.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const chartData = {
  monthly: [
    { name: "Jan", sales: 120, revenue: 230 },
    { name: "Feb", sales: 260, revenue: 190 },
    { name: "Mar", sales: 380, revenue: 250 },
    { name: "Apr", sales: 460, revenue: 350 },
    { name: "May", sales: 390, revenue: 310 },
    { name: "Jun", sales: 530, revenue: 620 },
    { name: "Jul", sales: 610, revenue: 740 },
    { name: "Aug", sales: 540, revenue: 680 },
    { name: "Sep", sales: 580, revenue: 760 },
    { name: "Oct", sales: 620, revenue: 850 },
    { name: "Nov", sales: 580, revenue: 680 },
    { name: "Dec", sales: 700, revenue: 600 },
  ],
  yearly: [
    { name: "2019", sales: 1520, revenue: 2130 },
    { name: "2020", sales: 2260, revenue: 3190 },
    { name: "2021", sales: 3380, revenue: 4250 },
    { name: "2022", sales: 4460, revenue: 5350 },
    { name: "2023", sales: 5390, revenue: 6310 },
    { name: "2024", sales: 6530, revenue: 7620 },
  ],
};

export default function SalesChart() {
  const [timeRange, setTimeRange] = useState("monthly");

  return (
    <Card>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Sales Amount */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="size-2 rounded-xs bg-brand-500"></span>
              <span className="text-text-secondary leading-5 text-sm font-medium">
                Sales Amount
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl leading-8 font-semibold text-text-primary">$45,070.00</h3>
              <p className="text-sm text-text-secondary leading-5 flex items-center gap-1">
                <span className="text-green-600 font-medium">4.35%</span>{" "}
                <span className="text-green-600">
                  <ArrowUpIcon />
                </span>
                <span>last month</span>
              </p>
            </div>
          </div>

          {/* Revenue Amount */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="size-2 rounded-xs bg-purple-500"></span>
              <span className="text-text-secondary leading-5 text-sm font-medium">
                Revenue Amount
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl leading-8 font-semibold text-text-primary">$32,400.00</h3>
              <p className="text-sm text-text-secondary leading-5 flex items-center gap-1">
                <span className="text-green-600 font-medium">4.35%</span>
                <span className="text-green-600">
                  <ArrowUpIcon />
                </span>
                <span>last month</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <div>
          <Select
            onChange={(value) => setTimeRange(value as string)}
            value={timeRange}
            defaultValue="monthly"
            aria-label="Select time range"
          >
            <SelectTrigger className={"rounded-lg gap-0 h-8"}>
              <SelectValue />
              <SelectIndicator className="text-button-primary-outline-text" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem textValue="monthly" id="monthly">
                Monthly
              </SelectItem>
              <SelectItem textValue="yearly" id="yearly">
                Yearly
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-67.5 w-full">
        <ChartContainer className="w-full h-full" height={270} width={"100%"} aspect={undefined}>
          <AreaChart
            data={chartData[timeRange as keyof typeof chartData] || chartData.monthly}
            margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
          >
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
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              domain={[0, 1000]}
              ticks={[0, 200, 400, 600, 800, 1000]}
            />
            <Tooltip
              cursor={{ stroke: "#9CA3AF", strokeWidth: 1, strokeDasharray: "4 4" }}
              content={<CustomTooltip />}
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
      </div>
    </Card>
  );
}
