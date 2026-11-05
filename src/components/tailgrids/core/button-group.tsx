import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const groupStyles = cva(
  "flex divide-x transition-all [:where(&>button)]:flex [:where(&>button)]:items-center [:where(&>button)]:justify-center [:where(&>button)]:gap-1.5 [:where(&>button)]:rounded-none [:where(&>button)]:border-y [:where(&>button)]:font-medium [:where(&>button)]:transition-all [:where(&>button)]:outline-none [:where(&>button)]:focus:relative [:where(&>button)]:focus:z-10 [:where(&>button)]:focus:ring-4 [:where(&>button)]:active:not-aria-[haspopup]:translate-y-px [:where(&>button)]:disabled:pointer-events-none [:where(&>button)]:disabled:border-button-disabled-border [:where(&>button)]:disabled:bg-button-disabled-background [:where(&>button)]:disabled:text-button-disabled-text [:where(&>button)]:data-[focused=true]:relative [:where(&>button)]:data-[focused=true]:z-10 [:where(&>button)]:data-[focused=true]:ring-4 [:where(&>button:first-child)]:rounded-l-lg [:where(&>button:first-child)]:border-l [:where(&>button:last-child)]:rounded-r-lg [:where(&>button:last-child)]:border-r [:where(&>button>svg)]:text-current!",
  {
    variants: {
      variant: {
        primary:
          "[:where(&>button)]:hover:text-button-primary-outline-hover-text divide-button-primary-outline-stroke text-button-primary-outline-text [:where(&>button)]:border-button-primary-outline-stroke [:where(&>button)]:bg-button-primary-outline-background [:where(&>button)]:hover:bg-button-primary-outline-hover-background [:where(&>button)]:focus:ring-button-outline-focus-ring [:where(&>button)]:data-[focused=true]:ring-button-outline-focus-ring",
        danger:
          "divide-button-error-outline-border text-button-error-outline-text [:where(&>button)]:border-button-error-outline-border [:where(&>button)]:bg-button-error-outline-background [:where(&>button)]:hover:bg-button-error-hover-background [:where(&>button)]:hover:text-button-error-text [:where(&>button)]:focus:ring-button-error-focus-ring [:where(&>button)]:data-[focused=true]:ring-button-error-focus-ring",
        success:
          "divide-button-success-outline-border text-button-success-outline-text [:where(&>button)]:border-button-success-outline-border [:where(&>button)]:bg-button-success-outline-background [:where(&>button)]:hover:bg-button-success-outline-hover-background [:where(&>button)]:hover:text-button-success-text [:where(&>button)]:focus:ring-button-success-focus-ring [:where(&>button)]:data-[focused=true]:ring-button-success-focus-ring",
      },
      size: {
        xs: "text-xs [:where(&>button)]:h-7 [:where(&>button)]:px-2 [:where(&>button)]:py-1 [:where(&>button>svg)]:size-4",
        sm: "text-sm [:where(&>button)]:h-8 [:where(&>button)]:px-3 [:where(&>button)]:py-1.5 [:where(&>button>svg)]:size-5",
        md: "text-sm [:where(&>button)]:h-9 [:where(&>button)]:px-3.5 [:where(&>button)]:py-2 [:where(&>button>svg)]:size-5",
        lg: "text-sm [:where(&>button)]:h-10 [:where(&>button)]:px-3.5 [:where(&>button)]:py-2.5 [:where(&>button>svg)]:size-5",
        xl: "text-sm [:where(&>button)]:h-11 [:where(&>button)]:px-4 [:where(&>button)]:py-3 [:where(&>button>svg)]:size-6",
        xxl: "text-base [:where(&>button)]:h-12 [:where(&>button)]:px-5 [:where(&>button)]:py-3 [:where(&>button>svg)]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type PropsType = ComponentProps<"div"> & VariantProps<typeof groupStyles>;

export function ButtonGroup({ className, children, variant, size, ...props }: PropsType) {
  return (
    <div
      className={cn(
        groupStyles({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
