import { formatNumber } from "@/utils/format-number";
import type { TopProductsRawResponse } from "@/services/api/home";

import type { TopProductViewModel } from "./types";

export function mapTopProductsResponse(response: TopProductsRawResponse): TopProductViewModel[] {
  return response.products.map((item) => {
    const isPositive = item.growth_rate >= 0;
    const formattedChange = `${(Math.abs(item.growth_rate) * 100).toFixed(2)}%`;

    return {
      id: item.id,
      name: item.product_name,
      sales: item.sales_count.toLocaleString(),
      rank: item.rank,
      revenue: formatNumber({ value: item.revenue_amount }),
      change: formattedChange,
      image: item.image_url,
      isPositive,
    };
  });
}
