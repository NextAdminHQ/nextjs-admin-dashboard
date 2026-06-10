"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";

type Task = { id: number; chambre: string; type: string; assigned?: string; status: "pending" | "in_progress" | "done" };

const INITIAL_TASKS: Task[] = [
  { id: 1, chambre: "Chambre 101", type: "Nettoyage", assigned: "Amina", status: "pending" },
  { id: 2, chambre: "Chambre 202", type: "Linge", assigned: "Ibrahim", status: "in_progress" },
  { id: 3, chambre: "Appartement 301", type: "Réapprovisionnement", assigned: "Kofi", status: "done" },
];

export default function HousekeepingClient() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem("housekeeping_tasks");
      return raw ? (JSON.parse(raw) as Task[]) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });
  const [filter, setFilter] = useState<"all" | Task["status"]>("all");

  useEffect(() => {
    try {
      localStorage.setItem("housekeeping_tasks", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const toggleDone = (id: number) => {
    setTasks((current) =>
      current.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "pending" : "done" } : t)),
    );
  };

  const filtered = tasks.filter((t) => (filter === "all" ? true : t.status === filter));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-dark dark:text-white">Housekeeping</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">Suivi des tâches de ménage et maintenance légère.</p>
        </div>
        <div className="flex gap-2">
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
          <Button label="Nouvelle tâche" variant="primary" size="small" onClick={() => router.push('/housekeeping/new')} />
        </div>
      </div>

      <section className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full table-auto text-left">
            <thead>
              <tr className="border-b border-stroke bg-gray-1 text-xs uppercase tracking-wide text-dark-4 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6">
                {["ID", "Chambre", "Type", "Assigné", "Statut", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-stroke hover:bg-gray-1 dark:border-dark-3 dark:hover:bg-dark-2">
                  <td className="px-4 py-3 text-sm font-semibold text-dark dark:text-white">#{t.id}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{t.chambre}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{t.type}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{t.assigned ?? '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      t.status === 'done' ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      t.status === 'in_progress' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'border-gray-300 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button label={t.status === 'done' ? 'Réouvrir' : 'Marquer terminé'} variant="outlinePrimary" size="small" onClick={() => toggleDone(t.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-dark-4 dark:text-dark-6">Pas de tâches</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}