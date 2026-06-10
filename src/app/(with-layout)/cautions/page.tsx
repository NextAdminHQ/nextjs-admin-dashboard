import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RESERVATIONS_MOCKUP, type Reservation } from "@/data/mockup";
import type { Metadata } from "next";

const CAUTION_LABEL: Record<string, string> = {
  payee: "Payée",
  non_payee: "Non payée",
};

const CAUTION_STYLE: Record<string, string> = {
  payee: "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  non_payee: "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export const metadata: Metadata = {
  title: "Cautions",
};

export default function CautionsPage() {
  const cautions = RESERVATIONS_MOCKUP.filter((reservation) => (reservation.caution ?? 0) > 0);
  const totalCautions = cautions.length;
  const totalPaid = cautions.filter((reservation) => reservation.cautionStatut === "payee").length;
  const totalOutstanding = cautions.filter((reservation) => reservation.cautionStatut === "non_payee").length;
  const totalAmount = cautions.reduce((sum, reservation) => sum + (reservation.caution ?? 0), 0);

  return (
    <>
      <Breadcrumb pageName="Cautions" />
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-dark dark:text-white">Gestion des cautions</h1>
        <p className="mt-2 text-sm text-dark-4 dark:text-dark-6">
          Suivi des dépôts de garantie associés aux réservations.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total cautions" value={totalCautions.toString()} color="text-primary" />
        <SummaryCard label="Montant total" value={`${totalAmount.toLocaleString("fr-FR")} FCFA`} color="text-blue-600" />
        <SummaryCard label="Cautions payées" value={totalPaid.toString()} color="text-green-600" />
        <SummaryCard label="Cautions non payées" value={totalOutstanding.toString()} color="text-yellow-600" />
      </div>

      <section className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
          <h2 className="text-base font-semibold text-dark dark:text-white">Détails des cautions</h2>
          <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">
            Liste des réservations avec dépôt de garantie et leur statut de caution.
          </p>
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
              {cautions.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-b border-stroke transition-colors hover:bg-gray-1 dark:border-dark-3 dark:hover:bg-dark-2"
                >
                  <td className="px-4 py-3 text-sm font-semibold text-dark dark:text-white">RES-{String(reservation.id).padStart(3, "0")}</td>
                  <td className="px-4 py-3 text-sm text-dark dark:text-white">{reservation.client}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.chambre}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.debut}</td>
                  <td className="px-4 py-3 text-sm text-dark-4 dark:text-dark-6">{reservation.fin}</td>
                  <td className="px-4 py-3 text-sm font-medium text-dark dark:text-white">{reservation.caution?.toLocaleString("fr-FR")} {reservation.devise}</td>
                  <td className="px-4 py-3">
                    <span className={CAUTION_STYLE[reservation.cautionStatut ?? "non_payee"]}>
                      {CAUTION_LABEL[reservation.cautionStatut ?? "non_payee"]}
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

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-[20px] border border-stroke bg-white p-5 shadow-card dark:border-dark-3 dark:bg-dark">
      <p className="text-sm font-medium text-dark-4 dark:text-dark-6">{label}</p>
      <p className={`mt-3 text-xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}
