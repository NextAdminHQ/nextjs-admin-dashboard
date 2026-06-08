import LastTransactionsTable from "@/app/(withLayouts)/tables/_component/lastTransactionsTable";
import PackageTable from "@/app/(withLayouts)/tables/_component/packageTable";
import TopChannels from "@/app/(withLayouts)/tables/_component/topChannels";
import TopProductsTable from "@/app/(withLayouts)/tables/_component/topProductsTable";
import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";

export default function Tables() {
  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="px-2 lg:px-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-[28px] leading-8 font-medium text-text-primary mb-1">Tables</h1>
          <div>
            <Breadcrumbs
              dividerType="chevron"
              items={[
                { href: "/", label: "Home" },
                { href: "/tables", label: "Tables" },
                { href: "#", label: "Basic Tables" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="px-2 lg:px-5 space-y-5">
        <TopProductsTable />
        <PackageTable />
        <LastTransactionsTable />
        <TopChannels />
      </div>
    </div>
  );
}
