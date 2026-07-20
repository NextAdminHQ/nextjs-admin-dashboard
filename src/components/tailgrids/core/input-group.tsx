"use client";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { Button, ButtonProps } from "./button";
import { Input, InputProps } from "./input";
import { TextArea, TextAreaProps } from "./text-area";

export interface InputGroupProps extends ComponentProps<"div"> {}

function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group flex w-full items-center rounded-lg border border-card-border bg-input-background transition-all focus-within:border-input-primary-focus-border focus-within:ring-4 focus-within:ring-input-primary-focus-border/20 has-data-invalid:border-input-error-focus-border focus-within:has-data-invalid:ring-input-error-focus-border/20",
        className,
      )}
      {...props}
    />
  );
}
InputGroup.displayName = "InputGroup";

export interface InputGroupInputProps extends InputProps {}

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "w-full min-w-0 flex-1 rounded-none border-none bg-transparent px-0 shadow-none group-[:has(>input:first-child)]:pl-3 group-[:has(>input:last-child)]:pr-3 focus:border-none focus:ring-0",
        className,
      )}
      {...props}
    />
  );
}
InputGroupInput.displayName = "InputGroupInput";

const inputGroupAddonStyles = cva(
  "flex shrink-0 items-center justify-center px-3 text-sm text-title-50 [&>svg]:h-lh",
  {
    variants: {
      align: {
        "inline-start": "order-first",
        "inline-end": "order-last",
        "block-start": "order-first",
        "block-end": "order-last",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

export interface InputGroupAddonProps
  extends ComponentProps<"div">, VariantProps<typeof inputGroupAddonStyles> {}

function InputGroupAddon({ className, align, ...props }: InputGroupAddonProps) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonStyles({ align }), className)}
      {...props}
    />
  );
}
InputGroupAddon.displayName = "InputGroupAddon";

const inputGroupButtonStyles = cva(
  "inline-flex items-center justify-center rounded-md font-medium text-title-50 transition-colors focus-visible:ring-2 focus-visible:ring-input-primary-focus-border focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        xs: "h-7 px-3 text-xs",
        "icon-xs": "size-7",
        sm: "h-8 px-3 text-sm",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
);

export interface InputGroupButtonProps
  extends Omit<ButtonProps, "size">, VariantProps<typeof inputGroupButtonStyles> {}

function InputGroupButton({ className, size, variant = "ghost", ...props }: InputGroupButtonProps) {
  const iconOnly = size === "icon-xs" || size === "icon-sm";
  const buttonSize = size === "icon-xs" ? "xs" : size === "icon-sm" ? "sm" : size || "sm";

  return (
    <Button
      type="button"
      size={buttonSize}
      iconOnly={iconOnly}
      variant={variant}
      data-slot="input-group-button"
      className={cn(inputGroupButtonStyles({ size }), className)}
      {...props}
    />
  );
}
InputGroupButton.displayName = "InputGroupButton";

export interface InputGroupTextareaProps extends TextAreaProps {}

function InputGroupTextarea({ className, ...props }: InputGroupTextareaProps) {
  return (
    <TextArea
      data-slot="input-group-control"
      className={cn(
        "w-full min-w-0 flex-1 resize-none rounded-none border-none bg-transparent px-3 py-2.5 shadow-none focus:border-none focus:ring-0",
        className,
      )}
      {...props}
    />
  );
}
InputGroupTextarea.displayName = "InputGroupTextarea";

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea };
