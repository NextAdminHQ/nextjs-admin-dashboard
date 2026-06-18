// Énumérations et types POS
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "served"
  | "paid"
  | "cancelled";

export type TableStatus = "free" | "occupied" | "waiting_payment" | "reserved";

export type PaymentMethod =
  | "cash"
  | "orange_money"
  | "mtn_momo"
  | "wave"
  | "card"
  | "room_charge";

export type SpecialNote = "NO_ONION" | "LOW_SALT" | "WELL_DONE" | "CUSTOM";

export interface MenuCategory {
  id: string;
  name: string;
  displayOrder: number;
  active: boolean;
  description?: string;
  icon?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  category?: MenuCategory;
  image?: string;
  preparationTime: number; // en minutes
  available: boolean;
  ingredients?: IngredientRef[];
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItem?: MenuItem;
  quantity: number;
  unitPrice: number;
  specialNotes?: SpecialNote[];
  customNotes?: string;
  status?: OrderStatus;
  prepTime?: number;
  subtotal?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  tableId?: string;
  roomId?: string;
  status: OrderStatus;
  items: OrderItem[];
  serverId: string;
  orderType?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  payments?: Payment[];
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  currentCustomers?: number;
  orderId?: string;
  currentOrderId?: string;
  positionX?: number;
  positionY?: number;
}

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  amount: number;
  reference?: string;
  createdAt: Date | string;
  status: "PENDING" | "COMPLETED" | "FAILED";
}

export interface IngredientRef {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface StockAlert {
  id: string;
  itemId: string;
  type: "low" | "critical" | "out_of_stock";
  createdAt: Date | string;
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitCost: number;
  minThreshold: number;
  lastUpdated: Date | string;
  alerts: StockAlert[];
}

export interface SalesReport {
  totalRevenue: number;
  totalOrders: number;
  averageTicket: number;
  topProducts: { name: string; quantity: number; revenue: number }[];
  paymentBreakdown: Record<string, number>;
  revenueByCategory: Record<string, number>;
  revenueByServer: Record<string, number>;
}

export interface KPIData {
  dailyRevenue: number;
  ordersInProgress: number;
  occupiedTables: number;
  outOfStockItems: number;
  averageTicket: number;
  mobileMoneyPercentage: number;
}

export interface PosReport {
  date: Date;
  totalRevenue: number;
  totalOrders: number;
  averageTicket: number;
  topProducts: { name: string; quantity: number; revenue: number }[];
  paymentBreakdown: Record<PaymentMethod, number>;
  revenueByCategory: Record<string, number>;
  revenueByServer: Record<string, number>;
}
