"use client";
import { MoonIcon, SunIcon } from "@/components/common/header/icons";
import { Button } from "@/components/tailgrids/core/button";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="lg"
      appearance="outline"
      iconOnly
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" border border-card-border bg-card-background rounded-lg [&>svg]:size-auto shadow-xs text-icon-primary"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
