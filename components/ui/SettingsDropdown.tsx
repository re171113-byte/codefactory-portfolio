"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Globe, Check, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "@/providers/LocaleProvider";
import { localeNames } from "@/i18n/config";
import { useTranslations } from "next-intl";

export default function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = useTranslations("common");

  useEffect(() => {
    setMounted(true);
  }, []);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!mounted) {
    return (
      <div className="w-20 h-8 rounded-full bg-background-card border border-border" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div ref={dropdownRef} className="relative">
      {/* 트리거 버튼 - 현재 상태 표시 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-foreground-muted hover:text-foreground transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Settings"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{locale.toUpperCase()}</span>
        <span className="text-border">|</span>
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      {/* 드롭다운 메뉴 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 py-2 bg-background-card border border-border rounded-xl shadow-lg z-50"
          >
            {/* 테마 섹션 */}
            <div className="px-3 py-1.5">
              <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider">
                {t("theme")}
              </span>
            </div>
            <button
              onClick={() => setTheme("light")}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-hover transition-colors"
            >
              <Sun size={16} />
              <span>Light</span>
              {!isDark && <Check size={14} className="ml-auto text-primary" />}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-hover transition-colors"
            >
              <Moon size={16} />
              <span>Dark</span>
              {isDark && <Check size={14} className="ml-auto text-primary" />}
            </button>

            {/* 구분선 */}
            <div className="my-2 border-t border-border" />

            {/* 언어 섹션 */}
            <div className="px-3 py-1.5">
              <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider">
                {t("language")}
              </span>
            </div>
            <button
              onClick={() => setLocale("ko")}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-hover transition-colors"
            >
              <Globe size={16} />
              <span>{localeNames.ko}</span>
              {locale === "ko" && <Check size={14} className="ml-auto text-primary" />}
            </button>
            <button
              onClick={() => setLocale("en")}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-hover transition-colors"
            >
              <Globe size={16} />
              <span>{localeNames.en}</span>
              {locale === "en" && <Check size={14} className="ml-auto text-primary" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
