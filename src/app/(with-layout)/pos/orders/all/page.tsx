import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des Commandes | POS Restaurant",
};

export default function OrdersManagementPage() {
  return (
    <>
      <Breadcrumb pageName="Gestion des Commandes" />

      <div className="grid gap-6">
        {/* Filtres */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
          <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">Filtres</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <input type="text" placeholder="N° commande" className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
            <input type="date" className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option>Tous les statuts</option>
              <option>En cours</option>
              <option>Prête</option>
              <option>Servie</option>
              <option>Payée</option>
            </select>
            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option>Tous les serveurs</option>
              <option>Serveur 1</option>
              <option>Serveur 2</option>
            </select>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700">
              Filtrer
            </button>
          </div>
        </div>

        {/* Tableau des commandes */}
        <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm dark:border-gray-700 dark:bg-gray-dark">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    N° Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Table
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Serveur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-3 text-sm text-gray-900 dark:text-gray-100">CMD-{String(i + 1).padStart(5, "0")}</td>
                    <td className="px-6 py-3 text-sm text-gray-900 dark:text-gray-100">Table {i + 1}</td>
                    <td className="px-6 py-3 text-sm text-gray-900 dark:text-gray-100">Jean Dupont</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        i % 3 === 0 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                        i % 3 === 1 ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}>
                        {i % 3 === 0 ? "En cours" : i % 3 === 1 ? "Prête" : "Payée"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">25 000 F</td>
                    <td className="px-6 py-3 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Voir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
