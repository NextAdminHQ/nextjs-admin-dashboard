"use client";

import { NAV_DATA } from "@/components/common/sidebar/data";
import { CloseIcon, SidebarExpandedIcon, ThreeDots } from "@/components/common/sidebar/icon";
import { Button } from "@/components/tailgrids/core/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/tailgrids/core/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tailgrids/core/tooltip";
import { cn } from "@/utils/cn";
import { AltArrowUpIcon, Logo, LogoWithText } from "@/utils/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  items?: Array<{ title: string; url?: string }>;
  collapsed?: boolean;
}

function NavItem({ icon, label, href, items, collapsed }: NavItemProps) {
  const pathname = usePathname();

  const isActive = href ? pathname === href : false;

  const hasActiveChild = items?.some((item) => item.url && pathname === item.url);

  // Collapsed: icon-only button centered, no dropdown
  if (collapsed) {
    return (
      <div className="flex justify-center">
        <Tooltip placement="right">
          <TooltipTrigger asChild>
            <Link
              href={href ?? items?.[0]?.url ?? "#"}
              className={cn(
                "px-3 py-2.5 flex items-center justify-center rounded-lg",
                isActive || hasActiveChild
                  ? "bg-sidebar-navigation-nav-item-nav-hover-background text-icon-primary"
                  : "text-icon-tertiary hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-icon-primary transition-colors duration-200",
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
        isExpanded={hasActiveChild}
        className="bg-transparent border-none data-expanded:pb-0!"
      >
        <CollapsibleTrigger
          className={cn(
            "w-full flex items-center justify-between gap-3 sm:px-3 sm:py-2 px-3 py-2 border-none bg-transparent rounded-lg text-sm font-medium group/collapsible",
            hasActiveChild
              ? "bg-sidebar-navigation-nav-item-nav-hover-background text-text-primary"
              : "text-text-secondary hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-text-primary transition-colors duration-200",
          )}
        >
          <div className="flex items-center gap-3 flex-1">
            <span
              className={cn(
                hasActiveChild
                  ? "text-icon-primary"
                  : "text-icon-tertiary group-hover/collapsible:text-icon-primary transition-colors duration-200",
              )}
            >
              {icon}
            </span>
            <span>{label}</span>
          </div>

          <AltArrowUpIcon className="text-icon-tertiary rotate-180 group-data-expanded:rotate-0 duration-200" />
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-2 pr-0 space-y-1">
          {items.map((item) => {
            const isChildActive = pathname === item.url;

            return (
              <div key={item.title} className="px-0">
                <Link
                  href={item.url ?? "#"}
                  className={cn(
                    "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
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
        className={cn(
          "w-full px-3 py-2 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors",
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

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  isMobileSheet = false,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobileSheet?: boolean;
}) {
  return (
    <div className={cn("flex flex-col h-full overflow-hidden")}>
      {/* Header */}
      <div
        className={cn(
          "flex items-center px-4 pt-7 text-text-primary",
          isSidebarOpen ? "justify-between" : "justify-center flex-col gap-4",
        )}
      >
        {isSidebarOpen ? <LogoWithText /> : <Logo />}

        <button
          onClick={() => toggleSidebar()}
          className={cn(
            "p-1.5 transition-colors",
            isMobileSheet
              ? "text-icon-tertiary hover:text-text-primary hover:bg-background-gray-primary rounded-lg"
              : "text-icon-tertiary hover:text-text-secondary",
          )}
          aria-label={isMobileSheet ? "Close sidebar" : "Toggle sidebar"}
        >
          {isMobileSheet ? <CloseIcon /> : <SidebarExpandedIcon />}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "flex-1 overflow-y-auto scrollbar-thin",
          isSidebarOpen ? "px-4 space-y-6 pt-7" : "px-2 pt-5",
        )}
      >
        {NAV_DATA.map((section) => (
          <div key={section.label}>
            {/* Expanded: show section label | Collapsed: show divider between sections */}
            {isSidebarOpen ? (
              <p className="text-xs text-text-tertiary uppercase mb-4">{section.label}</p>
            ) : (
              section.label && (
                <span className="flex items-center justify-center text-icon-secondary pt-6 pb-4">
                  <ThreeDots />
                </span>
              )
            )}
            <div className={cn("space-y-1", !isSidebarOpen && "space-y-1.5")}>
              {section.items.map((item) => (
                <NavItem
                  key={item.title}
                  icon={item.icon}
                  label={item.title}
                  href={item.url}
                  items={item.items}
                  collapsed={!isSidebarOpen}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer — only visible when expanded */}
      {isSidebarOpen && (
        <div className="px-4 py-4">
          <div className="bg-background-gray-primary px-4 py-5 text-center rounded-2xl">
            <p className="text-text-primary font-semibold leading-6 mb-2">Upgrade to Pro</p>
            <small className="text-sm text-text-tertiary leading-5 tracking-[-0.15px]">
              Get all dashboard and 200+ essential UI elements
            </small>
            <Button variant="primary" size="lg" className="w-full mt-4">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
