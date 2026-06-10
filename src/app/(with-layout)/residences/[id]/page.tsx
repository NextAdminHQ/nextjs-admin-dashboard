import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ArrowLeftIcon, EmailIcon } from "@/assets/icons";
import {
  RESIDENCES_MOCKUP,
  STATUT_CHAMBRE_LABEL,
  STATUT_CHAMBRE_STYLE,
  TYPE_CHAMBRE_LABEL,
  TYPE_RESIDENCE_LABEL,
} from "@/data/mockup";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const r = RESIDENCES_MOCKUP.find((r) => r.id === Number(id));
  return { title: r?.nom ?? "Résidence" };
}

export default async function ResidenceDetailPage({ params }: Props) {
  const { id } = await params;
  const r = RESIDENCES_MOCKUP.find((r) => r.id === Number(id));
  if (!r) notFound();

  const disponible  = r.chambres.filter((c) => c.statut === "disponible").length;
  const occupee     = r.chambres.filter((c) => c.statut === "occupee").length;
  const reservee    = r.chambres.filter((c) => c.statut === "reservee").length;
  const nettoyage   = r.chambres.filter((c) => c.statut === "nettoyage").length;
  const maintenance = r.chambres.filter((c) => c.statut === "maintenance").length;

  return (
    <>
      <Breadcrumb pageName={r.nom} />

      <div className="mb-4">
        <Link
          href="/residences"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          <ArrowLeftIcon className="size-4" />
          Retour aux résidences
        </Link>
      </div>

      {/* Header établissement */}
      <div className="mb-6 rounded-[10px] bg-gradient-to-r from-primary to-indigo-500 p-6 text-white shadow-1">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">
                {TYPE_RESIDENCE_LABEL[r.type]}
              </span>
              <span className="flex gap-0.5 text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < r.etoiles ? "text-yellow-300" : "text-white/30"}>★</span>
                ))}
              </span>
            </div>
            <h1 className="text-2xl font-bold">{r.nom}</h1>
            <div className="mt-4 space-y-2 text-sm opacity-80">
              <div>
                <span className="font-medium">Adresse :</span>{' '}
                <span>{r.adresse}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">Contact :</span>
                <span>{r.telephone}</span>
                <span className="inline-flex items-center gap-2 text-white/80">
                  <EmailIcon className="size-4" />
                  <span>{r.email}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Revenu ce mois</p>
            <p className="text-2xl font-bold">{r.revenuMois.toLocaleString("fr-FR")} FCFA</p>
            <p className="mt-1 text-sm opacity-80">Taux d&apos;occupation : {r.tauxOccupation}%</p>
          </div>
        </div>
        <p className="mt-4 text-sm opacity-90">{r.description}</p>
      </div>

      {/* Stats logements */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="Disponible"    value={disponible}  className="border-l-4 border-green-500" />
        <StatCard label="Occupée"       value={occupee}     className="border-l-4 border-red-500" />
        <StatCard label="Réservée"      value={reservee}    className="border-l-4 border-blue-500" />
        <StatCard label="Nettoyage"     value={nettoyage}   className="border-l-4 border-yellow-500" />
        <StatCard label="Maintenance"   value={maintenance} className="border-l-4 border-orange-500" />
      </div>

      {/* Barre occupation */}
      <div className="mb-6 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-dark dark:text-white">Occupation globale</span>
          <span className="text-dark-4 dark:text-dark-6">{r.chambres.length} logements au total</span>
        </div>
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          <div className="bg-red-500 transition-all"    style={{ width: `${(occupee / r.chambres.length) * 100}%` }} title="Occupée" />
          <div className="bg-blue-500 transition-all"   style={{ width: `${(reservee / r.chambres.length) * 100}%` }} title="Réservée" />
          <div className="bg-yellow-500 transition-all" style={{ width: `${(nettoyage / r.chambres.length) * 100}%` }} title="Nettoyage" />
          <div className="bg-orange-500 transition-all" style={{ width: `${(maintenance / r.chambres.length) * 100}%` }} title="Maintenance" />
          <div className="flex-1 bg-green-500" title="Disponible" />
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-dark-4 dark:text-dark-6">
          {[
            { label: "Occupée",     color: "bg-red-500" },
            { label: "Réservée",    color: "bg-blue-500" },
            { label: "Nettoyage",   color: "bg-yellow-500" },
            { label: "Maintenance", color: "bg-orange-500" },
            { label: "Disponible",  color: "bg-green-500" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1">
              <span className={cn("inline-block size-2.5 rounded-sm", l.color)} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Liste logements */}
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-dark-3">
          <h2 className="text-base font-semibold text-dark dark:text-white">
            Logements ({r.chambres.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke bg-gray-1 dark:border-dark-3 dark:bg-dark-2">
                {["Numéro", "Type", "Étage", "Capacité", "Prix / nuit", "Équipements", "Statut"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-dark-4 dark:text-dark-6">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {r.chambres.map((c, i) => (
                <tr
                  key={c.id}
                  className={cn(
                    "border-b border-stroke transition-colors hover:bg-gray-1 dark:border-dark-3 dark:hover:bg-dark-2",
                    i === r.chambres.length - 1 && "border-b-0",
                  )}
                >
                  <td className="px-4 py-3 font-semibold text-dark dark:text-white">{c.numero}</td>
                  <td className="px-4 py-3 text-sm text-dark dark:text-white">{TYPE_CHAMBRE_LABEL[c.type]}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">
                    {c.etage === 0 ? "RDC" : `Étage ${c.etage}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{c.capacite} pers.</td>
                  <td className="px-4 py-3 text-sm font-medium text-dark dark:text-white">
                    {c.prixNuit.toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.equipements.map((e) => (
                        <span key={e} className="rounded bg-gray-2 px-1.5 py-0.5 text-[10px] text-dark-4 dark:bg-dark-3 dark:text-dark-6">
                          {e}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", STATUT_CHAMBRE_STYLE[c.statut])}>
                      {STATUT_CHAMBRE_LABEL[c.statut]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <div className={cn("rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card", className)}>
      <p className="text-2xl font-bold text-dark dark:text-white">{value}</p>
      <p className="text-xs text-dark-4 dark:text-dark-6">{label}</p>
    </div>
  );
}
