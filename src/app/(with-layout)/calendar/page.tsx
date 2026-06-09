import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/CalenderBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendrier des réservations",
};

const CalendarPage = () => {
  return (
    <>
      <Breadcrumb pageName="Calendrier des réservations" />

      <CalendarBox />
    </>
  );
};

export default CalendarPage;
