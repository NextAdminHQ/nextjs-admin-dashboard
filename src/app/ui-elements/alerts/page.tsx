import { Alert } from "@/components/ui-elements/alert";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alerts",
  // other metadata
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Alerts" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <Alert
          variant="warning"
          title="Attention Needed"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when"
        />

        <Alert
          variant="success"
          title="Message Sent Successfully"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />

        <Alert
          variant="error"
          title="There were 1 errors with your submission"
          description="Lorem Ipsum is simply dummy text of the printing"
        />
      </div>
    </>
  );
}
