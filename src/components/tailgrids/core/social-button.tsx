import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { Button } from "./button";

export function SocialButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <Button
      size="lg"
      appearance="outline"
      className={cn(
        "w-full max-w-84 text-button-primary-outline-text py-3 disabled:[&>svg]:opacity-60 bg-background-gray-primary border-border-secondary",
        className,
      )}
      {...props}
    />
  );
}
