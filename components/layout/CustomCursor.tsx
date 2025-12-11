"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "hover" | "text" | "hidden" | "link" | "project";

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // 마우스 위치
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 스프링으로 부드럽게
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // 마우스 이동 핸들러
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  // 마우스 진입/이탈 핸들러
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // 인터랙티브 요소 탐지
    const handleElementHover = () => {
      // 프로젝트 카드
      const projectCards = document.querySelectorAll('[data-cursor="project"], article[role="button"]');
      projectCards.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursorVariant("project");
          setCursorText("View");
        });
        el.addEventListener("mouseleave", () => {
          setCursorVariant("default");
          setCursorText("");
        });
      });

      // 외부 링크
      const externalLinks = document.querySelectorAll('a[target="_blank"]');
      externalLinks.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursorVariant("link");
          setCursorText("Open");
        });
        el.addEventListener("mouseleave", () => {
          setCursorVariant("default");
          setCursorText("");
        });
      });

      // 일반 버튼 및 링크
      const buttons = document.querySelectorAll(
        'button:not([data-cursor]), a:not([target="_blank"]):not([data-cursor])'
      );
      buttons.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursorVariant("hover");
          setCursorText("");
        });
        el.addEventListener("mouseleave", () => {
          setCursorVariant("default");
          setCursorText("");
        });
      });

      // 텍스트 입력 요소
      const textInputs = document.querySelectorAll('input, textarea');
      textInputs.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setCursorVariant("text");
          setCursorText("");
        });
        el.addEventListener("mouseleave", () => {
          setCursorVariant("default");
          setCursorText("");
        });
      });
    };

    // DOM 로드 후 실행
    const timeout = setTimeout(handleElementHover, 100);

    // MutationObserver로 동적 요소 감지
    const observer = new MutationObserver(() => {
      handleElementHover();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // 터치 디바이스에서는 숨기기
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // 커서 크기 설정
  const getCursorSize = () => {
    switch (cursorVariant) {
      case "project":
        return 100;
      case "link":
        return 80;
      case "hover":
        return 50;
      case "text":
        return 4;
      default:
        return 16;
    }
  };

  return (
    <>
      {/* 메인 커서 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: getCursorSize(),
          height: getCursorSize(),
          opacity: isVisible ? 1 : 0,
          backgroundColor: cursorVariant === "project" || cursorVariant === "link"
            ? "rgba(139, 92, 246, 0.9)"
            : cursorVariant === "text"
            ? "var(--primary)"
            : "rgba(255, 255, 255, 1)",
          mixBlendMode: cursorVariant === "project" || cursorVariant === "link" ? "normal" : "difference",
        }}
        transition={{
          width: { type: "spring", stiffness: 400, damping: 25 },
          height: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 0.15 },
          backgroundColor: { duration: 0.2 },
        }}
        initial={false}
      >
        {/* 커서 텍스트 */}
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="text-white text-xs font-medium uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 아우터 링 (기본 상태에서만) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "default" ? 40 : 0,
          height: cursorVariant === "default" ? 40 : 0,
          opacity: isVisible && cursorVariant === "default" ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 400, damping: 25 },
          height: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 0.15 },
        }}
        initial={false}
      />

      {/* 전역 스타일로 기본 커서 숨기기 */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
