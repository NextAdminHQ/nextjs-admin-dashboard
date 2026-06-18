import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function PosReportsPaymentsPage() {
  return (
    <>
      <Breadcrumb pageName="Rapports paiements" />
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
        <h3 className="text-lg font-semibold text-dark dark:text-white">Paiements</h3>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Analysez la répartition des paiements mobile money, carte, cash et chambre.
        </p>
      </div>
    </>
  );
}
