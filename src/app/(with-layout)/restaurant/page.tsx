import RestaurantClient from "./restaurant-client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant & Bar",
};

export default function RestaurantPage() {
  return (
    <>
      <Breadcrumb pageName="Restaurant & Bar" />
      <RestaurantClient />
    </>
  );
}
