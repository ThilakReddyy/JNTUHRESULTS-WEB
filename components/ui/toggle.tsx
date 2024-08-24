"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button variant="ghost" size="ssm">
      <Sun
        className=" w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => {
          setTheme("dark");
        }}
      />
      <Moon
        className="absolute  w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => {
          setTheme("light");
        }}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function ModeToggleMobile() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div
        onClick={() => {
          if (theme == "light") {
            setTheme("dark");
          }
          if (theme == "dark") {
            setTheme("light");
          }
          if (theme == "system") {
            setTheme("light");
          }
        }}
        className={`flex h-7 w-14  cursor-pointer rounded-full border ${
          theme === "light"
            ? "justify-start bg-white border-black"
            : "justify-end bg-black border-white"
        }p-[1px]`}
      >
        <motion.div
          className={`h-5 w-5 m-[3px] absolute rounded-full bg-black ${
            theme === "light" ? "bg-black" : "bg-white"
          }`}
        />
      </div>
    </>
  );
}
