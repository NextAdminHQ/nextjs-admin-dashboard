import { NextResponse } from "next/server";

export async function GET() {
  const kpi = {
    dailyRevenue: 245000,
    ordersInProgress: 24,
    occupiedTables: 8,
    outOfStockItems: 3,
    averageTicket: 7850,
    mobileMoneyPercentage: 56,
  };

  return NextResponse.json(kpi);
}
