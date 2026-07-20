import type { LastTransactionsRawResponse } from "@/services/api/home";

export type { LastTransactionsRawResponse };

export type BadgeColor =
  | "gray"
  | "primary"
  | "error"
  | "warning"
  | "success"
  | "cyan"
  | "sky"
  | "blue"
  | "violet"
  | "purple"
  | "pink"
  | "rose"
  | "orange";

export interface TransactionViewModel {
  id: string;
  orderId: string;
  date: string;
  time: string;
  customer: string;
  amount: string;
  status: string;
  statusColor: BadgeColor;
}

export type Transaction = {
  id: string;
  date: string;
  time: string;
  customer: string;
  amount: string;
  status: string;
  statusColor: BadgeColor;
};
