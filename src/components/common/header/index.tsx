"use client";

import { MenuIcon } from "@/components/common/header/icons";
import ThemeToggle from "@/components/common/header/themeToggle";
import { ThreeDots } from "@/components/common/sidebar/icon";
import { cn } from "@/utils/cn";
import { LogoWithText } from "@/utils/icon";
import React from "react";
import { NotificationsButton } from "./notifications";
import SearchBar from "./searchbar";
import { UserProfileButton } from "./userProfile";

// ── Mobile Info ───────────────────────────────────────────────────────
function MobileInfoDrawer({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={cn(isOpen ? "block" : "hidden")}>
      <div className="px-5 py-4 shadow-xs">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <NotificationsButton />
            <ThemeToggle />
            <SearchBar />
          </div>

          {/* Right Side - Actions */}
          <UserProfileButton />
        </div>
      </div>
    </div>
  );
}

// ── Main Header ──────────────────────────────────────────────────────────────
export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <>
      <header
        className={cn(
          "bg-card-surface-area",
          "border-b-[0.5px] border-card-border lg:px-5 px-2 py-4",
          "sticky top-0 z-40 w-full",
        )}
      >
        {/* ── Mobile layout (< xl) ─── 3-column grid: menu | logo | dots */}
        <div className="flex items-center xl:hidden">
          {/* Left: Menu / Hamburger */}
          <div className="flex-1 flex justify-start">
            <button
              id="mobile-menu-toggle"
              onClick={onMenuClick}
              aria-label="Open sidebar menu"
              className="px-1.5 py-1 text-icon-tertiary hover:text-text-primary rounded-md transition-colors"
            >
              <MenuIcon />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center justify-center">
            <LogoWithText />
          </div>

          {/* Right: Three-dot */}
          <div className="flex-1 flex justify-end">
            <button
              id="mobile-info-toggle"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Open quick access"
              className={cn(
                "px-1.5 py-3 rounded-md transition-colors",
                isDrawerOpen
                  ? "text-text-primary bg-background-gray-secondary"
                  : "text-icon-tertiary hover:text-text-primary",
              )}
            >
              <ThreeDots />
            </button>
          </div>
        </div>

        {/* ── Desktop layout (xl+) ─── original layout */}
        <div className="hidden xl:flex items-center justify-between">
          {/* Left Side - Search */}
          <div className="flex-1 max-w-xs">
            <SearchBar />
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <NotificationsButton />
            <UserProfileButton />
          </div>
        </div>
      </header>

      {/* Mobile Info */}
      <MobileInfoDrawer isOpen={isDrawerOpen} />
    </>
  );
}
