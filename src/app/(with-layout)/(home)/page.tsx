import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { AlertesOperationnelles } from "./_components/alertes-operationnelles";
import { ArriveesDeparts } from "./_components/arrivees-departs";
import { ChatsCard } from "./_components/chats-card";
import { OccupationEtablissements } from "./_components/occupation-etablissements";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";

type PropsType = {
  searchParams: Promise<{ selected_time_frame?: string }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark dark:text-white">Tableau de bord</h2>
        <p className="text-sm text-gray-500 dark:text-dark-6">
          Bienvenue sur Djem&apos;s Stay — suivez l&apos;occupation, les réservations et la performance de vos établissements.
        </p>
      </div>

      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
        <Suspense fallback={null}>
          <ArriveesDeparts />
        </Suspense>
        <Suspense fallback={null}>
          <AlertesOperationnelles />
        </Suspense>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <PaymentsOverview
          className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />
        <WeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        />
        <Suspense fallback={null}>
          <OccupationEtablissements />
        </Suspense>
        <Suspense fallback={null}>
          <ChatsCard />
        </Suspense>
      </div>
    </>
  );
}
