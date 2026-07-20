import { TooltipContentProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export default function SalesChartTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-card-border bg-dropdowns-background p-3 shadow-lg">
        <p className="mb-2 text-sm font-medium text-text-primary">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2.5 text-sm">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-tertiary">{entry.name}</span>
                <span className="font-semibold text-text-primary">${entry.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}
