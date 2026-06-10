"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function NewHousekeepingTaskPage() {
  const router = useRouter();
  const [chambre, setChambre] = useState("");
  const [type, setType] = useState("");
  const [assigned, setAssigned] = useState("");
  const [status, setStatus] = useState<"pending" | "in_progress" | "done">("pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const raw = localStorage.getItem("housekeeping_tasks");
      const tasks = raw ? (JSON.parse(raw) as any[]) : [];
      const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      const newTask = { id: nextId, chambre: chambre || "Nouveau", type: type || "Tâche", assigned: assigned || "", status };
      tasks.push(newTask);
      localStorage.setItem("housekeeping_tasks", JSON.stringify(tasks));
      router.push("/housekeeping");
    } catch (err) {
      router.push("/housekeeping");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Nouvelle tâche Housekeeping" />
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-dark dark:text-white">Créer une tâche</h1>
        <p className="text-sm text-dark-4 dark:text-dark-6">Remplissez le formulaire puis enregistrez.</p>
      </div>

      <section className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-dark dark:text-white">
            Chambre
            <input value={chambre} onChange={(e) => setChambre(e.target.value)} className="mt-2 block w-full rounded-[10px] border border-stroke px-4 py-3 text-sm" />
          </label>

          <label className="block text-sm text-dark dark:text-white">
            Type
            <input value={type} onChange={(e) => setType(e.target.value)} className="mt-2 block w-full rounded-[10px] border border-stroke px-4 py-3 text-sm" />
          </label>

          <label className="block text-sm text-dark dark:text-white">
            Assigné à
            <input value={assigned} onChange={(e) => setAssigned(e.target.value)} className="mt-2 block w-full rounded-[10px] border border-stroke px-4 py-3 text-sm" />
          </label>

          <label className="block text-sm text-dark dark:text-white">
            Statut
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="mt-2 block w-full rounded-[10px] border border-stroke px-4 py-3 text-sm">
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="done">Terminée</option>
            </select>
          </label>

          <div className="sm:col-span-2 mt-4 flex gap-3">
            <Button label="Enregistrer" variant="primary" size="small" type="submit" />
            <Button label="Annuler" variant="outlineDark" size="small" onClick={() => router.push("/housekeeping")} />
          </div>
        </form>
      </section>
    </>
  );
}
