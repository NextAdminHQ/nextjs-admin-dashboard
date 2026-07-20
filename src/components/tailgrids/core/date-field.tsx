"use client";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import {
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  DateValue,
  type DateFieldProps as AriaDateFieldProps,
  type DateInputProps as AriaDateInputProps,
  type DateSegmentProps as AriaDateSegmentProps,
} from "react-aria-components";

const dateFieldStyles = cva("flex gap-3", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-center",
      responsive: "flex-col @sm/field-group:flex-row @sm/field-group:items-start",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface DateFieldProps<T extends DateValue>
  extends
    Omit<AriaDateFieldProps<T>, "isInvalid" | "isRequired" | "isDisabled" | "isReadOnly">,
    VariantProps<typeof dateFieldStyles> {
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

export function DateField<T extends DateValue>({
  className,
  orientation,
  invalid,
  required,
  disabled,
  readOnly,
  ...props
}: DateFieldProps<T>) {
  return (
    <AriaDateField
      className={cn(dateFieldStyles({ orientation }), className)}
      isInvalid={invalid}
      isRequired={required}
      isDisabled={disabled}
      isReadOnly={readOnly}
      {...props}
    />
  );
}

const dateInputStyles = cva(
  "peer flex max-w-full items-center gap-1 rounded-lg border bg-input-background px-4 py-2.5 text-title-50 outline-none data-disabled:cursor-not-allowed data-disabled:border-base-100 data-disabled:text-input-disabled-text data-focus-within:ring-4 data-invalid:border-input-error-focus-border data-invalid:data-focus-within:ring-input-error-focus-border/20",
  {
    variants: {
      state: {
        default:
          "border-card-border data-focus-within:border-input-primary-focus-border data-focus-within:ring-input-primary-focus-border/20 data-invalid:border-input-error-focus-border data-invalid:data-focus-within:ring-input-error-focus-border/20",
        error: "border-input-error-focus-border data-focus-within:ring-input-error-focus-border/20",
        success:
          "border-input-success-focus-border data-focus-within:ring-input-success-focus-border/20",
      },
    },
  },
);

export interface DateInputProps extends AriaDateInputProps, VariantProps<typeof dateInputStyles> {}

export function DateInput({ state = "default", className, ...props }: DateInputProps) {
  return (
    <AriaDateInput
      className={(renderProps) =>
        cn(
          dateInputStyles({ state }),
          typeof className === "function" ? className(renderProps) : className,
        )
      }
      {...props}
    />
  );
}

const dateSegmentStyles = cva(
  "inline-flex min-w-5 items-center justify-center rounded-sm px-0.5 py-0.5 caret-transparent outline-none [-webkit-tap-highlight-color:transparent] data-[type=literal]:min-w-0 data-[type=literal]:px-0 data-[type=literal]:py-0",
  {
    variants: {
      isPlaceholder: {
        true: "text-input-placeholder-text",
      },
      isDisabled: {
        true: "text-input-disabled-text",
      },
      isFocused: {
        true: "bg-input-primary-focus-border/20 text-title-50",
      },
    },
  },
);

export interface DateSegmentProps extends AriaDateSegmentProps {}

export function DateSegment({ className, ...props }: DateSegmentProps) {
  return (
    <AriaDateSegment
      className={(renderProps) =>
        cn(
          dateSegmentStyles({
            isPlaceholder: renderProps.isPlaceholder,
            isDisabled: renderProps.isDisabled,
            isFocused: renderProps.isFocused,
          }),
          className,
        )
      }
      {...props}
    />
  );
}
