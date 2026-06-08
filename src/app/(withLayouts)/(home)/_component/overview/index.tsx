import { overviewData } from "@/app/(withLayouts)/(home)/_component/overview/data";
import { Card } from "@/components/tailgrids/core/card";
import { cn } from "@/utils/cn";
import { ArrowDownIcon, ArrowUpIcon } from "@/utils/icon";

export default function Overview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {overviewData.map((item) => (
        <Card key={item.id}>
          {/* Icon */}
          <div
            className={cn(
              "size-8 rounded-lg flex items-center justify-center mb-6",
              item.iconBgClass,
              item.iconColorClass,
            )}
          >
            {item.icon}
          </div>

          {/* Value */}
          <div className="text-2xl leading-8 font-semibold text-text-primary mb-1.25">
            {item.value}
          </div>

          {/* Label and Percentage */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-tertiary leading-5 font-medium">{item.title}</span>
            <div
              className={cn(
                "text-sm leading-5 font-medium flex items-center gap-1",
                item.isPositive ? "text-green-600" : "text-red-600",
              )}
            >
              {item.change}
              {item.isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
