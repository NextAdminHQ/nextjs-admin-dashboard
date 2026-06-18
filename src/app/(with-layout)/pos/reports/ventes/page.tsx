import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function PosReportsSalesPage() {
  return (
    <>
      <Breadcrumb pageName="Rapports de ventes" />
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
        <h3 className="text-lg font-semibold text-dark dark:text-white">Rapports de ventes</h3>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Analysez les performances de vente sur la période sélectionnée.
        </p>
      </div>
    </>
  );
}
