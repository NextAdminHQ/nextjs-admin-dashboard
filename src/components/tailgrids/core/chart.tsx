"use client";

import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { Props as DefaultLegendContentProps } from "recharts/types/component/DefaultLegendContent";

type ChartContextProps = {
  indicator: "dot" | "line" | "square";
  setIndicator: React.Dispatch<React.SetStateAction<"dot" | "line" | "square">>;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer");
  }
  return context;
}

function ChartContainer({
  className,
  children,
  ...props
}: RechartsPrimitive.ResponsiveContainerProps) {
  const [indicator, setIndicator] = React.useState<"dot" | "line" | "square">("dot");

  return (
    <ChartContext.Provider value={{ indicator, setIndicator }}>
      <RechartsPrimitive.ResponsiveContainer
        className={cn(
          "text-xs tracking-[-0.2px] [&_.recharts-cartesian-axis-tick-value]:fill-text-tertiary [&_.recharts-cartesian-grid_line]:stroke-card-border [&_.recharts-wrapper_*]:focus:not-focus-visible:outline-none [&_.recharts-wrapper_*]:focus-visible:outline-2",
          className,
        )}
        {...props}
      >
        {children}
      </RechartsPrimitive.ResponsiveContainer>
    </ChartContext.Provider>
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

const chartTooltipContentVariants = cva("relative p-2 pl-5 font-medium text-title-50", {
  variants: {
    indicator: {
      dot: "before:absolute before:top-1/2 before:left-2 before:size-2 before:-translate-y-1/2 before:rounded-full before:content-['']",
      line: "before:absolute before:top-1/2 before:left-2 before:h-2.5 before:w-1 before:-translate-y-1/2 before:rounded-none before:content-['']",
      square:
        "before:absolute before:top-1/2 before:left-2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-xs before:content-['']",
    },
    indicatorIndex: {
      0: "before:bg-primary-500",
      1: "before:bg-primary-300",
      2: "before:bg-primary-100",
      3: "before:bg-primary-700",
      4: "before:bg-primary-900",
    },
  },
  defaultVariants: {
    indicator: "dot",
    indicatorIndex: 0,
  },
});

interface ChartTooltipContentProps
  extends
    React.ComponentProps<"div">,
    Partial<
      Pick<
        RechartsPrimitive.TooltipContentProps,
        | "payload"
        | "label"
        | "labelStyle"
        | "labelFormatter"
        | "labelClassName"
        | "active"
        | "formatter"
      >
    >,
    VariantProps<typeof chartTooltipContentVariants> {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  className?: string;
}

function ChartTooltipContent({
  payload,
  label,
  labelStyle,
  labelFormatter,
  labelClassName,
  active,
  formatter,
  className,
  hideLabel,
  hideIndicator,
  indicator = "dot",
  ...props
}: ChartTooltipContentProps) {
  const { setIndicator } = useChart();

  React.useEffect(() => {
    setIndicator(indicator as "dot" | "line" | "square");
  }, [indicator, setIndicator]);

  if (!active || !payload?.length) {
    return null;
  }

  if (!hideLabel && labelFormatter) {
    return (
      <div style={labelStyle} className={cn("font-medium", labelClassName)}>
        {labelFormatter(label, payload)}
      </div>
    );
  }

  return (
    <div
      className={cn("min-w-20 overflow-hidden rounded-md bg-background-soft-50", className)}
      {...props}
    >
      {!hideLabel && (
        <p className="border-b bg-background-soft-100 px-2 py-1 text-title-50">{label}</p>
      )}

      <ul className="-space-y-2">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => (
            <li key={item.key}>
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <p
                  className={cn(
                    chartTooltipContentVariants({
                      indicator: hideIndicator ? null : indicator,
                      indicatorIndex: hideIndicator ? null : (index as 0 | 1 | 2 | 3 | 4),
                    }),
                    hideIndicator && "pl-2",
                  )}
                >
                  {item.value}
                </p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

const chartLegendContentVariants = cva("relative text-title-50", {
  variants: {
    indicator: {
      dot: "before:absolute before:top-1/2 before:-left-3 before:size-2 before:-translate-y-1/2 before:rounded-full before:content-['']",
      line: "before:absolute before:top-1/2 before:-left-2 before:h-2.5 before:w-1 before:-translate-y-1/2 before:rounded-none before:content-['']",
      square:
        "before:absolute before:top-1/2 before:-left-3 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-xs before:content-['']",
    },
    indicatorIndex: {
      0: "before:bg-primary-500",
      1: "before:bg-primary-300",
      2: "before:bg-primary-100",
      3: "before:bg-primary-700",
      4: "before:bg-primary-900",
    },
  },
  defaultVariants: {
    indicator: "dot",
    indicatorIndex: 0,
  },
});

function ChartLegendContent({
  className,
  payload,
  hideIndicator = false,
}: React.ComponentProps<"div"> &
  Pick<DefaultLegendContentProps, "payload"> & {
    icon?: React.ComponentType;
    hideIndicator?: boolean;
  }) {
  const { indicator } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <ul className={cn("mt-1 flex items-center justify-center gap-5", className)}>
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          return (
            <li key={item.dataKey?.toString()}>
              <p
                className={cn(
                  chartLegendContentVariants({
                    indicator: hideIndicator ? null : indicator,
                    indicatorIndex: hideIndicator ? null : (index as 0 | 1 | 2 | 3 | 4),
                  }),
                )}
              >
                {item.value}
              </p>
            </li>
          );
        })}
    </ul>
  );
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
};
