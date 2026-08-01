// app/_components/overview-cards/group.tsx
import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

type KPIProps = {
  weekly: Partial<Record<string, { x: string; y: number }[]>>;
  latest: Partial<Record<string, { x: string; y: number }>>;
};

export async function OverviewCardsGroup({ weekly, latest }: KPIProps) {
  const { lastSeen, PowerUsage, co2, aqi } = await getOverviewData(weekly, latest);

  console.log("last seen", lastSeen);
  console.log("PowerUsage", PowerUsage);
  console.log("co2", co2);
  console.log("aqi", aqi);
  

  return (
    <div className="py-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      <OverviewCard
        label="Last Update"
        data={{ ...lastSeen, value: compactFormat(0) }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Power Use (kWh)"
        data={{ ...PowerUsage, value: compactFormat(PowerUsage.value) }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Air Quality Index"
        data={{ ...aqi, value: compactFormat(aqi.value) }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="CO2 Level (PPM)"
        data={{ ...co2, value: compactFormat(co2.value) }}
        Icon={icons.Users}
      />
    </div>
  );
}
