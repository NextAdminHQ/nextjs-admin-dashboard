import formatCurrency from "@/utils/format-currency";
import { formatNumber } from "@/utils/format-number";
import { overviewStatDisplayConfig } from "./data";
import type { HomeOverviewStatsRawResponse } from "@/services/api/home";

import type { OverviewStatViewModel } from "./types";

export function mapOverviewStats(response: HomeOverviewStatsRawResponse): OverviewStatViewModel[] {
  return response.metrics.map((metric) => {
    const display = overviewStatDisplayConfig[metric.metric_key];

    return {
      id: metric.id,
      title: display.title,
      value:
        metric.display_format === "currency_compact"
          ? formatCurrency(metric.current_value)
          : metric.display_format === "integer"
            ? metric.current_value.toLocaleString()
            : formatNumber({ value: metric.current_value }),
      change: `${metric.delta_percent.toFixed(2)}%`,
      isPositive: metric.trend === "up",
      icon: display.icon,
      iconBgClass: display.iconBgClass,
      iconColorClass: display.iconColorClass,
    };
  });
}
