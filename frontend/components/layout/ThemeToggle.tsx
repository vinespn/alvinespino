"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The server doesn't know the user's theme, so render nothing until mounted.
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-24" aria-hidden />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-border px-4 py-2 text-sm"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
