import InventoryOverview from "@/app/(withLayouts)/(home)/_component/inventoryOverview";
import LastTransactions from "@/app/(withLayouts)/(home)/_component/lastTransactions";
import Overview from "@/app/(withLayouts)/(home)/_component/overview";
import RegionLabels from "@/app/(withLayouts)/(home)/_component/regionlabels";
import SalesChart from "@/app/(withLayouts)/(home)/_component/salesChat";
import TopProducts from "@/app/(withLayouts)/(home)/_component/topProducts";
import TrafficSources from "@/app/(withLayouts)/(home)/_component/trafficSources";

export default function Home() {
  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="px-2 lg:px-6">
        <h1 className="text-[28px] leading-8 font-medium text-text-primary mb-1">E-commerce</h1>
        <p className="text-sm leading-5 text-text-tertiary">
          Track sales, monitor orders, and analyze store performance.
        </p>
      </div>

      <div className="px-2 lg:px-5 space-y-5">
        <Overview />
        <SalesChart />
        <div className="grid grid-cols-1 md:grid-cols-[519fr_558fr] gap-5">
          <InventoryOverview />
          <TopProducts />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[546fr_531fr] gap-5">
          <TrafficSources />
          <RegionLabels />
        </div>
        <LastTransactions />
      </div>
    </div>
  );
}
