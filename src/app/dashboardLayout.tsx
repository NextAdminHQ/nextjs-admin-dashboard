"use client";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sidebar";
import { Sheet, SheetContent, SheetOverlay } from "@/components/tailgrids/core/sheet";
import { ReactNode, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // xl+ sidebar expand/collapse state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // mobile sheet open state (< xl breakpoint)
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-full">
      {/* ── Desktop sidebar (xl+) — always in DOM, toggles width ── */}
      <aside
        style={{
          width: isSidebarOpen ? "270px" : "72px",
          minWidth: isSidebarOpen ? "270px" : "72px",
          transition:
            "width 300ms cubic-bezier(0.4,0,0.2,1), min-width 300ms cubic-bezier(0.4,0,0.2,1)",
        }}
        className="hidden xl:block overflow-hidden shrink-0"
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </aside>

      {/* ── Mobile sidebar (< xl) — Sheet sliding from the left ── */}
      <Sheet isOpen={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
        <SheetOverlay>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="p-0 w-[270px]! max-w-[270px]! bg-card-surface-area border-r border-card-border"
          >
            <Sidebar
              isSidebarOpen={true}
              toggleSidebar={() => {
                setIsMobileSheetOpen(false);
              }}
              isMobileSheet
            />
          </SheetContent>
        </SheetOverlay>
      </Sheet>

      {/* ── Main content column ── */}
      <div className="p-4 flex-1 min-w-0">
        <div className="rounded-2xl shadow-[0_3px_6px_-2px_rgba(0,0,0,0.02),0_1px_1px_0_rgba(0,0,0,0.04)] bg-card-surface-area border-[0.5px] border-card-surface-border flex flex-col h-full overflow-hidden">
          <Header onMenuClick={() => setIsMobileSheetOpen(true)} />
          <div className="max-w-384 mx-auto min-h-0 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
