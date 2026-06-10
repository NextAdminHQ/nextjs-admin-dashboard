import HousekeepingClient from "./housekeeping-client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Housekeeping",
};

export default function HousekeepingPage() {
  return (
    <>
      <Breadcrumb pageName="Housekeeping" />
      <HousekeepingClient />
    </>
  );
}
