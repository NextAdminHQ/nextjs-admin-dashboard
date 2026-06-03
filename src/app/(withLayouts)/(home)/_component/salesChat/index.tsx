"use client";

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/tailgrids/core/chart";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Sales Amount */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded bg-[#4F46E5]"></span>
              <span className="text-gray-600 text-sm font-medium">Sales Amount</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                $45,070.00
              </h3>
              <p className="text-sm text-gray-500">
                <span className="text-green-500 font-medium">4.35% ↑</span>{" "}
                last month
              </p>
            </div>
          </div>

          {/* Revenue Amount */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded bg-[#D8B4FE]"></span>
              <span className="text-gray-600 text-sm font-medium">Revenue Amount</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                $32,400.00
              </h3>
              <p className="text-sm text-gray-500">
                <span className="text-green-500 font-medium">4.35% ↑</span>{" "}
                last month
              </p>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <div>
          <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[right_10px_center]">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ChartContainer className="w-full h-full">
          <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
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
            <ChartTooltip 
              cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={
                <ChartTooltipContent 
                  labelFormatter={(label) => `${label}, 2026`}
                  formatter={(value: number, name: string) => {
                    // Create realistic-looking currency values based on chart position
                    const formattedValue = new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2
                    }).format(value * 25.524); // multiplier to match screenshot values
                    return <span className="font-semibold">{formattedValue}</span>;
                  }}
                  indicator="dot"
                />
              } 
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              name="Sales"
              stroke="#4F46E5" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4, fill: "#4F46E5", stroke: "#fff", strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              name="Revenue"
              stroke="#D8B4FE" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4, fill: "#D8B4FE", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
