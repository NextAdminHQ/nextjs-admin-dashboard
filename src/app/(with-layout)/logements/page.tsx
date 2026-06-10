import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/components/ui-elements/button";
import { cn } from "@/lib/utils";
import { RESIDENCES_MOCKUP, STATUT_CHAMBRE_STYLE, STATUT_CHAMBRE_LABEL, TYPE_CHAMBRE_LABEL } from "@/data/mockup";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logements",
};

const logements = RESIDENCES_MOCKUP.flatMap((residence) =>
  residence.chambres.map((chambre) => ({
    ...chambre,
    residenceId: residence.id,
    residenceName: residence.nom,
    residenceType: residence.type,
  })),
);

const totalLogements = logements.length;
const totalDisponible = logements.filter((ch) => ch.statut === "disponible").length;
const totalOccupee = logements.filter((ch) => ch.statut === "occupee").length;
const totalReservee = logements.filter((ch) => ch.statut === "reservee").length;
const totalNettoyage = logements.filter((ch) => ch.statut === "nettoyage").length;
const totalMaintenance = logements.filter((ch) => ch.statut === "maintenance").length;

export default function LogementsPage() {
  return (
    <>
      <Breadcrumb pageName="Logements" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-dark dark:text-white">Logements</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">Toutes les chambres et logements disponibles.</p>
        </div>
        <Link href="/logements/new">
          <Button label="Nouveau logement" variant="primary" size="small" type="button" />
        </Link>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard label="Total logements" value={totalLogements.toString()} color="bg-primary text-white" />
        <SummaryCard label="Disponibles" value={totalDisponible.toString()} color="bg-green-600 text-white" />
        <SummaryCard label="Occupés" value={totalOccupee.toString()} color="bg-red-600 text-white" />
        <SummaryCard label="Réservés" value={totalReservee.toString()} color="bg-blue-600 text-white" />
        <SummaryCard label="En nettoyage" value={totalNettoyage.toString()} color="bg-yellow-500 text-black" />
        <SummaryCard label="En maintenance" value={totalMaintenance.toString()} color="bg-orange-500 text-black" />
      </div>

      <section className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
          <h2 className="text-base font-semibold text-dark dark:text-white">Liste des logements</h2>
          <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">
            Toutes les chambres et logements disponibles dans les établissements.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-stroke bg-gray-1 text-xs uppercase tracking-wide text-dark-4 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6">
                {[
                  "N°",
                  "Type",
                  "Étage",
                  "Capacité",
                  "Prix / nuit",
                  "Résidence",
                  "Statut",
                  "Équipements",
                  "Actions",
                ].map((heading) => (
                  <th key={heading} className="px-4 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logements.map((logement, index) => (
                <tr
                  key={`${logement.residenceId}-${logement.id}`}
                  className={cn(
                    "border-b border-stroke transition-colors hover:bg-gray-1 dark:border-dark-3 dark:hover:bg-dark-2",
                    index === logements.length - 1 && "border-b-0",
                  )}
                >
                  <td className="px-4 py-3 text-sm font-semibold text-dark dark:text-white">{logement.numero}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{TYPE_CHAMBRE_LABEL[logement.type]}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{logement.etage === 0 ? "RDC" : `Étage ${logement.etage}`}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{logement.capacite} pers.</td>
                  <td className="px-4 py-3 text-sm font-medium text-dark dark:text-white">{logement.prixNuit.toLocaleString("fr-FR")} FCFA</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{logement.residenceName}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", STATUT_CHAMBRE_STYLE[logement.statut])}>
                      {STATUT_CHAMBRE_LABEL[logement.statut]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {logement.equipements.map((equipement) => (
                        <span
                          key={equipement}
                          className="rounded bg-gray-2 px-1.5 py-0.5 text-[10px] text-dark-4 dark:bg-dark-3 dark:text-dark-6"
                        >
                          {equipement}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/residences/${logement.residenceId}`}
                      className="text-sm font-medium text-primary transition hover:underline"
                    >
                      Voir résidence
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <p className="text-sm font-medium text-dark-4 dark:text-dark-6">{label}</p>
      <p className={cn("mt-3 text-3xl font-bold", color)}>{value}</p>
    </div>
  );
}
