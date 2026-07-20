import type { SalesChartRawResponse } from "@/services/api/home";

import type { SalesChartViewModel } from "./types";

export function mapSalesChartResponse(response: SalesChartRawResponse): SalesChartViewModel {
  return {
    data: response.data.map((point) => ({
      name: point.label,
      sales: point.sales.value,
      revenue: point.revenue.value,
    })),
    summary: {
      totalSales: response.summary.total_sales,
      totalRevenue: response.summary.total_revenue,
      salesDeltaPercent: response.summary.sales_delta_percent,
      revenueDeltaPercent: response.summary.revenue_delta_percent,
      currency: response.currency,
    },
  };
}
