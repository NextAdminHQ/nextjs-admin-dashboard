import type { ReactNode } from "react";

import type { HomeOverviewStatsRawResponse } from "@/services/api/home";

export type { HomeOverviewStatsRawResponse };

export interface OverviewStatDisplayConfig {
  title: string;
  icon: ReactNode;
  iconBgClass: string;
  iconColorClass: string;
}

export interface OverviewStatViewModel {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
  iconBgClass: string;
  iconColorClass: string;
}
