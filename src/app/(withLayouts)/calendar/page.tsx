import FullEventCalendar from "@/app/(withLayouts)/calendar/_component/fullEventCalendar";
import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";

function Calendar() {
  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="px-2 lg:px-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-[28px] leading-8 font-medium text-text-primary mb-1">Calendar</h1>
          <div>
            <Breadcrumbs
              dividerType="chevron"
              items={[
                { href: "/", label: "Home" },
                { href: "/calendar", label: "Calendar" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="px-2 lg:px-6 space-y-5">
        <FullEventCalendar />
      </div>
    </div>
  );
}

export default Calendar;
