import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="dark-mode"
      data-testid="theme-toggle"
      aria-label="Toggle theme"
    >
      <Sun 
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
        data-testid="sun-icon"
        aria-hidden="true"
      />
      <Moon 
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
        data-testid="moon-icon"
        aria-hidden="true"
      />
      <span className="sr-only" data-testid="theme-toggle-label">Toggle theme</span>
    </Button>
  );
}
