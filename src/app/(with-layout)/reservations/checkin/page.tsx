import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { cn } from "@/lib/utils";
import { RESERVATIONS_MOCKUP, type Reservation, type StatutReservation } from "@/data/mockup";
import type { Metadata } from "next";

const STATUT_LABEL: Record<StatutReservation, string> = {
  confirmee: "Confirmée",
  attente: "En attente",
  annulee: "Annulée",
  checkin: "Check-in",
  checkout: "Check-out",
};

const STATUT_STYLE: Record<StatutReservation, string> = {
  confirmee: "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  attente: "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  annulee: "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  checkin: "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  checkout: "border-gray-500 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export const metadata: Metadata = {
  title: "Check-in",
};

export default function CheckInPage() {
  const reservations = RESERVATIONS_MOCKUP.filter((reservation) => reservation.statut === "checkin");

  return (
    <>
      <Breadcrumb pageName="Check-in" />
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-dark dark:text-white">Réservations en check-in</h1>
        <p className="mt-2 text-sm text-dark-4 dark:text-dark-6">
          Liste des réservations actuellement en cours de séjour.
        </p>
      </div>

      <section className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
          <h2 className="text-base font-semibold text-dark dark:text-white">Check-ins actifs</h2>
          <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">{reservations.length} réservation(s) en check-in.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full table-auto text-left">
            <thead>
              <tr className="border-b border-stroke bg-gray-1 text-xs uppercase tracking-wide text-dark-4 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6">
                {["ID", "Client", "Chambre", "Arrivée", "Départ", "Caution", "Statut"].map((heading) => (
                  <th key={heading} className="px-4 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-b border-stroke transition-colors hover:bg-gray-1 dark:border-dark-3 dark:hover:bg-dark-2"
                >
                  <td className="px-4 py-3 text-sm font-semibold text-dark dark:text-white">RES-{String(reservation.id).padStart(3, "0")}</td>
                  <td className="px-4 py-3 text-sm text-dark dark:text-white">{reservation.client}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.chambre}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.debut}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.fin}</td>
                  <td className="px-4 py-3 text-sm font-medium text-dark dark:text-white">{reservation.caution ? `${reservation.caution.toLocaleString('fr-FR')} ${reservation.devise}` : '-'}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", STATUT_STYLE[reservation.statut])}>
                      {STATUT_LABEL[reservation.statut]}
                    </span>
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
