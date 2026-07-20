"use client";

import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  composeRenderProps,
} from "react-aria-components";

export const buttonStyles = cva(
  "flex items-center justify-center rounded-lg text-sm font-medium transition outline-none focus:ring-4 disabled:pointer-events-none data-[focused=true]:ring-4 [&>svg]:text-current!",
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
        ghost: "",
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
      // Disable states for Fill
      {
        variant: ["primary", "danger", "success"],
        appearance: "fill",
        className:
          "text-white-100 disabled:bg-button-disabled-background disabled:text-button-disabled-text",
      },
      // Disable states for Outline
      {
        variant: ["primary", "danger", "success"],
        appearance: "outline",
        className:
          "border disabled:border-button-outline-disabled-border disabled:bg-button-outline-disabled-background disabled:text-button-outline-disabled-text",
      },
      // Disable states for Ghost
      {
        variant: ["primary", "danger", "success"],
        appearance: "ghost",
        className: "disabled:bg-transparent disabled:text-button-outline-disabled-text",
      },

      // Primary Fill
      {
        variant: "primary",
        appearance: "fill",
        className:
          "bg-button-primary-background text-button-primary-text hover:bg-button-primary-hover-background focus:ring-button-primary-focus-ring data-[focused=true]:ring-button-primary-focus-ring",
      },
      // Primary Outline
      {
        variant: "primary",
        appearance: "outline",
        className:
          "hover:text-button-primary-outline-hover-text border-button-primary-outline-stroke bg-button-primary-outline-background text-button-primary-outline-text hover:bg-button-primary-outline-hover-background focus:ring-button-outline-focus-ring data-[focused=true]:ring-button-outline-focus-ring",
      },
      // Primary Ghost (supporting both variant="ghost" directly or variant="primary" + appearance="ghost")
      {
        variant: "primary",
        appearance: "ghost",
        className:
          "hover:text-button-primary-outline-hover-text text-button-primary-outline-text hover:bg-button-primary-outline-hover-background focus:ring-button-outline-focus-ring data-[focused=true]:ring-button-outline-focus-ring",
      },
      {
        variant: "ghost",
        className:
          "hover:text-button-primary-outline-hover-text text-button-primary-outline-text hover:bg-button-primary-outline-hover-background focus:ring-button-outline-focus-ring data-[focused=true]:ring-button-outline-focus-ring",
      },

      // Danger Fill
      {
        variant: "danger",
        appearance: "fill",
        className:
          "bg-button-error-background text-button-error-text hover:bg-button-error-hover-background focus:ring-button-error-focus-ring data-[focused=true]:ring-button-error-focus-ring",
      },
      // Danger Outline
      {
        variant: "danger",
        appearance: "outline",
        className:
          "border-button-error-outline-stroke bg-button-error-outline-background text-button-error-outline-text hover:bg-button-error-outline-hover-background hover:text-button-error-outline-hover-text focus:ring-button-error-outline-focus-ring data-[focused=true]:ring-button-error-outline-focus-ring",
      },
      // Danger Ghost
      {
        variant: "danger",
        appearance: "ghost",
        className:
          "text-button-error-outline-text hover:bg-button-error-outline-hover-background hover:text-button-error-outline-hover-text focus:ring-button-error-outline-focus-ring data-[focused=true]:ring-button-error-outline-focus-ring",
      },

      // Success Fill
      {
        variant: "success",
        appearance: "fill",
        className:
          "bg-button-success-background text-button-success-text hover:bg-button-success-hover-background focus:ring-button-success-focus-ring data-[focused=true]:ring-button-success-focus-ring",
      },
      // Success Outline
      {
        variant: "success",
        appearance: "outline",
        className:
          "border-button-success-outline-border bg-button-success-outline-background text-button-success-outline-text hover:bg-button-success-outline-hover-background hover:text-button-success-outline-hover-text focus:ring-button-success-outline-focus-ring data-[focused=true]:ring-button-success-outline-focus-ring",
      },
      // Success Ghost
      {
        variant: "success",
        appearance: "ghost",
        className:
          "text-button-success-outline-text hover:bg-button-success-outline-hover-background hover:text-button-success-outline-hover-text focus:ring-button-success-outline-focus-ring data-[focused=true]:ring-button-success-outline-focus-ring",
      },

      // Icon Only sizes
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

      // Regular sizes with Gaps from Figma
      {
        iconOnly: false,
        size: "xs",
        className: "h-7 gap-1.5 px-2 py-1",
      },
      {
        iconOnly: false,
        size: "sm",
        className: "h-8 gap-1.5 px-3 py-1.5",
      },
      {
        iconOnly: false,
        size: "md",
        className: "h-9 gap-1.5 px-3.5 py-2",
      },
      {
        iconOnly: false,
        size: "lg",
        className: "h-10 gap-1.5 px-3.5 py-2.5",
      },
      {
        iconOnly: false,
        size: "xl",
        className: "h-11 gap-1.5 px-4 py-3",
      },
      {
        iconOnly: false,
        size: "xxl",
        className: "h-12 gap-1 px-5 py-3 text-base",
      },

      // Outline sizes (Regular) - 2px taller
      {
        iconOnly: false,
        appearance: "outline",
        size: "xs",
        className: "h-7.5",
      },
      {
        iconOnly: false,
        appearance: "outline",
        size: "sm",
        className: "h-8.5",
      },
      {
        iconOnly: false,
        appearance: "outline",
        size: "md",
        className: "h-9.5",
      },
      {
        iconOnly: false,
        appearance: "outline",
        size: "lg",
        className: "h-10.5",
      },
      {
        iconOnly: false,
        appearance: "outline",
        size: "xl",
        className: "h-11.5",
      },
      {
        iconOnly: false,
        appearance: "outline",
        size: "xxl",
        className: "h-12.5",
      },

      // Outline sizes (Icon Only) - 2px larger
      {
        iconOnly: true,
        appearance: "outline",
        size: "xs",
        className: "size-7.5",
      },
      {
        iconOnly: true,
        appearance: "outline",
        size: "sm",
        className: "size-8.5",
      },
      {
        iconOnly: true,
        appearance: "outline",
        size: "md",
        className: "size-9.5",
      },
      {
        iconOnly: true,
        appearance: "outline",
        size: "lg",
        className: "size-10.5",
      },
      {
        iconOnly: true,
        appearance: "outline",
        size: "xl",
        className: "size-11.5",
      },
      {
        iconOnly: true,
        appearance: "outline",
        size: "xxl",
        className: "size-12.5",
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

export type ButtonProps = RACButtonProps & {
  variant?: "primary" | "danger" | "success" | "ghost";
  appearance?: "fill" | "outline" | "ghost";
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
}: ButtonProps) {
  let normalizedVariant = variant;
  let normalizedAppearance = appearance;

  if (variant === "ghost") {
    normalizedVariant = "primary";
    normalizedAppearance = "ghost";
  }

  return (
    <RACButton
      data-focused={focused ? "true" : undefined}
      className={composeRenderProps(className, (className) =>
        cn(
          buttonStyles({
            variant: normalizedVariant,
            appearance: normalizedAppearance,
            iconOnly,
            size,
          }),
          className,
        ),
      )}
      {...props}
    >
      {children}
    </RACButton>
  );
}
