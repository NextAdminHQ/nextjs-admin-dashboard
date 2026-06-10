import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nouvelle résidence",
};

export default function NewResidencePage() {
  return (
    <>
      <Breadcrumb pageName="Nouvelle résidence" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-dark dark:text-white">Créer une résidence</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">Ajoutez un nouvel établissement à la plateforme.</p>
        </div>
        <Link href="/residences" className="inline-flex rounded-[5px] border border-dark px-4 py-2 text-sm font-medium text-dark hover:bg-dark/5 dark:border-white/25 dark:text-white">
          Retour aux résidences
        </Link>
      </div>

      <section className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <form className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-dark dark:text-white">
            Nom
            <input className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="nom" placeholder="Nom de la résidence" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Adresse
            <input className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="adresse" placeholder="Adresse complète" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Type
            <input className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="type" placeholder="Hôtel, Appartement..." />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Étoiles
            <input type="number" className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="etoiles" placeholder="4" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Revenu mensuel
            <input type="number" className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="revenuMois" placeholder="2500000" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Taux occupation
            <input type="number" className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="tauxOccupation" placeholder="75" />
          </label>
        </form>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="inline-flex items-center justify-center rounded-[5px] bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary/90">
            Enregistrer
          </button>
          <Link href="/residences" className="inline-flex items-center justify-center rounded-[5px] border border-dark px-5 py-3 text-sm font-medium text-dark hover:bg-dark/5 dark:border-white/25 dark:text-white">
            Annuler
          </Link>
        </div>
      </section>
    </>
  );
}
