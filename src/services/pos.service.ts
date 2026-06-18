// Services pour le module POS Restaurant
import type {
  Order,
  MenuItem,
  MenuCategory,
  Table,
  Payment,
  StockItem,
  SalesReport,
  KPIData,
} from "@/types/pos";

// Service pour les commandes
export const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await fetch("/api/pos/orders");
    return response.json();
  },

  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`/api/pos/orders/${id}`);
    return response.json();
  },

  async createOrder(order: Partial<Order>): Promise<Order> {
    const response = await fetch("/api/pos/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return response.json();
  },

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const response = await fetch(`/api/pos/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  async cancelOrder(id: string): Promise<void> {
    await fetch(`/api/pos/orders/${id}`, { method: "DELETE" });
  },
};

// Service pour les menus
export const menuService = {
  async getCategories(): Promise<MenuCategory[]> {
    const response = await fetch("/api/pos/menu/categories");
    return response.json();
  },

  async getMenuItems(categoryId?: string): Promise<MenuItem[]> {
    const url = categoryId
      ? `/api/pos/menu/items?categoryId=${categoryId}`
      : "/api/pos/menu/items";
    const response = await fetch(url);
    return response.json();
  },

  async createCategory(category: Partial<MenuCategory>): Promise<MenuCategory> {
    const response = await fetch("/api/pos/menu/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return response.json();
  },

  async createMenuItem(item: Partial<MenuItem>): Promise<MenuItem> {
    const response = await fetch("/api/pos/menu/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return response.json();
  },

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    const response = await fetch(`/api/pos/menu/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return response.json();
  },
};

// Service pour les tables
export const tableService = {
  async getTables(): Promise<Table[]> {
    const response = await fetch("/api/pos/tables");
    return response.json();
  },

  async updateTable(id: string, updates: Partial<Table>): Promise<Table> {
    const response = await fetch(`/api/pos/tables/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  async createTable(table: Partial<Table>): Promise<Table> {
    const response = await fetch("/api/pos/tables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(table),
    });
    return response.json();
  },

  async mergeTables(tableIds: string[]): Promise<Order> {
    const response = await fetch("/api/pos/tables/merge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableIds }),
    });
    return response.json();
  },
};

// Service pour les paiements
export const paymentService = {
  async processPayment(orderId: string, payment: Partial<Payment>): Promise<Payment> {
    const response = await fetch("/api/pos/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, ...payment }),
    });
    return response.json();
  },

  async getOrderPayments(orderId: string): Promise<Payment[]> {
    const response = await fetch(`/api/pos/payments?orderId=${orderId}`);
    return response.json();
  },
};

// Service pour les stocks
export const stockService = {
  async getStockItems(): Promise<StockItem[]> {
    const response = await fetch("/api/pos/stock/items");
    return response.json();
  },

  async updateStockItem(id: string, quantity: number, reason: string): Promise<StockItem> {
    const response = await fetch(`/api/pos/stock/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity, reason }),
    });
    return response.json();
  },

  async getStockAlerts() {
    const response = await fetch("/api/pos/stock/alerts");
    return response.json();
  },
};

// Service pour les rapports
export const reportService = {
  async getSalesReport(startDate: Date, endDate: Date): Promise<SalesReport> {
    const url = `/api/pos/reports/sales?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    const response = await fetch(url);
    return response.json();
  },

  async getKPIData(): Promise<KPIData> {
    const response = await fetch("/api/pos/reports/kpi");
    return response.json();
  },

  async exportReport(format: "pdf" | "excel", startDate: Date, endDate: Date) {
    const url = `/api/pos/reports/export?format=${format}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    return fetch(url);
  },
};
