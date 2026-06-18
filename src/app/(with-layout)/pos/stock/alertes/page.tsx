import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function PosStockAlertsPage() {
  return (
    <>
      <Breadcrumb pageName="Alertes de stock" />
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
        <h3 className="text-lg font-semibold text-dark dark:text-white">Alertes de stock</h3>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Suivez les articles en rupture et seuil critique.
        </p>
      </div>
    </>
  );
}
