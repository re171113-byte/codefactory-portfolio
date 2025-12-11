"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드에서만 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR 시 플레이스홀더
    return (
      <div className="w-10 h-10 rounded-full bg-background-card border border-border" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2.5 rounded-full bg-background-card border border-border text-foreground-muted hover:text-foreground hover:border-primary transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 180,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={18} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? -180 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        <Sun size={18} />
      </motion.div>
    </motion.button>
  );
}
