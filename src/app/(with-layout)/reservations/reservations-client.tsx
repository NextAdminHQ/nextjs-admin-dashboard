"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { cn } from "@/lib/utils";
import { PAIEMENT_LABEL, RESERVATIONS_MOCKUP, type Reservation, type StatutReservation } from "@/data/mockup";

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


export default function ReservationsClient() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>(RESERVATIONS_MOCKUP);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handleStatusUpdate = (id: number, nextStatus: StatutReservation) => {
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === id ? { ...reservation, statut: nextStatus } : reservation,
      ),
    );

    setSelectedReservation((current) =>
      current?.id === id ? { ...current, statut: nextStatus } : current,
    );
  };

  const totalReservations = reservations.length;
  const totalConfirmed = reservations.filter((r) => r.statut === "confirmee").length;
  const totalPending = reservations.filter((r) => r.statut === "attente").length;
  const totalCheckin = reservations.filter((r) => r.statut === "checkin").length;
  const totalCheckout = reservations.filter((r) => r.statut === "checkout").length;

  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard label="Total réservations" value={totalReservations.toString()} color="text-primary" />
        <SummaryCard label="Confirmées" value={totalConfirmed.toString()} color="text-green-600" />
        <SummaryCard label="En attente" value={totalPending.toString()} color="text-yellow-600" />
        <SummaryCard label="Check-in" value={totalCheckin.toString()} color="text-blue-600" />
        <SummaryCard label="Check-out" value={totalCheckout.toString()} color="text-gray-600" />
      </div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-dark dark:text-white">Gestion des réservations</h3>
          <p className="text-sm text-dark-4 dark:text-dark-6">Créer et suivre facilement les réservations.</p>
        </div>
        <Button
          label="Nouvelle réservation"
          variant="primary"
          size="small"
          type="button"
          onClick={() => router.push("/reservations/new")}
        />
      </div>

      <section className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
          <h2 className="text-base font-semibold text-dark dark:text-white">Liste des réservations</h2>
          <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">
            Toutes les réservations enregistrées, leur statut et mode de paiement.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full table-auto text-left">
            <thead>
              <tr className="border-b border-stroke bg-gray-1 text-xs uppercase tracking-wide text-dark-4 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6">
                {[
                  "ID",
                  "Client",
                  "Téléphone",
                  "Chambre",
                  "Établissement",
                  "Arrivée",
                  "Départ",
                  "Montant",
                  "Paiement",
                  "Statut",
                ].map((heading) => (
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
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.telephone}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.chambre}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.etablissement}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.debut}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.fin}</td>
                  <td className="px-4 py-3 text-sm font-medium text-dark dark:text-white">{reservation.montant.toLocaleString("fr-FR")} {reservation.devise}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{PAIEMENT_LABEL[reservation.paiement]}</td>
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

      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-[20px] bg-white p-6 shadow-xl dark:bg-gray-dark">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white">Détails de la réservation</h3>
                <p className="text-sm text-dark-4 dark:text-dark-6">RES-{String(selectedReservation.id).padStart(3, "0")}</p>
              </div>
              <Button
                label="Fermer"
                variant="outlineDark"
                size="small"
                onClick={() => setSelectedReservation(null)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailRow label="Client" value={selectedReservation.client} />
              <DetailRow label="Téléphone" value={selectedReservation.telephone} />
              <DetailRow label="Chambre" value={selectedReservation.chambre} />
              <DetailRow label="Établissement" value={selectedReservation.etablissement} />
              <DetailRow label="Arrivée" value={selectedReservation.debut} />
              <DetailRow label="Départ" value={selectedReservation.fin} />
              <DetailRow label="Montant" value={`${selectedReservation.montant.toLocaleString("fr-FR")} ${selectedReservation.devise}`} />
              <DetailRow label="Paiement" value={PAIEMENT_LABEL[selectedReservation.paiement]} />
              <div className="rounded-[10px] bg-gray-1 p-4 dark:bg-dark-2">
                <p className="text-sm text-dark-4 dark:text-dark-6">Statut</p>
                <span className={cn("mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-medium", STATUT_STYLE[selectedReservation.statut])}>
                  {STATUT_LABEL[selectedReservation.statut]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] bg-gray-1 p-4 dark:bg-dark-2">
      <p className="text-xs text-dark-4 dark:text-dark-6">{label}</p>
      <p className="mt-1 text-sm font-medium text-dark dark:text-white">{value}</p>
    </div>
  );
}
