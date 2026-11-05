import { cn } from "@/utils/cn";
import { useId, type ComponentProps } from "react";

type PropsType = Omit<ComponentProps<"input">, "size"> & {
  label?: string;
  size?: "sm" | "md";
};

const toggleVariants = {
  sm: {
    root: "h-5 w-11",
    thumb:
      "top-[1.5px] left-[1.5px] h-[17px] w-[26px] peer-checked:translate-x-[15px] rtl:peer-checked:-translate-x-[15px]",
  },
  md: {
    root: "h-6 w-13",
    thumb:
      "top-0.5 left-0.5 h-5 w-[30px] peer-checked:translate-x-[18px] rtl:peer-checked:-translate-x-[18px]",
  },
} as const;

export function Toggle({ size = "sm", className, label, ...inputProps }: PropsType) {
  const id = useId();
  const currentVariant = toggleVariants[size] ?? toggleVariants.sm;

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex max-w-fit cursor-pointer items-center gap-2 select-none",
        inputProps.disabled && "cursor-not-allowed",
      )}
    >
      <div className="relative">
        <input type="checkbox" id={id} className={cn("peer sr-only", className)} {...inputProps} />

        <div
          className={cn(
            "rounded-full bg-toggle-default-background duration-200 peer-checked:bg-toggle-active-background peer-focus:ring-4 peer-focus:ring-toggle-active-background/20 peer-disabled:bg-toggle-disabled-background",
            currentVariant.root,
          )}
        />

        <div
          className={cn(
            "pointer-events-none absolute rounded-full bg-white shadow-sm transition-transform duration-150 ease-linear peer-disabled:bg-toggle-disabled-foreground",
            currentVariant.thumb,
          )}
        />
      </div>

      {label && (
        <span
          className={cn("text-sm font-medium text-text-50", inputProps.disabled && "text-text-200")}
        >
          {label}
        </span>
      )}
    </label>
  );
}
