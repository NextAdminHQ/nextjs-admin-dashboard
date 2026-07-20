import formatCurrency from "@/utils/format-currency";
import { SalesChartSummary } from "./types";

export function formatDelta(value: number) {
  return `${value.toFixed(2)}%`;
}

export function getSalesChartStats(summary: SalesChartSummary) {
  return [
    {
      id: "sales",
      label: "Sales Amount",
      value: formatCurrency(summary.totalSales),
      delta: formatDelta(summary.salesDeltaPercent),
      isPositive: summary.salesDeltaPercent >= 0,
      dotClassName: "bg-brand-500",
    },
    {
      id: "revenue",
      label: "Revenue Amount",
      value: formatCurrency(summary.totalRevenue),
      delta: formatDelta(summary.revenueDeltaPercent),
      isPositive: summary.revenueDeltaPercent >= 0,
      dotClassName: "bg-purple-500",
    },
  ];
}
