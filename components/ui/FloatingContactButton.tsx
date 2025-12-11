"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("common");

  // 스크롤 위치에 따라 FAB 표시
  useEffect(() => {
    const handleScroll = () => {
      // Hero 섹션을 지나면 표시 (약 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      // Contact 섹션으로 스크롤
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 터치 기기 감지
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // 모바일에서만 표시
  if (!isTouchDevice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 safe-area-bottom safe-area-right"
        >
          <motion.button
            onClick={handleClick}
            className="w-14 h-14 rounded-full bg-gradient-primary text-white shadow-lg flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
            aria-label={t("contact")}
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="message"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* 글로우 효과 */}
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl -z-10 animate-pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
