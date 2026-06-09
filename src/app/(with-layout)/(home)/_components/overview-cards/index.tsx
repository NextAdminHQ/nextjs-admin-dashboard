import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { tauxOccupation, arriveesAujourdhui, departsAujourdhui, revenuMois, logementsDisponibles, enMaintenance } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-6 2xl:gap-7.5">
      <OverviewCard
        label="Taux d'occupation"
        data={{ value: tauxOccupation.value + "%", growthRate: tauxOccupation.growthRate }}
        Icon={icons.Views}
      />
      <OverviewCard
        label="Arrivées aujourd'hui"
        data={{ value: compactFormat(arriveesAujourdhui.value), growthRate: arriveesAujourdhui.growthRate }}
        Icon={icons.Users}
      />
      <OverviewCard
        label="Départs aujourd'hui"
        data={{ value: compactFormat(departsAujourdhui.value), growthRate: departsAujourdhui.growthRate }}
        Icon={icons.Views}
      />
      <OverviewCard
        label="Revenu du mois (FCFA)"
        data={{ value: revenuMois.value.toLocaleString("fr-FR"), growthRate: revenuMois.growthRate }}
        Icon={icons.Profit}
      />
      <OverviewCard
        label="Logements disponibles"
        data={{ value: compactFormat(logementsDisponibles.value), growthRate: logementsDisponibles.growthRate }}
        Icon={icons.Product}
      />
      <OverviewCard
        label="En maintenance"
        data={{ value: compactFormat(enMaintenance.value), growthRate: enMaintenance.growthRate }}
        Icon={icons.Users}
      />
    </div>
  );
}
