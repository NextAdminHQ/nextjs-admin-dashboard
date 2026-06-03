import Overview from "@/app/(withLayouts)/(home)/_component/overview";
import SalesChart from "@/app/(withLayouts)/(home)/_component/salesChat";

export default function Home() {
  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="px-6">
        <h1 className="text-[28px] leading-8 font-medium text-text-primary mb-1">E-commerce</h1>
        <p className="text-sm leading-5 text-text-tertiary">
          Track sales, monitor orders, and analyze store performance.
        </p>
      </div>

      <div className="px-5 space-y-5">
        <Overview />
        <SalesChart />
      </div>
    </div>
  );
}
