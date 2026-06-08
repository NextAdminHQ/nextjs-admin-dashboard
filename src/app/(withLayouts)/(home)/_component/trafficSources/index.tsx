import { Card, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { MenuDotsIcon } from "@/utils/icon";

export default function TrafficSources() {
  return (
    <Card>
      {/* Header */}
      <CardHeader className="mb-6">
        <CardTitle className="text-text-primary font-semibold leading-6">Traffic Sources</CardTitle>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors">
          <MenuDotsIcon />
        </button>
      </CardHeader>
      {/* Traffic chart */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-sm font-medium leading-5 block text-text-tertiary">Source</span>
          <span className="text-sm font-medium leading-5 block text-text-tertiary">Impression</span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { name: "Organic", value: "3.9K", percentage: 100 },
            { name: "Direct", value: "3.9K", percentage: 90 },
            { name: "Social", value: "509", percentage: 70 },
            { name: "Email", value: "639", percentage: 60 },
            { name: "Referral", value: "57", percentage: 50 },
          ].map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1 max-w-[90%] h-8 flex items-center">
                <div
                  className="bg-background-gray-secondary_alt h-full rounded flex items-center px-3"
                  style={{ width: `${source.percentage}%` }}
                >
                  <span className="text-sm text-text-primary font-medium">{source.name}</span>
                </div>
              </div>
              <span className="text-sm text-text-primary font-medium">{source.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
