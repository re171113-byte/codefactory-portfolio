"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useTranslations } from "next-intl";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
  };

  return (
    <footer className="relative py-16 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 브랜드 */}
          <div>
            <motion.a
              href="#"
              className="text-2xl font-bold gradient-text inline-block mb-4"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              CODEFACTORY
            </motion.a>
            <p className="text-foreground-muted text-sm leading-relaxed whitespace-pre-line">
              {t("description")}
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground-muted">
              {t("navigation")}
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <motion.a
                    href={item.href}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground-muted">
              {t("contactTitle")}
            </h3>
            <ul className="space-y-3 text-foreground-muted">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              {profile.phone && (
                <li>
                  <a
                    href={`tel:${profile.phone.replace(/-/g, "")}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {profile.phone}
                  </a>
                </li>
              )}
              {profile.location && <li>{profile.location}</li>}
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-foreground-subtle text-sm mb-4 md:mb-0">
            {t("copyright", { year: currentYear })}
          </p>

          {/* 소셜 링크 */}
          <div className="flex items-center gap-4">
            {profile.socials.map((social) => {
              const Icon =
                socialIcons[social.platform as keyof typeof socialIcons];
              if (!Icon) return null;

              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground-muted hover:text-foreground transition-colors"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

      {/* 맨 위로 버튼 */}
      <motion.button
        onClick={scrollToTop}
        className="absolute right-8 bottom-8 p-3 bg-background-card border border-border rounded-full text-foreground-muted hover:text-foreground hover:border-primary transition-colors"
        whileHover={{ y: -4, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
        whileTap={{ scale: 0.9 }}
        aria-label={tc("backToTop")}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
