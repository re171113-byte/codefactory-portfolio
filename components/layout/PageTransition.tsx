"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PageTransitionProps } from "@/types";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
      when: "beforeChildren" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

// 블라인드 효과 (프리미엄 전환)
const blindVariants = {
  initial: {
    scaleY: 1,
  },
  enter: {
    scaleY: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

// 모션 감소 선호 시 간소화된 variants
const reducedPageVariants = {
  initial: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 1 },
};

const reducedBlindVariants = {
  initial: { scaleY: 0 },
  enter: { scaleY: 0 },
  exit: { scaleY: 0 },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  // 모션 감소 선호 시 애니메이션 없이 렌더링
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {/* 블라인드 오버레이 */}
      <motion.div
        className="fixed inset-0 z-[9999] bg-primary origin-top pointer-events-none"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={blindVariants}
        aria-hidden="true"
      />

      {/* 페이지 콘텐츠 */}
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </>
  );
}

// 간단한 페이드 전환 (대안)
export function FadeTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
