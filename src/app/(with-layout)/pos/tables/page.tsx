"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import type { Table, TableStatus } from "@/types/pos";
import { tableService } from "@/services/pos.service";

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState("");
  const [newTableStatus, setNewTableStatus] = useState<TableStatus>("free");

  useEffect(() => {
    const loadTables = async () => {
      try {
        const data = await tableService.getTables();
        setTables(data);
      } catch (error) {
        console.error("Erreur lors du chargement des tables:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTables();
  }, []);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
  };

  const handleTableToggle = (tableId: string) => {
    setSelectedTables((prev) =>
      prev.includes(tableId) ? prev.filter((id) => id !== tableId) : [...prev, tableId]
    );
  };

  const handleMergeTables = async () => {
    if (selectedTables.length < 2) {
      alert("Sélectionnez au moins 2 tables");
      return;
    }

    try {
      await tableService.mergeTables(selectedTables);
      setShowMergeModal(false);
      setSelectedTables([]);
      // Reload tables
      const data = await tableService.getTables();
      setTables(data);
    } catch (error) {
      console.error("Erreur lors de la fusion:", error);
    }
  };


  const handleAddTable = async () => {
    const number = Number(newTableNumber);
    const capacity = Number(newTableCapacity);

    if (!number || !capacity) {
      alert("Entrez un numéro et une capacité valides");
      return;
    }

    try {
      const createdTable = await tableService.createTable({
        number,
        capacity,
        status: newTableStatus,
      });
      setTables((prev) => [...prev, createdTable]);
      setShowAddModal(false);
      setNewTableNumber("");
      setNewTableCapacity("");
      setNewTableStatus("free");
    } catch (error) {
      console.error("Erreur lors de la création de la table:", error);
    }
  };

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case "free":
        return "bg-green-100 border-green-300 text-green-800";
      case "occupied":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "waiting_payment":
        return "bg-orange-100 border-orange-300 text-orange-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "free":
        return "Libre";
      case "occupied":
        return "Occupée";
      case "waiting_payment":
        return "En attente";
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
      <Breadcrumb pageName="Gestion des tables" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Plan de salle */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                Plan de salle
              </h3>
              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
                >
                  Ajouter une table
                </button>
                <button
                  onClick={() => setShowMergeModal(true)}
                  disabled={selectedTables.length < 2}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Fusionner ({selectedTables.length})
                </button>
              </div>
            </div>

            {/* Grille des tables */}
            <div className="grid grid-cols-3 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  onClick={() => handleTableClick(table)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition relative ${
                    selectedTable?.id === table.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : getTableStatusColor(table.status)
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTables.includes(table.id)}
                    onChange={() => handleTableToggle(table.id)}
                    className="absolute top-2 right-2 w-4 h-4 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="text-center">
                    <p className="text-2xl font-bold">T{table.number}</p>
                    <p className="text-xs font-semibold mt-1">
                      {getStatusLabel(table.status)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Cap: {table.capacity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détails de la table */}
        {selectedTable && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Table {selectedTable.number}
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </p>
                <p className="text-sm font-semibold text-dark dark:text-white">
                  {getStatusLabel(selectedTable.status)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Capacité
                </p>
                <p className="text-sm font-semibold text-dark dark:text-white">
                  {selectedTable.capacity} places
                </p>
              </div>

              {selectedTable.status === "occupied" && selectedTable.currentOrderId && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Commande en cours
                  </p>
                  <button className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                    Voir la commande
                  </button>
                </div>
              )}

              <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-600">
                <button className="w-full py-2 bg-gray-100 dark:bg-gray-700 text-dark dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  Transférer
                </button>
                <button className="w-full py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition">
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de fusion */}
      {showMergeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-dark rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Fusionner les tables
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Vous êtes sur le point de fusionner {selectedTables.length} tables. Continuez?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowMergeModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleMergeTables}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
              >
                Fusionner
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-dark rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Ajouter une nouvelle table
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Numéro de table
                </label>
                <input
                  type="number"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacité
                </label>
                <input
                  type="number"
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Statut
                </label>
                <select
                  value={newTableStatus}
                  onChange={(e) => setNewTableStatus(e.target.value as TableStatus)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="free">Libre</option>
                  <option value="occupied">Occupée</option>
                  <option value="waiting_payment">En attente</option>
                  <option value="reserved">Réservée</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleAddTable}
                className="flex-1 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
