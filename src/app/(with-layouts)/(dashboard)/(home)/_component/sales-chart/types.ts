import type { SalesChartRawResponse } from "@/services/api/home";

export type { SalesChartRawResponse };

export interface SalesChartDataPoint {
  name: string;
  sales: number;
  revenue: number;
}

export interface SalesChartSummary {
  totalSales: number;
  totalRevenue: number;
  salesDeltaPercent: number;
  revenueDeltaPercent: number;
  currency: string;
}

export interface SalesChartViewModel {
  data: SalesChartDataPoint[];
  summary: SalesChartSummary;
}
