import type { TopProductsRawResponse } from "@/services/api/home";

export type { TopProductsRawResponse };

export interface TopProductViewModel {
  id: string;
  name: string;
  sales: string;
  rank: number;
  revenue: string;
  change: string;
  image: string;
  isPositive: boolean;
}
