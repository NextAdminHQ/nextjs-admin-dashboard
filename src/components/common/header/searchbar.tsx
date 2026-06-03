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
      {/* ── Mobile layout (< xl) */}
      <button className="size-10 border border-card-border bg-card-background flex items-center justify-center rounded-lg shadow-xs text-icon-primary hover:bg-background-gray-primary transition-colors xl:hidden">
        <SearchIcon />
      </button>
      {/* ── Desktop layout (xl+) */}
      <div className="xl:block hidden">
        <InputGroup className="h-10">
          <InputGroupAddon align="inline-start" className="text-icon-tertiary pr-0">
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search components..." className="pl-2 text-sm" />
          <InputGroupAddon align="inline-end">
            <div className="border px-2 py-0.75 rounded-md text-text-tertiary border-card-border text-xs">
              <span className="font-medium">⌘</span> k
            </div>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
