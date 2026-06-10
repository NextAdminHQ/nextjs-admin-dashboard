import { Button } from "@/components/tailgrids/core/button";
import { AltArrowLeftIcon, AltArrowRightIcon, PlusIcon } from "@/utils/icon";

type CalendarHeaderProps = {
  title: string;
  currentView: string;
  onViewChange: (view: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onAddEvent: () => void;
};

export default function CalendarHeader({
  title,
  currentView,
  onViewChange,
  onPrev,
  onNext,
  onAddEvent,
}: CalendarHeaderProps) {
  const views = [
    { label: "Month", value: "dayGridMonth" },
    { label: "Week", value: "timeGridWeek" },
    { label: "Day", value: "timeGridDay" },
    { label: "Year", value: "multiMonthYear" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 border-b border-card-border gap-4">
      {/* Left section: Title & Navigation */}
      <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-start">
        <p className="leading-6 font-semibold text-text-primary">{title}</p>
        <div className="flex items-center gap-3">
          <Button onClick={onPrev} appearance="outline" iconOnly>
            <AltArrowLeftIcon />
          </Button>
          <Button appearance="outline" iconOnly onClick={onNext}>
            <AltArrowRightIcon />
          </Button>
        </div>
      </div>

      {/* Right section: View Switcher & Add Event */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center rounded-lg bg-tab-background p-1">
          {views.map((view) => (
            <button
              key={view.value}
              onClick={() => onViewChange(view.value)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                currentView === view.value
                  ? "bg-tab-active-background text-text-primary shadow-xs"
                  : "text-text-tertiary"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        <Button onClick={onAddEvent}>
          <PlusIcon />
          Add Event
        </Button>
      </div>
    </div>
  );
}
