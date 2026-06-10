import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/components/ui-elements/button";
import { RESIDENCES_MOCKUP, STATUT_CHAMBRE_LABEL, TYPE_RESIDENCE_LABEL } from "@/data/mockup";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Résidences" };

export default function ResidencesPage() {
  const totalChambres   = RESIDENCES_MOCKUP.reduce((s, r) => s + r.chambres.length, 0);
  const totalDisponible = RESIDENCES_MOCKUP.reduce((s, r) => s + r.chambres.filter((c) => c.statut === "disponible").length, 0);
  const revenuTotal     = RESIDENCES_MOCKUP.reduce((s, r) => s + r.revenuMois, 0);
  const tauxMoyen       = Math.round(RESIDENCES_MOCKUP.reduce((s, r) => s + r.tauxOccupation, 0) / RESIDENCES_MOCKUP.length);

  return (
    <>
      <Breadcrumb pageName="Résidences" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-dark dark:text-white">Résidences</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">Gestion des établissements et de leurs chambres.</p>
        </div>
        <Link href="/residences/new">
          <Button label="Nouvelle résidence" variant="primary" size="small" type="button" />
        </Link>
      </div>

      {/* Stats globales */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Établissements"  value={RESIDENCES_MOCKUP.length.toString()} color="bg-primary" />
        <StatCard label="Total logements" value={totalChambres.toString()}            color="bg-blue-500" />
        <StatCard label="Disponibles"     value={totalDisponible.toString()}          color="bg-green-500" />
        <StatCard label="Taux occupation" value={`${tauxMoyen}%`}                    color="bg-orange-500" />
      </div>

      {/* Revenus */}
      <div className="mb-6 rounded-[10px] bg-white px-6 py-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <p className="text-sm text-dark-4 dark:text-dark-6">Revenus total ce mois</p>
        <p className="text-2xl font-bold text-dark dark:text-white">
          {revenuTotal.toLocaleString("fr-FR")} FCFA
        </p>
      </div>

      {/* Liste résidences */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
        {RESIDENCES_MOCKUP.map((r) => {
          const disponible  = r.chambres.filter((c) => c.statut === "disponible").length;
          const occupee     = r.chambres.filter((c) => c.statut === "occupee").length;
          const reservee    = r.chambres.filter((c) => c.statut === "reservee").length;
          const autre       = r.chambres.length - disponible - occupee - reservee;

          return (
            <Link
              key={r.id}
              href={`/residences/${r.id}`}
              className="group block rounded-[10px] bg-white shadow-1 transition hover:shadow-md dark:bg-gray-dark dark:shadow-card"
            >
              {/* Header carte */}
              <div className="flex items-start justify-between rounded-t-[10px] bg-gradient-to-r from-primary to-indigo-500 p-5 text-white">
                <div>
                  <h3 className="text-base font-semibold">{r.nom}</h3>
                  <p className="mt-0.5 text-sm opacity-80">{r.adresse}</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium">
                    {TYPE_RESIDENCE_LABEL[r.type]}
                  </span>
                  <div className="mt-1.5 flex justify-end gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={cn("text-xs", i < r.etoiles ? "text-yellow-300" : "text-white/30")}>★</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* Taux d'occupation */}
                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-dark-4 dark:text-dark-6">Taux d&apos;occupation</span>
                    <span className="font-semibold text-dark dark:text-white">{r.tauxOccupation}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-2 dark:bg-dark-2">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${r.tauxOccupation}%` }}
                    />
                  </div>
                </div>

                {/* Stats logements */}
                <div className="mb-4 grid grid-cols-4 gap-2 text-center text-xs">
                  <MiniStat label="Disponible" value={disponible} color="text-green-600 dark:text-green-400" />
                  <MiniStat label="Occupée"    value={occupee}    color="text-red-600 dark:text-red-400" />
                  <MiniStat label="Réservée"   value={reservee}   color="text-blue-600 dark:text-blue-400" />
                  <MiniStat label="Autre"      value={autre}      color="text-orange-600 dark:text-orange-400" />
                </div>

                {/* Pied */}
                <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
                  <div>
                    <p className="text-xs text-dark-4 dark:text-dark-6">Revenu ce mois</p>
                    <p className="text-sm font-semibold text-dark dark:text-white">
                      {r.revenuMois.toLocaleString("fr-FR")} FCFA
                    </p>
                  </div>
                  <span className="text-xs font-medium text-primary group-hover:underline">
                    Voir détails →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className={cn("mb-2 inline-flex size-9 items-center justify-center rounded-full text-white text-sm font-bold", color)}>
        {value.replace(/[^0-9%]/g, "").slice(0, 3) || "#"}
      </div>
      <p className="text-xl font-bold text-dark dark:text-white">{value}</p>
      <p className="text-xs text-dark-4 dark:text-dark-6">{label}</p>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-lg bg-gray-1 p-2 dark:bg-dark-2">
      <p className={cn("text-base font-bold", color)}>{value}</p>
      <p className="text-dark-4 dark:text-dark-6">{label}</p>
    </div>
  );
}
