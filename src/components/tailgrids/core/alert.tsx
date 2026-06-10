"use client";

import { cn } from "@/utils/cn";
import { Xmark2x } from "@tailgrids/icons";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { Button } from "./button";

const wrapperStyles = cva("relative w-full max-w-4xl rounded-xl border p-3", {
  variants: {
    variant: {
      success: "border-alert-success-border bg-alert-success-background",
      warning: "border-alert-warning-border bg-alert-warning-background",
      danger: "border-alert-danger-border bg-alert-danger-background",
      info: "border-alert-info-border bg-alert-info-background",
      gray: "border-alert-default-border bg-alert-default-background",
      outline:
        "border-border-secondary-alt bg-background-white-secondary shadow-[0_5px_9.6px_-2px_rgba(16,24,40,0.03)]",
    },
  },
});

const iconWrapperStyles = cva("flex size-7 items-center justify-center rounded-lg [&>svg]:size-4", {
  variants: {
    variant: {
      success: "bg-alert-success-icon-background text-white-100",
      warning: "bg-alert-warning-icon-background text-white-100",
      danger: "bg-alert-danger-icon-background text-white-100",
      info: "bg-alert-info-icon-background text-white-100",
      gray: "bg-alert-default-icon-background text-white-100",
      outline: "bg-badge-gray-background text-badge-gray-icon",
    },
  },
});

const titleStyles = cva("font-medium text-sm leading-5", {
  variants: {
    variant: {
      success: "text-alert-success-title",
      warning: "text-alert-warning-title",
      danger: "text-alert-danger-title",
      info: "text-alert-info-title",
      gray: "text-alert-default-title",
      outline: "text-text-primary",
    },
  },
});

const messageStyles = cva("text-sm", {
  variants: {
    variant: {
      success: "text-alert-success-description",
      warning: "text-alert-warning-description",
      danger: "text-alert-danger-description",
      info: "text-alert-info-description",
      gray: "text-alert-default-description",
      outline: "text-alert-default-description",
    },
  },
});

const closeButtonStyles = cva(
  "absolute top-3 right-3 flex items-center justify-center p-1 transition-colors duration-200",
  {
    variants: {
      variant: {
        success: "text-alert-success-close-icon",
        warning: "text-alert-warning-close-icon",
        danger: "text-alert-danger-close-icon",
        info: "text-alert-info-close-icon",
        gray: "text-alert-default-close-icon",
        outline: "text-icon-tertiary hover:text-icon-primary",
      },
    },
  },
);

const primaryButtonStyles = cva("text-white-100", {
  variants: {
    variant: {
      success: "bg-alert-success-button-background hover:bg-alert-success-button-hover-background",
      danger: "bg-alert-danger-button-background hover:bg-alert-danger-button-hover-background",
      info: "bg-alert-info-button-background hover:bg-alert-info-button-hover-background",
      warning: "bg-alert-warning-button-background hover:bg-alert-warning-button-hover-background",
      gray: "bg-alert-default-button-background hover:bg-alert-default-button-hover-background focus:ring-alert-default-button-hover-background/20",
      outline:
        "bg-alert-default-button-background hover:bg-alert-default-button-hover-background focus:ring-alert-default-button-hover-background/20",
    },
  },
});

type PropsType = {
  title?: string;
  message?: string;
  variant?: "success" | "danger" | "info" | "warning" | "gray" | "outline";
  icon?: React.ReactNode;
  actions?: {
    primary?: {
      label: string;
      onClick: () => void;
    };
    secondary?: {
      label: string;
    };
  };
  open?: boolean;
  onClose?: () => void;
  classNames?: {
    wrapper?: string;
    iconWrapper?: string;
    title?: string;
    message?: string;
    closeButton?: string;
    primaryButton?: string;
    secondaryButton?: string;
  };
};

export default function Alert({
  title,
  message,
  variant = "success",
  icon,
  open = true,
  onClose,
  actions,
  classNames,
}: PropsType) {
  const [visible, setVisible] = useState(open);

  const handleClose = () => {
    setVisible(false);
    onClose?.();

    setTimeout(() => {
      setVisible(true);
    }, 5000);
  };

  if (!visible) return null;

  return (
    <div className={cn(wrapperStyles({ variant }), classNames?.wrapper)}>
      <button
        onClick={handleClose}
        className={cn(
          closeButtonStyles({
            variant,
          }),
          classNames?.closeButton,
        )}
        aria-label="Close alert"
      >
        <Xmark2x className="size-5" />
      </button>

      <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-3.5">
        {icon && (
          <div className={cn(iconWrapperStyles({ variant }), classNames?.iconWrapper)}>{icon}</div>
        )}

        {title && <h4 className={cn(titleStyles({ variant }), classNames?.title)}>{title}</h4>}

        {message && (
          <p
            className={cn(
              messageStyles({
                variant,
                className: cn(title ? "col-span-full" : "font-medium"),
              }),
              classNames?.message,
            )}
          >
            {message}
          </p>
        )}
      </div>

      {(actions?.primary || actions?.secondary) && (
        <div className="mt-5 flex gap-3">
          {actions?.primary && (
            <Button
              className={cn(primaryButtonStyles({ variant }), classNames?.primaryButton)}
              // variant={getVariant(variant)}
              onClick={actions.primary.onClick}
            >
              {actions.primary.label}
            </Button>
          )}

          {actions?.secondary && (
            <Button
              appearance="outline"
              onClick={handleClose}
              className={classNames?.secondaryButton}
            >
              {actions.secondary.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function getVariant(variant: string) {
  switch (variant) {
    case "success":
      return "success";
    case "danger":
      return "danger";
  }
}
