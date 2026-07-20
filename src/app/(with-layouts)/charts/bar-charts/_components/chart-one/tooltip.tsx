import { TooltipContentProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export default function BarChartOneTooltip({
  active,
  payload,
}: TooltipContentProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-card-border bg-card-background p-3 shadow-md">
        <p className="mb-1 text-xs font-semibold text-text-primary">{data.month}</p>
        <p className="text-xs text-text-secondary">
          Sales: <span className="font-semibold text-text-primary">{data.sales}</span>
        </p>
      </div>
    );
  }
  return null;
}
