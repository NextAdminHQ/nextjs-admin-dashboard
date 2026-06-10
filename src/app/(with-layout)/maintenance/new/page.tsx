"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { FormEvent } from "react";

export default function NewMaintenanceTaskPage() {
  const router = useRouter();
  const [zone, setZone] = useState("");
  const [categorie, setCategorie] = useState("");
  const [assigned, setAssigned] = useState("");
  const [status, setStatus] = useState<"pending" | "in_progress" | "done">("pending");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      const raw = localStorage.getItem("maintenance_tasks");
      const tasks = raw ? (JSON.parse(raw) as any[]) : [];
      const nextId = tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
      const newTask = {
        id: nextId,
        zone: zone || "Nouveau point",
        categorie: categorie || "Maintenance",
        assigned: assigned || "",
        status,
      };
      tasks.push(newTask);
      localStorage.setItem("maintenance_tasks", JSON.stringify(tasks));
      router.push("/maintenance");
    } catch {
      router.push("/maintenance");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Nouvelle tâche Maintenance" />
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-dark dark:text-white">Créer une tâche de maintenance</h1>
        <p className="text-sm text-dark-4 dark:text-dark-6">Complétez les informations pour ajouter une nouvelle intervention.</p>
      </div>

      <section className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-dark dark:text-white">
            Zone
            <input
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white"
              placeholder="Ex. Chambre 101"
            />
          </label>

          <label className="block text-sm text-dark dark:text-white">
            Catégorie
            <input
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white"
              placeholder="Ex. Plomberie"
            />
          </label>

          <label className="block text-sm text-dark dark:text-white">
            Assigné à
            <input
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
              className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white"
              placeholder="Nom du technicien"
            />
          </label>

          <label className="block text-sm text-dark dark:text-white">
            Statut
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white"
            >
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="done">Terminée</option>
            </select>
          </label>

          <div className="sm:col-span-2 mt-4 flex flex-wrap gap-3">
            <Button label="Enregistrer" variant="primary" size="small" type="submit" />
            <Button label="Annuler" variant="outlineDark" size="small" onClick={() => router.push("/maintenance")} />
          </div>
        </form>
      </section>
    </>
  );
}
