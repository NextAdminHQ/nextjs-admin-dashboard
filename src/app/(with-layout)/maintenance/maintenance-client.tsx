"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";

type MaintenanceTask = {
  id: number;
  zone: string;
  categorie: string;
  assigned?: string;
  status: "pending" | "in_progress" | "done";
};

const INITIAL_TASKS: MaintenanceTask[] = [
  { id: 1, zone: "Chambre 101", categorie: "Plomberie", assigned: "Amina", status: "pending" },
  { id: 2, zone: "Couloir étage 2", categorie: "Éclairage", assigned: "Ibrahim", status: "in_progress" },
  { id: 3, zone: "Cuisine", categorie: "Équipements", assigned: "Kofi", status: "done" },
];

export default function MaintenanceClient() {
  const router = useRouter();
  const [tasks, setTasks] = useState<MaintenanceTask[]>(() => {
    try {
      const raw = localStorage.getItem("maintenance_tasks");
      return raw ? (JSON.parse(raw) as MaintenanceTask[]) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });
  const [filter, setFilter] = useState<"all" | MaintenanceTask["status"]>("all");

  useEffect(() => {
    try {
      localStorage.setItem("maintenance_tasks", JSON.stringify(tasks));
    } catch {
      // ignore storage errors
    }
  }, [tasks]);

  const toggleStatus = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "done" ? "pending" : task.status === "pending" ? "in_progress" : "done",
            }
          : task,
      ),
    );
  };

  const filtered = tasks.filter((task) => (filter === "all" ? true : task.status === filter));

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-dark dark:text-white">Maintenance</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">Suivi des interventions et des points de maintenance.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="rounded-[8px] border border-stroke bg-white px-3 py-2 text-sm"
          >
            <option value="all">Tous</option>
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="done">Terminés</option>
          </select>
          <Button label="Nouvelle tâche" variant="primary" size="small" onClick={() => router.push("/maintenance/new")} />
        </div>
      </div>

      <section className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-dark dark:text-white">Tâches de maintenance</h2>
              <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">Liste des interventions programmées et en cours.</p>
            </div>
            <p className="text-sm text-dark-4 dark:text-dark-6">{filtered.length} tâche(s) affichée(s)</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full table-auto text-left">
            <thead>
              <tr className="border-b border-stroke bg-gray-1 text-xs uppercase tracking-wide text-dark-4 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6">
                {["ID", "Zone", "Catégorie", "Assigné", "Statut", "Actions"].map((heading) => (
                  <th key={heading} className="px-4 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.id} className="border-b border-stroke transition-colors hover:bg-gray-1 dark:border-dark-3 dark:hover:bg-dark-2">
                  <td className="px-4 py-3 text-sm font-semibold text-dark dark:text-white">#{task.id}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{task.zone}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{task.categorie}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{task.assigned ?? "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        task.status === "done"
                          ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : task.status === "in_progress"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "border-gray-300 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      label={task.status === "done" ? "Réouvrir" : task.status === "pending" ? "Démarrer" : "Terminer"}
                      variant="outlinePrimary"
                      size="small"
                      onClick={() => toggleStatus(task.id)}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-dark-4 dark:text-dark-6">
                    Aucune tâche trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
