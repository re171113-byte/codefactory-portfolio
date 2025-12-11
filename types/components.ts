// ============================================
// 컴포넌트 Props 타입 정의
// ============================================

import { ReactNode } from "react";
import { ImageProps } from "next/image";
import type { Project } from "./index";

// ============================================
// 애니메이션 컴포넌트
// ============================================

export type FadeDirection = "up" | "down" | "left" | "right" | "none";

export interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  distance?: number;
  threshold?: number;
}

export interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export interface TextMaskProps {
  children: string;
  className?: string;
  delay?: number;
}

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

// ============================================
// UI 컴포넌트
// ============================================

export interface ImageWithSkeletonProps extends Omit<ImageProps, "onLoad"> {
  skeletonClassName?: string;
  containerClassName?: string;
}

export interface SettingsDropdownProps {
  className?: string;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface LanguageToggleProps {
  className?: string;
}

// ============================================
// 레이아웃 컴포넌트
// ============================================

export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface LoadingScreenProps {
  minDuration?: number;
}

export interface CustomCursorProps {
  className?: string;
}

// ============================================
// 섹션 컴포넌트
// ============================================

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface SectionProps {
  className?: string;
  id?: string;
}

// ============================================
// 페이지 전환
// ============================================

export interface PageTransitionProps {
  children: ReactNode;
}

// ============================================
// 공통 타입
// ============================================

export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export interface WithChildrenAndClassName extends WithChildren, WithClassName {}
