import { overviewData } from "@/app/(withLayouts)/(home)/_component/overview/data";
import { ArrowDownIcon, ArrowUpIcon } from "@/app/(withLayouts)/(home)/_component/overview/icon";
import { cn } from "@/utils/cn";

export default function Overview() {
  return (
    <div>
      {/* Header Section */}
      <div className="mb-5 px-6">
        <h1 className="text-[28px] leading-8 font-medium text-text-primary mb-1">E-commerce</h1>
        <p className="text-sm leading-5 text-text-tertiary">
          Track sales, monitor orders, and analyze store performance.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5">
        {overviewData.map((item) => (
          <div
            key={item.id}
            className="border-[0.5px] border-card-border bg-card-background rounded-xl p-5"
          >
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
            <div className="text-2xl leading-8 font-semibold text-text-primary mb-[5px]">
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
          </div>
        ))}
      </div>
    </div>
  );
}
