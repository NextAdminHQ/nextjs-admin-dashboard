import MaintenanceClient from "./maintenance-client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maintenance",
};

export default function MaintenancePage() {
  return (
    <>
      <Breadcrumb pageName="Maintenance" />
      <MaintenanceClient />
    </>
  );
}
