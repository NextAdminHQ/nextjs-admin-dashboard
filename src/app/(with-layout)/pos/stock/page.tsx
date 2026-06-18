"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import type { StockItem } from "@/types/pos";
import { stockService } from "@/services/pos.service";

export default function StockPage() {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [filterAlert, setFilterAlert] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustData, setAdjustData] = useState({ quantity: 0, reason: "" });

  useEffect(() => {
    const loadItems = async () => {
      try {
        const items = await stockService.getStockItems();
        setStockItems(items);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const filteredItems = stockItems.filter((item) => {
    if (!filterAlert) return true;
    return item.alerts?.some((alert) => alert.type === filterAlert);
  });

  const handleAdjustStock = async () => {
    if (!selectedItem) return;

    try {
      await stockService.updateStockItem(
        selectedItem.id,
        adjustData.quantity,
        adjustData.reason
      );
      setShowAdjustModal(false);
      setAdjustData({ quantity: 0, reason: "" });
      // Reload items
      const items = await stockService.getStockItems();
      setStockItems(items);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "critical":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "out_of_stock":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getAlertLabel = (type: string) => {
    switch (type) {
      case "low":
        return "Stock bas";
      case "critical":
        return "Stock critique";
      case "out_of_stock":
        return "Rupture";
      default:
        return type;
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
      <Breadcrumb pageName="Gestion des stocks" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Liste des articles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                Inventaire
              </h3>
              <select
                value={filterAlert}
                onChange={(e) => setFilterAlert(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Tous les articles</option>
                <option value="low">Stock bas</option>
                <option value="critical">Stock critique</option>
                <option value="out_of_stock">Rupture</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Article</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Quantité</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Seuil min.</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Coût</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Alertes</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3">
                        <p className="font-medium text-dark dark:text-white">{item.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-dark dark:text-white">
                          {item.quantity} {item.unit}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {item.minThreshold} {item.unit}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {(item.unitCost * item.quantity).toLocaleString("fr-FR")} F
                      </td>
                      <td className="px-4 py-3">
                        {item.alerts && item.alerts.length > 0 ? (
                          <div className="space-y-1">
                            {item.alerts.map((alert) => (
                              <span
                                key={alert.id}
                                className={`inline-block px-2 py-1 rounded text-xs font-medium mr-1 border ${getAlertColor(alert.type)}`}
                              >
                                {getAlertLabel(alert.type)}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            OK
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowAdjustModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Ajuster
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Résumé */}
        {selectedItem && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark sticky top-20 h-fit">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              {selectedItem.name}
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Quantité actuelle</p>
                <p className="text-2xl font-bold text-dark dark:text-white">
                  {selectedItem.quantity} {selectedItem.unit}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Seuil minimum</p>
                <p className="text-lg font-semibold text-dark dark:text-white">
                  {selectedItem.minThreshold} {selectedItem.unit}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Coût total</p>
                <p className="text-lg font-semibold text-dark dark:text-white">
                  {(selectedItem.unitCost * selectedItem.quantity).toLocaleString("fr-FR")} F
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Dernière mise à jour</p>
                <p className="text-sm text-dark dark:text-white">
                  {new Date(selectedItem.lastUpdated).toLocaleDateString("fr-FR")}
                </p>
              </div>

              <button
                onClick={() => setShowAdjustModal(true)}
                className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition mt-4"
              >
                Ajuster le stock
              </button>
            </div>
          </div>
        )}

        {/* Modal Ajustement */}
        {showAdjustModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-dark rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                Ajuster le stock: {selectedItem.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-dark dark:text-white mb-2 block">
                    Quantité à ajouter/retirer
                  </label>
                  <input
                    type="number"
                    value={adjustData.quantity || ""}
                    onChange={(e) => setAdjustData({ ...adjustData, quantity: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Valeur positive pour ajouter, négative pour retirer
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-dark dark:text-white mb-2 block">
                    Raison
                  </label>
                  <select
                    value={adjustData.reason}
                    onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Sélectionner une raison</option>
                    <option value="achat">Achat</option>
                    <option value="utilisation">Utilisation</option>
                    <option value="cassé">Article cassé</option>
                    <option value="inventaire">Inventaire physique</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAdjustModal(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAdjustStock}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                  >
                    Valider
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
