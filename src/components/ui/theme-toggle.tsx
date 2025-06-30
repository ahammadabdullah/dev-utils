import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const themeCycle = ["dark", "system", "light"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const current = themeCycle.indexOf(
      (theme ?? "system") as (typeof themeCycle)[number]
    );
    setIndex(current === -1 ? 2 : current);
  }, [theme]);

  function handleClick() {
    const nextIndex = (index + 1) % themeCycle.length;
    setTheme(themeCycle[nextIndex]);
    setIndex(nextIndex);
  }

  const Icon =
    themeCycle[index] === "light"
      ? Sun
      : themeCycle[index] === "dark"
      ? Moon
      : Monitor;

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Icon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
