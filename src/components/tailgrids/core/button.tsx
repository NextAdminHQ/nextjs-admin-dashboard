import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

export const buttonStyles = cva(
  "flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition focus:ring-3 data-[focused=true]:ring-3 disabled:pointer-events-none [&>svg]:text-current! outline-none shadow-xs",
  {
    variants: {
      variant: {
        primary: "",
        danger: "",
        success: "",
        ghost: "",
      },
      appearance: {
        fill: "",
        outline: "",
      },
      iconOnly: {
        true: "",
        false: "",
      },
      size: {
        xs: "[&>svg]:size-4",
        sm: "[&>svg]:size-5",
        md: "[&>svg]:size-5",
        lg: "[&>svg]:size-5",
        xl: "[&>svg]:size-6",
        xxl: "[&>svg]:size-6",
      },
    },
    compoundVariants: [
      {
        variant: ["primary", "danger", "success"],
        appearance: "fill",
        className:
          "text-white-100 disabled:bg-button-disabled-background disabled:text-button-disabled-text",
      },
      {
        variant: ["primary", "danger", "success"],
        appearance: "outline",
        // Disabled styles
        className:
          "disabled:bg-button-outline-disabled-background border disabled:border-button-outline-disabled-border disabled:text-button-outline-disabled-text",
      },
      {
        variant: "primary",
        appearance: "fill",
        className:
          "focus:ring-button-primary-focus-ring data-[focused=true]:ring-button-primary-focus-ring bg-brand-500 hover:bg-brand-600 text-base-white",
      },
      {
        variant: "primary",
        appearance: "outline",
        className:
          "text-button-primary-outline-text bg-button-primary-outline-background border-button-primary-outline-stroke hover:bg-button-primary-outline-hover-background focus:ring-button-outline-focus-ring data-[focused=true]:ring-button-outline-focus-ring",
      },
      {
        variant: "danger",
        appearance: "fill",
        className:
          "bg-button-error-background hover:bg-button-error-hover-background focus:ring-button-error-focus-ring data-[focused=true]:ring-button-error-focus-ring text-button-error-text",
      },
      {
        variant: "danger",
        appearance: "outline",
        className:
          "border-button-error-outline-stroke bg-button-error-outline-background text-button-error-outline-text hover:bg-button-error-outline-hover-background hover:text-button-error-outline-hover-text focus:ring-button-error-outline-focus-ring data-[focused=true]:ring-button-error-outline-focus-ring",
      },
      {
        variant: "success",
        appearance: "fill",
        className:
          "bg-button-success-background hover:bg-button-success-hover-background focus:ring-button-success-focus-ring data-[focused=true]:ring-button-success-focus-ring text-button-success-text",
      },
      {
        variant: "success",
        appearance: "outline",
        className:
          "border-button-success-outline-border bg-button-success-outline-background text-button-success-outline-text hover:bg-button-success-outline-hover-background focus:ring-button-success-outline-focus-ring data-[focused=true]:ring-button-success-outline-focus-ring",
      },
      {
        variant: "ghost",
        className:
          "focus:ring-primary-400 data-[focused=true]:ring-primary-400 text-button-primary-outline-text hover:bg-button-ghost-hover-background hover:text-button-ghost-hover-text focus:ring-2 data-[focused=true]:ring-2",
      },
      {
        iconOnly: true,
        size: "xs",
        className: "size-7",
      },
      {
        iconOnly: true,
        size: "sm",
        className: "size-8",
      },
      {
        iconOnly: true,
        size: "md",
        className: "size-9",
      },
      {
        iconOnly: true,
        size: "lg",
        className: "size-10",
      },
      {
        iconOnly: true,
        size: "xl",
        className: "size-11",
      },
      {
        iconOnly: true,
        size: "xxl",
        className: "size-12",
      },
      {
        iconOnly: false,
        size: "xs",
        className: "h-7 px-2 py-1",
      },
      {
        iconOnly: false,
        size: "sm",
        className: "h-8 px-3 py-1.5",
      },
      {
        iconOnly: false,
        size: "md",
        className: "h-9 px-3.5 py-2",
      },
      {
        iconOnly: false,
        size: "lg",
        className: "h-10 px-3.5 py-2.5",
      },
      {
        iconOnly: false,
        size: "xl",
        className: "h-11 px-4 py-3",
      },
      {
        iconOnly: false,
        size: "xxl",
        className: "h-12 px-5 py-3 text-base",
      },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "fill",
      iconOnly: false,
      size: "md",
    },
  },
);

type PropsType = ComponentProps<"button"> & {
  variant?: "primary" | "danger" | "success" | "ghost";
  appearance?: "fill" | "outline";
  iconOnly?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  focused?: boolean;
};

export function Button({
  variant,
  appearance,
  iconOnly,
  size,
  focused,
  children,
  className,
  ...props
}: PropsType) {
  return (
    <button
      type="button"
      data-focused={focused ? "true" : undefined}
      className={cn(
        buttonStyles({
          variant,
          appearance,
          iconOnly,
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
