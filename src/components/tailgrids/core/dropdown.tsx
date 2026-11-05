import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import {
  Button,
  type ButtonProps,
  Header,
  Menu,
  MenuItem,
  type MenuItemProps,
  MenuSection,
  MenuSectionProps,
  MenuTrigger,
  type MenuTriggerProps,
  Popover,
  type PopoverProps,
  Separator,
} from "react-aria-components";

export function DropdownMenu(props: MenuTriggerProps) {
  return <MenuTrigger {...props} />;
}

export function DropdownMenuTrigger({ className, ...props }: ButtonProps) {
  return <Button className={cn("outline-none", className)} {...props} />;
}

type DropdownContentProps = PopoverProps & {
  popoverClassName?: string;
};

export function DropdownMenuContent({
  children,
  className,
  popoverClassName,
  ...props
}: DropdownContentProps) {
  return (
    <Popover
      className={cn(
        "z-50 duration-100 outline-none data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:overflow-hidden data-exiting:fade-out-0 data-exiting:zoom-out-95 data-[placement^=bottom]:slide-in-from-top-2 data-[placement^=top]:slide-in-from-bottom-2 data-[placement^=left]:slide-in-from-right-2 data-[placement^=right]:slide-in-from-left-2",
        popoverClassName,
      )}
      {...props}
    >
      <Menu
        className={cn(
          "min-w-40 overflow-clip rounded-xl border border-card-border bg-background-white-secondary shadow-md outline-hidden",
          className,
        )}
      >
        {children}
      </Menu>
    </Popover>
  );
}

type DropdownMenuItemProps = MenuItemProps;

export function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
  return (
    <MenuItem
      {...props}
      className={cn(
        "group flex w-full cursor-default items-center gap-3 rounded-md px-1.5 py-1 text-sm text-text-50 outline-hidden transition-colors duration-200 hover:bg-background-gray-secondary_alt focus:bg-background-gray-secondary_alt focus:text-title-50",
        className,
      )}
    />
  );
}

export function DropdownMenuSection<T extends object>({
  className,
  ...props
}: MenuSectionProps<T>) {
  return <MenuSection {...props} className={cn("", className)} />;
}

export function DropdownMenuHeader({ className, ...props }: ComponentProps<typeof Header>) {
  return <Header {...props} className={cn("px-3 py-2 text-sm text-text-100", className)} />;
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<"hr">) {
  return (
    <Separator className={cn("h-px border-none bg-border-secondary-alt", className)} {...props} />
  );
}
