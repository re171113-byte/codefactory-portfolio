"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLocale } from "@/providers/LocaleProvider";
import { localeNames } from "@/i18n/config";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();
  const nextLocale = locale === "ko" ? "en" : "ko";

  return (
    <motion.button
      onClick={toggleLocale}
      className="relative flex items-center gap-2 p-2 rounded-full bg-background-card border border-border hover:border-primary transition-colors group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`${localeNames[nextLocale]}로 전환`}
      title={`Switch to ${localeNames[nextLocale]}`}
    >
      <Globe
        size={18}
        className="text-foreground-muted group-hover:text-primary transition-colors"
      />
      <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors min-w-[32px]">
        {locale.toUpperCase()}
      </span>
    </motion.button>
  );
}
