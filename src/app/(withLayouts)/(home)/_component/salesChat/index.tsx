"use client";

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

const chartData = [
  { month: "Jan", sales: 120, revenue: 230 },
  { month: "Feb", sales: 260, revenue: 190 },
  { month: "Mar", sales: 380, revenue: 250 },
  { month: "Apr", sales: 460, revenue: 350 },
  { month: "May", sales: 390, revenue: 310 },
  { month: "Jun", sales: 530, revenue: 620 },
  { month: "Jul", sales: 610, revenue: 740 },
  { month: "Aug", sales: 540, revenue: 680 },
  { month: "Sep", sales: 580, revenue: 760 },
  { month: "Oct", sales: 620, revenue: 850 },
  { month: "Nov", sales: 580, revenue: 680 },
  { month: "Dec", sales: 700, revenue: 600 },
];

export default function SalesChart() {
  return (
    <div className="bg-card-background rounded-xl border-[0.5px] border-card-border p-5">
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
          <Select defaultValue="monthly">
            <SelectTrigger className={"rounded-lg gap-0 h-8"}>
              <SelectValue />
              <SelectIndicator className="text-button-primary-outline-text" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem id="monthly">Monthly</SelectItem>
              <SelectItem id="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-67.5 w-full">
        <ChartContainer className="w-full h-full">
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <defs>
              <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
                <stop offset={"5%"} stopColor="#3758F9" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3758F9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
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
    </div>
  );
}
