"use client";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sidebar";
import { ReactNode, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="flex h-full">
      <aside
        style={{
          width: isSidebarOpen ? "240px" : "72px",
          minWidth: isSidebarOpen ? "240px" : "72px",
          transition: "width 300ms cubic-bezier(0.4,0,0.2,1), min-width 300ms cubic-bezier(0.4,0,0.2,1)",
        }}
        className="overflow-hidden"
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </aside>
      <div className="p-4 flex-1 min-w-0">
        <div className="rounded-2xl shadow-[0_3px_6px_-2px_rgba(0,0,0,0.02),0_1px_1px_0_rgba(0,0,0,0.04)] bg-card-surface-area border-[0.5px] border-card-surface-border flex flex-col h-full">
          <Header />
          <div className="max-w-384 mx-auto min-h-0 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
