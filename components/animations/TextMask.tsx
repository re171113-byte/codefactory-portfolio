"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextMaskProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  threshold?: [number, number];
}

export default function TextMask({
  children,
  className = "",
  direction = "up",
  threshold = [0, 0.5],
}: TextMaskProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 방향에 따른 클립 패스 애니메이션
  const getClipPath = () => {
    switch (direction) {
      case "left":
        return useTransform(
          scrollYProgress,
          threshold,
          ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
        );
      case "right":
        return useTransform(
          scrollYProgress,
          threshold,
          ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]
        );
      case "up":
        return useTransform(
          scrollYProgress,
          threshold,
          ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
        );
      case "down":
        return useTransform(
          scrollYProgress,
          threshold,
          ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
        );
    }
  };

  const clipPath = getClipPath();

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* 그림자 텍스트 (보이지 않는 플레이스홀더) */}
      <div className="opacity-20">{children}</div>

      {/* 마스크된 텍스트 */}
      <motion.div
        className="absolute inset-0"
        style={{ clipPath }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// 단어별 애니메이션 버전
interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  staggerDelay?: number;
}

export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  staggerDelay = 0.05,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            className={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </div>
  );
}

interface WordProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  className?: string;
}

function Word({ children, progress, range, className }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-2 inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
