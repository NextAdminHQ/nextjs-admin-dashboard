"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import type { Order } from "@/types/pos";
import { orderService } from "@/services/pos.service";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchStatus = !filterStatus || order.status === filterStatus;
    const matchSearch =
      !searchTerm || order.orderNumber.includes(searchTerm);
    return matchStatus && matchSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "served":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "preparing":
        return "En préparation";
      case "ready":
        return "Prêt";
      case "served":
        return "Servi";
      case "completed":
        return "Terminé";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Gestion des commandes" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Liste des commandes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Numéro de commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="preparing">En préparation</option>
                <option value="ready">Prêt</option>
                <option value="served">Servi</option>
                <option value="completed">Terminé</option>
              </select>
            </div>

            <div className="space-y-2">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer transition hover:shadow-md ${
                    selectedOrder?.id === order.id
                      ? "bg-blue-50 dark:bg-blue-900 border-blue-500"
                      : "bg-gray-50 dark:bg-gray-700 border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-dark dark:text-white">
                        Commande #{order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.tableId ? `Table ${order.tableId}` : "Livraison"} · {order.items.length} articles
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-dark dark:text-white">
                        {order.total.toLocaleString("fr-FR")} F
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détails de la commande */}
        {selectedOrder && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark sticky top-20 h-fit">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Commande #{selectedOrder.orderNumber}
            </h3>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Statut</p>
                <p className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusLabel(selectedOrder.status)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Créée le</p>
                <p className="text-sm font-semibold text-dark dark:text-white">
                  {new Date(selectedOrder.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">Articles</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        {item.quantity}x {item.menuItem.name}
                      </span>
                      <span className="font-semibold text-dark dark:text-white">
                        {item.subtotal.toLocaleString("fr-FR")} F
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sous-total:</span>
                  <span>{selectedOrder.subtotal.toLocaleString("fr-FR")} F</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>TVA:</span>
                  <span>{selectedOrder.tax.toLocaleString("fr-FR")} F</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-dark dark:text-white border-t border-gray-200 dark:border-gray-600 pt-2">
                  <span>Total:</span>
                  <span>{selectedOrder.total.toLocaleString("fr-FR")} F</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                Modifier
              </button>
              <button className="w-full py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition">
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

