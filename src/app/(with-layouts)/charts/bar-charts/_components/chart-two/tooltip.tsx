import { TooltipContentProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export default function BarChartTwoTooltip({
  active,
  payload,
}: TooltipContentProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="min-w-30 space-y-1.5 rounded-xl border border-card-border bg-card-background p-3 shadow-md">
        <p className="mb-1 border-b border-card-border pb-1 text-xs font-semibold text-text-primary">
          {data.month}
        </p>
        <div className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            <span>Group A:</span>
          </div>
          <span className="font-semibold text-text-primary">{data.groupA.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
            <span>Group B:</span>
          </div>
          <span className="font-semibold text-text-primary">{data.groupB.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
}
