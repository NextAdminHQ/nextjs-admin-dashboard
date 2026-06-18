"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import { reportService } from "@/services/pos.service";

interface SalesData {
  day: string;
  revenue: number;
  orders: number;
}

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [reportType, setReportType] = useState("sales");
  const [exporting, setExporting] = useState(false);

  // Mock data
  const mockSalesData: SalesData[] = [
    { day: "Lun", revenue: 250000, orders: 45 },
    { day: "Mar", revenue: 280000, orders: 52 },
    { day: "Mer", revenue: 320000, orders: 58 },
    { day: "Jeu", revenue: 290000, orders: 48 },
    { day: "Ven", revenue: 450000, orders: 75 },
    { day: "Sam", revenue: 520000, orders: 88 },
    { day: "Dim", revenue: 380000, orders: 65 },
  ];

  const mockTopProducts = [
    { name: "Thé à la menthe", quantity: 145, revenue: 87000 },
    { name: "Café traditionnel", quantity: 132, revenue: 79200 },
    { name: "Couscous", quantity: 98, revenue: 196000 },
    { name: "Tajine poulet", quantity: 87, revenue: 217500 },
    { name: "Pastilla", quantity: 56, revenue: 168000 },
  ];

  const mockTopServers = [
    { name: "Ahmed Ben", revenue: 450000, orders: 75 },
    { name: "Fatima El", revenue: 380000, orders: 62 },
    { name: "Mohamed K.", revenue: 320000, orders: 58 },
    { name: "Laila M.", revenue: 290000, orders: 48 },
  ];

  const paymentMethods = [
    { name: "Espèces", percentage: 35, amount: 525000 },
    { name: "Orange Money", percentage: 28, amount: 420000 },
    { name: "MTN MoMo", percentage: 18, amount: 270000 },
    { name: "Carte bancaire", percentage: 15, amount: 225000 },
    { name: "Chambre", percentage: 4, amount: 60000 },
  ];

  const handleExport = async (format: "pdf" | "excel") => {
    setExporting(true);
    try {
      const response = await reportService.exportReport(
        format,
        new Date(startDate),
        new Date(endDate)
      );
      // Trigger download
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rapport-${format}.${format === "pdf" ? "pdf" : "xlsx"}`;
      a.click();
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setExporting(false);
    }
  };

  const totalRevenue = mockSalesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = mockSalesData.reduce((sum, d) => sum + d.orders, 0);
  const avgTicket = Math.round(totalRevenue / totalOrders);

  const maxRevenue = Math.max(...mockSalesData.map((d) => d.revenue));

  return (
    <>
      <Breadcrumb pageName="Rapports et statistiques" />

      <div className="space-y-6">
        {/* Filtres */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-1">
              <div>
                <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                  Du
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                  Au
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                  Type de rapport
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="sales">Ventes</option>
                  <option value="products">Produits</option>
                  <option value="servers">Serveurs</option>
                  <option value="payments">Paiements</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleExport("pdf")}
                disabled={exporting}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50"
              >
                PDF
              </button>
              <button
                onClick={() => handleExport("excel")}
                disabled={exporting}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
              >
                Excel
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Chiffre d'affaires
            </p>
            <p className="mt-3 text-3xl font-bold text-dark dark:text-white">
              {(totalRevenue / 1000).toFixed(0)}K F
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {mockSalesData.length} jours
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Total commandes
            </p>
            <p className="mt-3 text-3xl font-bold text-dark dark:text-white">
              {totalOrders}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {Math.round(totalOrders / mockSalesData.length)}/jour
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Ticket moyen
            </p>
            <p className="mt-3 text-3xl font-bold text-dark dark:text-white">
              {avgTicket.toLocaleString("fr-FR")} F
            </p>
            <p className="mt-1 text-xs text-gray-500">Par commande</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Meilleur jour
            </p>
            <p className="mt-3 text-3xl font-bold text-dark dark:text-white">
              {(maxRevenue / 1000).toFixed(0)}K F
            </p>
            <p className="mt-1 text-xs text-gray-500">Samedi</p>
          </div>
        </div>

        {/* Graphiques et tableaux */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Évolution des ventes */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Évolution des ventes
            </h3>

            <div className="space-y-2">
              {mockSalesData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.day}
                    </span>
                    <span className="text-sm font-semibold text-dark dark:text-white">
                      {(data.revenue / 1000).toFixed(0)}K F
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${(data.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Répartition des paiements */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Répartition des paiements
            </h3>

            <div className="space-y-3">
              {paymentMethods.map((method, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {method.name}
                    </span>
                    <span className="text-sm font-semibold text-dark dark:text-white">
                      {method.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {method.amount.toLocaleString("fr-FR")} F
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top produits et serveurs */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top produits */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Top 5 produits
            </h3>

            <div className="space-y-3">
              {mockTopProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <p className="font-semibold text-dark dark:text-white">
                      {idx + 1}. {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.quantity} ventes
                    </p>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {(product.revenue / 1000).toFixed(0)}K F
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top serveurs */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Performance des serveurs
            </h3>

            <div className="space-y-3">
              {mockTopServers.map((server, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <p className="font-semibold text-dark dark:text-white">
                      {idx + 1}. {server.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {server.orders} commandes
                    </p>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {(server.revenue / 1000).toFixed(0)}K F
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
