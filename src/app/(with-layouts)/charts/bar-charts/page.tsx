import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";
import { Metadata } from "next";
import ChartOne from "./_components/chart-one";
import ChartTwo from "./_components/chart-two";

export const metadata: Metadata = {
  title: "Bar Charts",
};

export default function BarChartsPage() {
  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="flex flex-col-reverse items-start justify-between gap-3 px-2 sm:flex-row sm:items-center lg:px-6">
        <h1 className="mb-1 text-[28px] leading-8 font-medium text-text-primary">Bar Charts</h1>

        <Breadcrumbs
          dividerType="chevron"
          items={[
            { href: "/", label: "Home" },
            { href: "/charts/bar-charts", label: "Charts" },
            { href: "/charts/bar-charts", label: "Bar Charts" },
          ]}
        />
      </div>

      <div className="space-y-5 px-2 lg:px-6">
        <ChartOne />
        <ChartTwo />
      </div>
    </div>
  );
}
