import type { InventoryOverviewRawResponse } from "@/services/api/home";

export type { InventoryOverviewRawResponse };

export interface InventorySummaryItem {
  label: string;
  value: number;
}

export interface InventoryOverviewViewModel {
  availablePercent: number;
  summary: InventorySummaryItem[];
}
