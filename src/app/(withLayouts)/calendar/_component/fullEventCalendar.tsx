"use client";
import "@/app/css/calendars.css";
import type { DateSelectArg, EventClickArg, EventContentArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";
import CalendarHeader from "./calendarHeader";

export default function FullEventCalendar() {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    // Initialize with some events
    setEvents([
      {
        id: "1",
        title: "Event Conf.",
        start: new Date().toISOString().split("T")[0],
        extendedProps: { calendar: "Danger" },
      },
      {
        id: "2",
        title: "Meeting",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        extendedProps: { calendar: "Success" },
      },
      {
        id: "3",
        title: "Workshop",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
        extendedProps: { calendar: "Primary" },
      },
    ]);
  }, []);

  const [events, setEvents] = useState<EventInput[]>([]);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    calendar: string;
    allDay: boolean;
    start?: string | null;
    end?: string | null;
  }>({ title: "", calendar: "Primary", allDay: false, start: null, end: null });

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
  };

  const handleNext = () => {
    calendarRef.current?.getApi().next();
  };

  const handleViewChange = (view: string) => {
    calendarRef.current?.getApi().changeView(view);
    setCurrentView(view);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    // clear date selection and open modal with initial date range
    calendarApi.unselect();
    setModalData({
      title: "",
      calendar: "Primary",
      allDay: !!selectInfo.allDay,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  // Event rendering is implemented by the file-level `renderEventContent` below
  // which uses `extendedProps.calendar` to map to palette classes (fc-bg-*).

  const openModal = () => {
    setModalData({
      title: "",
      calendar: "Primary",
      allDay: true,
      start: new Date().toISOString(),
      end: null,
    });
    setModalOpen(true);
  };

  return (
    <div className="custom-calendar overflow-hidden rounded-xl border border-card-border bg-card-background">
      <CalendarHeader
        title={title}
        currentView={currentView}
        onViewChange={handleViewChange}
        onPrev={handlePrev}
        onNext={handleNext}
        onAddEvent={openModal}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        events={currentView === "multiMonthYear" ? [] : events} // ⬅️ hide events in year view
        selectable={true}
        selectMirror={true}
        editable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        customButtons={{
          addEventButton: {
            text: "Add Event +",
            click: openModal,
          },
        }}
        height="auto"
        aspectRatio={1.35}
        datesSet={(arg) => {
          setTitle(arg.view.title);
          setCurrentView(arg.view.type);
        }}
      />
    </div>
  );
}

// Mapping of calendar names to normalized keys (used for CSS class names)
const calendarsEvents: Record<string, string> = {
  Danger: "danger",
  Success: "success",
  Primary: "primary",
  Warning: "warning",
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const calName = String(eventInfo.event.extendedProps?.calendar || "");
  const normalized = calendarsEvents[calName] || calName || "primary";
  const colorClass = `fc-bg-${String(normalized).toLowerCase()}`;

  return (
    <div className={`event-fc-color fc-event-main flex ${colorClass} rounded-sm `}>
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};
