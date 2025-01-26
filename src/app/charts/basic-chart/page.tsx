import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CampaignVisitors } from "@/components/Charts/campaign-visitors";
import { UsedDevices } from "@/components/Charts/used-devices";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Chart",
};

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Page(props: PropsType) {
  const { selected_time_frame } = await props.searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <Breadcrumb pageName="Basic Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <UsedDevices
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        />

        <div className="col-span-12 xl:col-span-5">
          <CampaignVisitors />
        </div>
      </div>
    </>
  );
}
