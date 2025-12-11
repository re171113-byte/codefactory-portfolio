"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  radius = 200,
  as = "div",
  href,
  target,
  rel,
  onClick,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const factor = 1 - distance / radius;
      setPosition({
        x: distanceX * strength * factor,
        y: distanceY * strength * factor,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 15,
      mass: 0.5,
    },
  };

  if (as === "a") {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={`inline-block ${className}`}
        onClick={onClick}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  if (as === "button") {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={`inline-block ${className}`}
        onClick={onClick}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`inline-block ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
