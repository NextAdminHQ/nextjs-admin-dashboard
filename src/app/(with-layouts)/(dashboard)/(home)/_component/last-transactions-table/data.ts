import { BadgeColor, Transaction } from "./types";

export const SKELETON_ROW_COUNT = 5;

export const transactionsTableData: Transaction[] = [
  {
    id: "#ORD-2958",
    date: "26 Dec 2026",
    time: "12:45 PM",
    customer: "Amelia Chen",
    amount: "$288.7",
    status: "Shipped",
    statusColor: "violet",
  },
  {
    id: "#ORD-8539",
    date: "26 Dec 2026",
    time: "11:00 PM",
    customer: "Marcus Bell",
    amount: "$200",
    status: "Delivered",
    statusColor: "success",
  },
  {
    id: "#ORD-1047",
    date: "26 Dec 2026",
    time: "4:57 PM",
    customer: "Priya Natarajan",
    amount: "$509",
    status: "Delivered",
    statusColor: "success",
  },
  {
    id: "#ORD-6392",
    date: "26 Dec 2026",
    time: "2:14 PM",
    customer: "Jonas Weber",
    amount: "$420.5",
    status: "Pending",
    statusColor: "warning",
  },
  {
    id: "#ORD-4715",
    date: "26 Dec 2026",
    time: "07:00 AM",
    customer: "Sofia Rinaldi",
    amount: "$510.2",
    status: "Returned",
    statusColor: "gray",
  },
];

export const STATUS_COLOR_MAP: Record<string, BadgeColor> = {
  shipped: "violet",
  delivered: "success",
  pending: "warning",
  returned: "gray",
  failed: "error",
  refunded: "orange",
  processing: "blue",
};
