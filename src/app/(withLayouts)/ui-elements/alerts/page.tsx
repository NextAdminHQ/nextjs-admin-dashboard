import AlertsType from "@/app/(withLayouts)/ui-elements/alerts/_component/alertsType";
import SoftAlerts from "@/app/(withLayouts)/ui-elements/alerts/_component/softAlerts";
import SolidAlerts from "@/app/(withLayouts)/ui-elements/alerts/_component/solidAlerts";
import StyleAlerts from "@/app/(withLayouts)/ui-elements/alerts/_component/styleAlerts";
import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";
import OutlinedAlerts from "./_component/outlinedAlerts";

export default function AlertsPage() {
  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="px-2 lg:px-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-[28px] leading-8 font-medium text-text-primary mb-1">Alerts</h1>
          <div>
            <Breadcrumbs
              dividerType="chevron"
              items={[
                { href: "/", label: "Home" },
                { href: "#", label: "UI Elements" },
                { href: "/alerts", label: "Alerts" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="px-2 lg:px-6 space-y-5 grid md:grid-cols-2 gap-5">
        <OutlinedAlerts />
        <SoftAlerts />
        <SolidAlerts />
        <StyleAlerts />
        <div className="md:col-span-2">
          <AlertsType />
        </div>
      </div>
    </div>
  );
}
