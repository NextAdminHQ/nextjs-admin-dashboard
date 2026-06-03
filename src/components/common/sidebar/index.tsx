"use client";

import { NAV_DATA } from "@/components/common/sidebar/data";
import { SidebarExpandedIcon, ThreeDots } from "@/components/common/sidebar/icon";
import { Button } from "@/components/tailgrids/core/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/tailgrids/core/collapsible";
import { cn } from "@/utils/cn";
import { AltArrowUpIcon, Logo, LogoWithText } from "@/utils/icon";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  items?: Array<{ title: string; url?: string }>;
  collapsed?: boolean;
}

function NavItem({ icon, label, href, items, collapsed }: NavItemProps) {
  // Collapsed: icon-only button centered, no dropdown
  if (collapsed) {
    return (
      <div className="flex justify-center">
        <Link
          href={href ?? items?.[0]?.url ?? "#"}
          title={label}
          className={cn(
            "px-3 py-2.5 flex items-center justify-center rounded-lg",
            "text-icon-tertiary hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-text-primary transition-colors duration-200",
          )}
        >
          {icon}
        </Link>
      </div>
    );
  }

  // Expanded: with sub-items → collapsible
  if (items && items.length > 0) {
    return (
      <Collapsible className="bg-transparent border-none data-expanded:pb-0!">
        <CollapsibleTrigger
          className={cn(
            "w-full flex items-center justify-between gap-3 sm:px-3 sm:py-2 px-3 py-2 border-none bg-transparent rounded-lg",
            "text-sm font-medium",
            "text-text-secondary hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-text-primary transition-colors duration-200",
          )}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-icon-tertiary">{icon}</span>
            <span>{label}</span>
          </div>

          <AltArrowUpIcon className="text-icon-tertiary rotate-180 group-data-expanded:rotate-0 duration-200" />
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-2 pr-0">
          {items.map((item) => (
            <div key={item.title} className="px-0">
              <Link
                href={item.url ?? "#"}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded-lg",
                  "text-sm font-medium transition-colors",
                  "text-text-secondary hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-text-primary transition-colors duration-200",
                )}
              >
                {item.title}
              </Link>
            </div>
          ))}
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
          "w-full px-3 py-2 rounded-lg flex items-center gap-3",
          "text-sm font-medium transition-colors",
          "text-text-secondary hover:bg-sidebar-navigation-nav-item-nav-hover-background hover:text-text-primary transition-colors duration-200",
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
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div className={cn("flex flex-col h-full transition-all duration-300 overflow-hidden")}>
      {/* Header */}
      <div
        className={cn(
          "flex items-center px-4 pt-7 transition-all duration-300",
          isSidebarOpen ? "justify-between" : "justify-center flex-col gap-4",
        )}
      >
        {isSidebarOpen ? <LogoWithText /> : <Logo />}
        <button
          onClick={() => toggleSidebar()}
          className={cn("p-1.5 text-icon-tertiary hover:text-text-secondary transition-colors ")}
        >
          <SidebarExpandedIcon />
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
            <Button variant="primary" size="sm" className="w-full mt-4">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
