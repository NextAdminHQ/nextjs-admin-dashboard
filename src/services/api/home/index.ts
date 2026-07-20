import { delay } from "@/utils/delay";
import {
  homeOverviewStatsRawData,
  inventoryOverviewRawData,
  lastTransactionsRawData,
  salesChartMonthlyRawData,
  salesChartYearlyRawData,
  topProductsRawData,
  trafficSourcesRawData,
} from "./data";
import type {
  Granularity,
  HomeOverviewStatsRawResponse,
  InventoryOverviewRawResponse,
  LastTransactionsRawResponse,
  SalesChartRawResponse,
  TopProductsRawResponse,
  TrafficSourcesRawResponse,
} from "./types";

export type * from "./types";

export async function getHomeOverviewStats(): Promise<HomeOverviewStatsRawResponse> {
  await delay(860);
  return homeOverviewStatsRawData;
}

export async function getSalesChartData(
  granularity: Granularity = "monthly",
): Promise<SalesChartRawResponse> {
  await delay(1200);
  return granularity === "yearly" ? salesChartYearlyRawData : salesChartMonthlyRawData;
}

export async function getInventoryOverviewData(): Promise<InventoryOverviewRawResponse> {
  await delay(1200);
  return inventoryOverviewRawData;
}

export async function getTopProductsData(): Promise<TopProductsRawResponse> {
  await delay(900);
  return topProductsRawData;
}

export async function getTrafficSourcesData(): Promise<TrafficSourcesRawResponse> {
  await delay(1000);
  return trafficSourcesRawData;
}

export async function getLastTransactionsData(): Promise<LastTransactionsRawResponse> {
  await delay(950);
  return lastTransactionsRawData;
}
