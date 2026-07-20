import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("h-3 animate-pulse-custom rounded-full bg-skeleton-gradient-50", className)}
      {...props}
    />
  );
}
