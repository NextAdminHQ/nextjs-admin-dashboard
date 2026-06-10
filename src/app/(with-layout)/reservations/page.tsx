import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ReservationsClient from "./reservations-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réservations",
};

export default function ReservationsPage() {
  return (
    <>
      <Breadcrumb pageName="Réservations" />
      <ReservationsClient />
    </>
  );
}
