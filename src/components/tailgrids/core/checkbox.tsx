"use client";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { type SVGProps } from "react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
  composeRenderProps,
} from "react-aria-components";

const checkboxStyles = cva(
  "grid place-items-center overflow-hidden border border-button-primary-outline-stroke bg-checkbox-background transition group-hover/checkbox:border-checkbox-checked-border group-data-[disabled=true]/checkbox:border-base-50 group-data-[focused=true]/checkbox:border-primary-300 group-data-[focused=true]/checkbox:ring-4 group-data-[focused=true]/checkbox:ring-checkbox-checked-border/20 group-data-[invalid=true]/checkbox:border-error-500 group-data-[invalid=true]/checkbox:text-error-500 group-data-[selected=true]/checkbox:border-checkbox-checked-border! group-data-[selected=true]/checkbox:bg-checkbox-checked-background [&>svg]:hidden [&>svg]:text-checkbox-checked-icon-color group-data-[disabled=true]/checkbox:[&>svg]:text-(--border-color-base-50) group-data-[selected=true]/checkbox:[&>svg]:block",
  {
    variants: {
      size: {
        sm: "size-4 rounded [&>svg]:size-3",
        md: "size-5 rounded-md [&>svg]:size-3.5",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export interface CheckboxProps
  extends Omit<AriaCheckboxProps, "size">, VariantProps<typeof checkboxStyles> {}

export function Checkbox({ size = "sm", className, children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      className={cn(
        "group/checkbox relative inline-flex items-center gap-2 overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      {composeRenderProps(children, (resolvedChildren, { isDisabled }) => (
        <>
          <div className={cn(checkboxStyles({ size }), !isDisabled && "cursor-pointer")}>
            <CheckIcon />
          </div>
          {resolvedChildren}
        </>
      ))}
    </AriaCheckbox>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      className="stroke-checkbox-checked-icon-color"
      {...props}
    >
      <path
        d="M11.667 3.5L5.25 9.917 2.333 7"
        stroke="currentColor"
        strokeWidth={1.94437}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
