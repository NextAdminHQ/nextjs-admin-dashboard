"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import type { Order } from "@/types/pos";
import { orderService } from "@/services/pos.service";

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [timers, setTimers] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getOrders();
        const activeOrders = data.filter(
          (o) => o.status === "pending" || o.status === "preparing" || o.status === "ready"
        );
        setOrders(activeOrders);

        // Initialize timers
        const newTimers: Record<string, number> = {};
        activeOrders.forEach((order) => {
          const createdAt = new Date(order.createdAt).getTime();
          const elapsed = Math.floor((Date.now() - createdAt) / 1000);
          newTimers[order.id] = elapsed;
        });
        setTimers(newTimers);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    loadOrders();
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          updated[key] += 1;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 border-yellow-300";
      case "preparing":
        return "bg-blue-50 border-blue-300";
      case "ready":
        return "bg-green-50 border-green-300";
      default:
        return "bg-gray-50 border-gray-300";
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
      default:
        return status;
    }
  };

  return (
    <>
      <Breadcrumb pageName="Cuisine (KDS)" />

      <div className="grid gap-4 auto-rows-max" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}>
        {orders.map((order) => (
          <div
            key={order.id}
            className={`rounded-lg border-2 p-4 ${getStatusColor(order.status)}`}
          >
            {/* En-tête */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-dark">Cmd #{order.orderNumber}</p>
                <p className="text-sm text-gray-600">
                  Table {order.tableId} · {order.items.length} articles
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{formatTime(timers[order.id] || 0)}</p>
                <p className="text-xs text-gray-500">Temps écoulé</p>
              </div>
            </div>

            {/* Serveur et notes */}
            {order.notes && (
              <div className="mb-4 p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
                <p className="text-sm font-semibold text-yellow-800">Notes spéciales</p>
                <p className="text-sm text-yellow-700">{order.notes}</p>
              </div>
            )}

            {/* Articles */}
            <div className="mb-4 space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div>
                    <p className="font-semibold text-dark">{item.quantity}x {item.menuItem.name}</p>
                    {item.specialNotes && item.specialNotes.length > 0 && (
                      <p className="text-xs text-gray-600">
                        {item.specialNotes.join(", ")}
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    ⏱ {item.menuItem.preparationTime}min
                  </p>
                </div>
              ))}
            </div>

            {/* Boutons de statut */}
            <div className="grid grid-cols-3 gap-2">
              <button
                disabled={order.status !== "pending"}
                className={`py-2 px-2 rounded font-semibold text-sm ${
                  order.status === "pending"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                En cours
              </button>
              <button
                disabled={order.status === "ready"}
                className={`py-2 px-2 rounded font-semibold text-sm ${
                  order.status !== "ready"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-green-200 text-green-700"
                }`}
              >
                Prêt
              </button>
              <button className="py-2 px-2 rounded font-semibold text-sm bg-red-100 text-red-600 hover:bg-red-200">
                Problème
              </button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="flex items-center justify-center min-h-96">
          <p className="text-gray-500">Aucune commande en attente de préparation</p>
        </div>
      )}
    </>
  );
}

