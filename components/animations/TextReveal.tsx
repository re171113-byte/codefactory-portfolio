"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  as: Component = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const words = children.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
              {i < words.length - 1 && "\u00A0"}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}

// 글자별 애니메이션
export function LetterReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.02,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const letters = children.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: 1000 }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={letterVariants}
          style={{ transformStyle: "preserve-3d" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
