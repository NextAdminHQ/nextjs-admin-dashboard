import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Card({ children, className }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card-background rounded-xl border-[0.5px] border-card-border p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full flex items-center justify-between relative flex-wrap gap-3", className)}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: ComponentProps<"div">) {
  return (
    <div className={cn("text-text-primary leading-6 font-semibold tracking-[-0.2px]", className)}>
      {children}
    </div>
  );
}

export function CardDescription({ children, className }: ComponentProps<"div">) {
  return (
    <div className={cn("mt-0.5 text-base text-text-100 leading-6 tracking-[-0.2px]", className)}>
      {children}
    </div>
  );
}

export function CardAction({ children, className }: ComponentProps<"div">) {
  return <div className={cn("absolute top-5 right-5 text-text-50", className)}>{children}</div>;
}

export function CardContent({ children, className }: ComponentProps<"div">) {
  return <div className={cn("px-5 text-text-100", className)}>{children}</div>;
}

export function CardFooter({ children, className }: ComponentProps<"div">) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}
