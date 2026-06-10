"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme | ((prevTheme: Theme) => Theme)) => void;
  themes: Theme[];
  systemTheme: "light" | "dark";
  forcedTheme: false;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = "theme";

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme, systemTheme: "light" | "dark") {
  const html = document.documentElement;
  const activeTheme = theme === "system" ? systemTheme : theme;

  html.classList.toggle("dark", activeTheme === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const resolvedSystem = getSystemTheme();

    setSystemTheme(resolvedSystem);
    setThemeState(storedTheme === "light" || storedTheme === "dark" || storedTheme === "system" ? storedTheme : "system");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: MediaQueryListEvent) => {
      const nextSystemTheme = event.matches ? "dark" : "light";
      setSystemTheme(nextSystemTheme);
    };

    setSystemTheme(getSystemTheme());
    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    applyTheme(theme, systemTheme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage failures
    }
  }, [theme, systemTheme]);

  const setTheme = (nextTheme: Theme | ((prevTheme: Theme) => Theme)) => {
    setThemeState((currentTheme) =>
      typeof nextTheme === "function" ? nextTheme(currentTheme) : nextTheme,
    );
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme: theme === "system" ? systemTheme : theme,
      setTheme,
      themes: ["light", "dark", "system"],
      systemTheme,
      forcedTheme: false,
    }),
    [theme, systemTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
