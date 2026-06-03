"use client";

import { cn } from "@/utils/cn";
import { NotificationsButton } from "./notifications";
import SearchBar from "./searchbar";

export default function Header() {
  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "border-b-[0.5px] border-card-border px-5 py-4",
        "sticky top-0 z-40 w-full",
      )}
    >
      {/* Left Side - Search */}
      <div className="flex-1 max-w-xs">
        <SearchBar />
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">
        <NotificationsButton />
        {/* Add other header actions here */}
      </div>
    </header>
  );
}
