"use client";

import { MoonIcon } from "@/components/common/header/icons";
import { cn } from "@/utils/cn";
import { NotificationsButton } from "./notifications";
import SearchBar from "./searchbar";
import { UserProfileButton } from "./userProfile";

export default function Header() {
  return (
    <header
      className={cn(
        "flex items-center justify-between bg-card-surface-area",
        "border-b-[0.5px] border-card-border px-5 py-4 ",
        "sticky top-0 z-40 w-full",
      )}
    >
      {/* Left Side - Search */}
      <div className="flex-1 max-w-xs">
        <SearchBar />
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-2.5">
        <button className="size-10 border border-card-border bg-card-background flex items-center justify-center rounded-lg shadow-xs text-icon-primary hover:bg-background-gray-primary transition-colors">
          <MoonIcon />
        </button>
        <NotificationsButton />
        <UserProfileButton />
      </div>
    </header>
  );
}
