export interface InventoryOverviewRawResponse {
  inventory_dashboard_id: string;
  organization_id: string;
  warehouse: {
    id: string;
    name: string;
    code: string;
    region: string;
  };
  generated_at: string;
  timezone: string;
  stock_summary: {
    total_units: number;
    available_units: number;
    low_stock_units: number;
    out_of_stock_units: number;
    reserved_units: number;
    backordered_units: number;
    sku_count: number;
    availability_rate: number;
  };
  alert_level: "normal" | "warning" | "critical";
  alerts: {
    id: string;
    type: "reorder" | "stockout" | "backorder";
    severity: "low" | "medium" | "high";
    sku_code: string;
    message: string;
    created_at: string;
  }[];
  generated_by: {
    id: string;
    name: string;
    role: "inventory_manager" | "operations_manager";
  };
  created_at: string;
  updated_at: string;
}

export type OverviewStatKey = "views" | "profit" | "orders" | "users";

export interface OverviewStatsMetric {
  id: string;
  metric_key: OverviewStatKey;
  current_value: number;
  previous_value: number | null;
  delta_percent: number;
  trend: "up" | "down";
  currency_code: "USD" | null;
  display_format: "compact" | "currency_compact" | "integer";
  period_label: "last_24h" | "last_7d" | "last_30d";
  created_at: string;
  updated_at: string;
}

export interface HomeOverviewStatsRawResponse {
  dashboard_id: string;
  generated_at: string;
  timezone: string;
  metrics: OverviewStatsMetric[];
}

export interface SalesDataPoint {
  id: string;
  period_start: string; // ISO 8601
  period_end: string; // ISO 8601
  label: string; // Display label ("Jan", "Feb", etc.)
  sales: {
    value: number;
    currency_code: string;
  };
  revenue: {
    value: number;
    currency_code: string;
  };
}

export type Granularity = "monthly" | "yearly";

export interface SalesChartRawResponse {
  chart_id: string;
  organization_id: string;
  generated_at: string;
  timezone: string;
  granularity: Granularity;
  currency: string;
  data: SalesDataPoint[];
  summary: {
    total_sales: number;
    total_revenue: number;
    sales_delta_percent: number;
    revenue_delta_percent: number;
  };
}

export interface TopProductRawItem {
  id: string;
  product_name: string;
  sales_count: number;
  rank: number;
  revenue_amount: number;
  revenue_currency: string;
  growth_rate: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface TopProductsRawResponse {
  dashboard_id: string;
  generated_at: string;
  timezone: string;
  products: TopProductRawItem[];
}

export interface TrafficSourceRawItem {
  id: string;
  source_name: string;
  impression_count: number;
  percentage: number;
  created_at: string;
  updated_at: string;
}

export interface TrafficSourcesRawResponse {
  dashboard_id: string;
  generated_at: string;
  timezone: string;
  sources: TrafficSourceRawItem[];
}

export type TransactionStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "returned"
  | "failed"
  | "refunded";

export interface RawTransactionItem {
  id: string;
  order_number: string;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
  customer: {
    id: string;
    full_name: string;
    email: string;
  };
  amount: {
    value: number;
    currency_code: string;
  };
  status: TransactionStatus;
  payment_method: string;
  items_count: number;
}

export interface LastTransactionsRawResponse {
  resource: "transaction_list";
  generated_at: string; // ISO 8601
  data: RawTransactionItem[];
  meta: {
    total: number;
    page: number;
    page_size: number;
    has_more: boolean;
  };
}
