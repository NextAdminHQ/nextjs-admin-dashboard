import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/tailgrids/core/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tailgrids/core/tooltip";
import { cn } from "@/utils/cn";
import { AltArrowUpIcon } from "@/utils/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { isPathActive } from "./utils";

export interface NavItemProps {
  id?: string;
  icon?: React.ReactNode;
  label: string;
  href?: string;
  items?: Array<{ title: string; url?: string }>;
  collapsed?: boolean;
  onItemClick?: () => void;
}

export default function NavItem({
  id,
  icon,
  label,
  href,
  items,
  collapsed,
  onItemClick,
}: NavItemProps) {
  const pathname = usePathname();

  const isActive = href ? isPathActive(href, pathname) : false;

  const hasActiveChild = items?.some((item) => item.url && isPathActive(item.url, pathname));

  // Collapsed: icon-only button centered, no dropdown
  if (collapsed) {
    return (
      <div className="flex justify-center">
        <Tooltip placement="right">
          <TooltipTrigger asChild>
            <Link
              href={href ?? items?.[0]?.url ?? "#"}
              onClick={onItemClick}
              className={cn(
                "flex items-center justify-center rounded-lg px-3 py-2.5",
                isActive || hasActiveChild
                  ? "bg-sidebar-navigation-nav-item-nav-hover-background text-icon-primary"
                  : "text-icon-tertiary transition-colors duration-200 hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-icon-primary",
              )}
            >
              {icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  // Expanded: with sub-items → collapsible
  if (items && items.length > 0) {
    return (
      <Collapsible
        id={id}
        className="border-none bg-transparent data-expanded:pb-0!"
      >
        <CollapsibleTrigger
          className={cn(
            "group/collapsible flex w-full items-center justify-between gap-3 rounded-lg border-none bg-transparent px-3 py-2 text-sm font-medium sm:px-3 sm:py-2",
            hasActiveChild
              ? "bg-sidebar-navigation-nav-item-nav-hover-background text-text-primary"
              : "text-text-secondary transition-colors duration-200 hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-text-primary",
          )}
        >
          <div className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                hasActiveChild
                  ? "text-icon-primary"
                  : "text-icon-tertiary transition-colors duration-200 group-hover/collapsible:text-icon-primary",
              )}
            >
              {icon}
            </span>
            <span>{label}</span>
          </div>

          <AltArrowUpIcon className="rotate-180 text-icon-tertiary duration-200 group-data-expanded:rotate-0" />
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-1 pr-0 group-data-expanded:mt-2">
          {items.map((item) => {
            const isChildActive = item.url ? isPathActive(item.url, pathname) : false;

            return (
              <div key={item.title} className="px-0">
                <Link
                  href={item.url ?? "#"}
                  onClick={onItemClick}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isChildActive
                      ? "bg-sidebar-navigation-nav-item-nav-hover-background text-text-primary"
                      : "text-text-secondary hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-text-primary",
                  )}
                >
                  {item.title}
                </Link>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Expanded: simple link
  return (
    href && (
      <Link
        href={href}
        onClick={onItemClick}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-sidebar-navigation-nav-item-nav-hover-background text-text-primary"
            : "text-text-secondary hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-text-primary",
        )}
      >
        <span className="text-icon-tertiary">{icon}</span>
        <span>{label}</span>
      </Link>
    )
  );
}
