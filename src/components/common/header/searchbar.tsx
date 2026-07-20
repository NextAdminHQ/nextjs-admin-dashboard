"use client";

import { SearchIcon } from "@/components/common/header/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";

export default function SearchBar() {
  return (
    <div>
      {/* Mobile layout (< xl) */}
      <button className="flex size-10 items-center justify-center rounded-lg border border-card-border bg-card-background text-icon-primary shadow-xs transition-colors outline-none hover:bg-background-gray-primary focus-visible:border-input-primary-focus-border focus-visible:ring-4 focus-visible:ring-input-primary-focus-border/20 xl:hidden">
        <SearchIcon />
      </button>

      {/* Desktop layout (xl+) */}
      <div className="hidden xl:block">
        <InputGroup className="h-10">
          <InputGroupAddon align="inline-start" className="pr-0 text-icon-tertiary">
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search components..." className="pl-2 text-sm" />
          <InputGroupAddon align="inline-end">
            <div className="rounded-md border border-card-border px-2 py-0.75 text-xs text-text-tertiary">
              <span className="font-medium">⌘</span> k
            </div>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
