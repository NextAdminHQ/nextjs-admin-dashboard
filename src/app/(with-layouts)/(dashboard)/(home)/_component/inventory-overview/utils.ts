import type { InventoryOverviewRawResponse } from "@/services/api/home";

import type { InventoryOverviewViewModel } from "./types";

export function mapInventoryOverviewResponse(
  response: InventoryOverviewRawResponse,
): InventoryOverviewViewModel {
  return {
    availablePercent: Math.round(response.stock_summary.availability_rate),
    summary: [
      {
        label: "Total Stock",
        value: response.stock_summary.total_units,
      },
      {
        label: "Low stock",
        value: response.stock_summary.low_stock_units,
      },
      {
        label: "Out of stock",
        value: response.stock_summary.out_of_stock_units,
      },
    ],
  };
}
