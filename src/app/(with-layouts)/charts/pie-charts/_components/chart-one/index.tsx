"use client";

import { Card } from "@/components/tailgrids/core/card";
import { ChartContainer, ChartTooltip } from "@/components/tailgrids/core/chart";
import { Label, Pie, PieChart, PieSectorShapeProps, Sector } from "recharts";
import { mockPieChartOneData } from "./data";
import PieChartOneTooltip from "./tooltip";

export default function PieChartOne() {
  return (
    <Card className="p-0">
      {/* Header Container */}
      <div className="border-b border-card-border px-6 py-4">
        <h3 className="text-base font-medium text-text-primary">Pie Chart 1</h3>
      </div>

      {/* Body Container */}
      <div className="p-6">
        <div className="flex h-75 flex-col items-center justify-between">
          <div className="relative flex w-full flex-1 items-center justify-center">
            <ChartContainer className="h-full w-full" height={210} width="100%" aspect={undefined}>
              <PieChart>
                <ChartTooltip cursor={{ fill: "transparent" }} content={PieChartOneTooltip} />
                <Pie
                  data={mockPieChartOneData.segments}
                  cx="50%"
                  cy="50%"
                  innerRadius={82}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                  shape={CustomPieCell}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                          >
                            <tspan
                              x={viewBox.cx}
                              dy="-0.3em"
                              className="fill-text-primary text-[20px] font-semibold tracking-[-0.2px]"
                            >
                              {mockPieChartOneData.total_visitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              dy="1.4em"
                              className="fill-text-tertiary text-sm font-normal tracking-[-0.15px]"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          {/* Legend Container */}
          <div className="flex w-full justify-center gap-5 pt-4">
            {mockPieChartOneData.segments.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="size-2 rounded-xs" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-text-secondary">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function CustomPieCell(props: PieSectorShapeProps) {
  const payload = props.payload as { name: string; value: number; color: string } | undefined;
  const isGroupA = payload?.name === "Group A";
  return (
    <Sector
      {...props}
      fill={payload?.color ?? "var(--color-brand-400)"}
      cornerRadius={isGroupA ? 8 : 0}
    />
  );
}
