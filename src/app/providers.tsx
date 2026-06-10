"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
