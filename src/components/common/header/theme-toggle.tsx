"use client";

import { MoonIcon, SunIcon } from "@/components/common/header/icons";
import { Button } from "@/components/tailgrids/core/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      iconOnly
      appearance="outline"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="size-10 rounded-lg border border-card-border bg-card-background text-icon-primary shadow-xs outline-none focus-visible:border-input-primary-focus-border focus-visible:ring-4 focus-visible:ring-input-primary-focus-border/20 [&>svg]:size-auto"
    >
      {mounted && resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
