"use client";

import { useRef } from "react";
import { motion, useInView, Variants, useReducedMotion } from "framer-motion";
import type { FadeInProps, FadeDirection, ScaleInProps, StaggerContainerProps, StaggerItemProps } from "@/types";

export default function FadeIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  distance = 40,
  threshold = 0.1,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "-50px",
  });

  // 모션 감소 선호 시 애니메이션 없이 렌더링
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// 스케일 인 애니메이션
export function ScaleIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin: "-50px" });

  // 모션 감소 선호 시 애니메이션 없이 렌더링
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// 스태거 컨테이너
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  delayChildren = 0,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // 모션 감소 선호 시 애니메이션 없이 렌더링
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// 스태거 아이템
export function StaggerItem({
  children,
  className = "",
}: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
