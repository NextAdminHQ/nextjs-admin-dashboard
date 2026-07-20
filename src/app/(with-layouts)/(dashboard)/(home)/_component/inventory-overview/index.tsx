"use client";

import { Button } from "@/components/tailgrids/core/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/tailgrids/core/card";
import { ChartContainer } from "@/components/tailgrids/core/chart";
import { getInventoryOverviewData } from "@/services/api/home";
import { MenuDotsIcon } from "@/utils/icon";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart } from "recharts";
import InventoryOverviewSkeleton from "./skeleton";
import { mapInventoryOverviewResponse } from "./utils";

export default function InventoryOverview() {
  const { data, isLoading } = useQuery({
    queryKey: ["inventory-overview"],
    queryFn: getInventoryOverviewData,
  });

  if (isLoading) {
    return <InventoryOverviewSkeleton />;
  }

  const inventoryOverview = data ? mapInventoryOverviewResponse(data) : undefined;
  const gaugeSegmentCount = 32;
  const inStockSegments = inventoryOverview
    ? Math.round((inventoryOverview.availablePercent / 100) * gaugeSegmentCount)
    : 0;
  const gaugeSegments = Array.from({ length: gaugeSegmentCount }, (_, index) => {
    return {
      fill:
        index < inStockSegments
          ? "var(--color-brand-500)"
          : "var(--color-background-gray-secondary_alt)",
      id: `segment-${index + 1}`,
      value: 1,
    };
  });

  return (
    <Card className="flex flex-col p-2 pt-5">
      {/* Header */}
      <CardHeader className="mb-6 px-3">
        <CardTitle className="leading-6 font-semibold text-text-primary">
          Inventory Overview
        </CardTitle>

        <Button iconOnly size="xs" variant="ghost">
          <MenuDotsIcon />
        </Button>
      </CardHeader>

      <div className="flex flex-1 flex-col justify-between lg:mt-10">
        <CardContent className="p-0">
          <div className="h-42.25 w-full">
            <ChartContainer
              className="relative h-full w-full"
              height={169}
              width={"100%"}
              aspect={undefined}
            >
              <PieChart>
                <Pie
                  cx="50%"
                  cy="100%"
                  cornerRadius={6}
                  data={gaugeSegments}
                  dataKey="value"
                  endAngle={0}
                  innerRadius={110}
                  outerRadius={145}
                  paddingAngle={2}
                  startAngle={180}
                  stroke="none"
                  strokeWidth={0}
                />
              </PieChart>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
                <p className="text-xl leading-6 font-semibold text-text-primary">
                  {inventoryOverview?.availablePercent}%
                </p>
                <p className="text-sm leading-5 text-text-tertiary">Available</p>
              </div>
            </ChartContainer>
          </div>
        </CardContent>

        <CardFooter className="mt-5 grid grid-cols-3 divide-x divide-card-border rounded-[9px] bg-background-gray-secondary_alt px-11 py-2">
          {inventoryOverview?.summary.map((item) => (
            <div key={item.label} className="flex flex-col items-center pt-3">
              <div>
                <div className="mb-0.5 text-xs leading-4 text-text-tertiary">{item.label}</div>
                <p className="leading-6 font-semibold text-text-primary">
                  {item.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </CardFooter>
      </div>
    </Card>
  );
}
