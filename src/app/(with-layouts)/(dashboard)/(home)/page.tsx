import InventoryOverview from "./_component/inventory-overview";
import LastTransactionsTable from "./_component/last-transactions-table";
import ECommerceOverviewStats from "./_component/overview-stats";
import RegionLabels from "./_component/region-labels";
import SalesChart from "./_component/sales-chart";
import TopProducts from "./_component/top-products";
import TrafficSources from "./_component/traffic-sources";

export default function Home() {
  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="px-2 lg:px-6">
        <h1 className="mb-1 text-[28px] leading-8 font-medium text-text-primary">E-commerce</h1>
        <p className="text-sm leading-5 text-text-tertiary">
          Track sales, monitor orders, and analyze store performance.
        </p>
      </div>

      <div className="space-y-5 px-2 lg:px-5">
        <ECommerceOverviewStats />
        <SalesChart />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[519fr_558fr]">
          <InventoryOverview />
          <TopProducts />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[546fr_531fr]">
          <TrafficSources />
          <RegionLabels />
        </div>
        <LastTransactionsTable />
      </div>
    </div>
  );
}
