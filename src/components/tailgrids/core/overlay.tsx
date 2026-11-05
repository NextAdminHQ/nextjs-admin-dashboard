import { cn } from "@/utils/cn";
import {
  DialogTrigger as AriaDialogTrigger,
  ModalOverlay as AriaModalOverlay,
  type DialogTriggerProps as AriaDialogTriggerProps,
  type ModalOverlayProps as AriaModalOverlayProps
} from "react-aria-components";

export interface OverlayWrapperProps extends AriaDialogTriggerProps {}

export function OverlayWrapper({ ...props }: OverlayWrapperProps) {
  return <AriaDialogTrigger {...props} />;
}

export interface BackdropProps extends AriaModalOverlayProps {}

export function Backdrop({
  className,
  isDismissable = true,
  ...props
}: BackdropProps) {
  return (
    <AriaModalOverlay
      isDismissable={isDismissable}
      className={cn(
        "fixed inset-0 isolate z-100 bg-black/50 duration-100 data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0 supports-backdrop-filter:backdrop-blur-xs dark:bg-black/70",
        className
      )}
      {...props}
    />
  );
}
