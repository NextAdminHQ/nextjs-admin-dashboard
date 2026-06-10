import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nouvelle réservation",
};

export default function NewReservationPage() {
  return (
    <>
      <Breadcrumb pageName="Nouvelle réservation" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-dark dark:text-white">Créer une réservation</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">Remplissez les informations et validez sur la page de création.</p>
        </div>
        <Link href="/reservations" className="inline-flex">
          <Button label="Retour aux réservations" variant="outlineDark" size="small" type="button" />
        </Link>
      </div>

      <section className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <form className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-dark dark:text-white">
            Client
            <input className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="client" placeholder="Nom du client" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Téléphone
            <input className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="telephone" placeholder="+228 90 00 00 00" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Chambre
            <input className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="chambre" placeholder="Ex. Chambre 101" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Établissement
            <input className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="etablissement" placeholder="Nom de la résidence" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Arrivée
            <input type="date" className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="debut" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Départ
            <input type="date" className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="fin" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Montant
            <input type="number" className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="montant" placeholder="10000" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Caution
            <input type="number" className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="caution" placeholder="20000" />
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Statut caution
            <select className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="cautionStatut">
              <option value="payee">Payée</option>
              <option value="non_payee">Non payée</option>
            </select>
          </label>
          <label className="block text-sm text-dark dark:text-white">
            Paiement
            <input className="mt-2 block w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-dark-3 dark:bg-dark dark:text-white" name="paiement" placeholder="Orange Money" />
          </label>
        </form>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button label="Enregistrer" variant="primary" size="small" type="button" />
          <Link href="/reservations" className="inline-flex">
            <Button label="Annuler" variant="outlineDark" size="small" type="button" />
          </Link>
        </div>
      </section>
    </>
  );
}
