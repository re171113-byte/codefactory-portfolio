// ============================================
// 타입 정의
// ============================================

// 컴포넌트 Props 타입 re-export
export * from "./components";

// 프로젝트 타입
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  image: string;
  images?: string[];
  technologies: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  gridSize?: "small" | "medium" | "large";
  year?: string;
  client?: string;
  role?: string;
}

export type ProjectCategory =
  | "all"
  | "web"
  | "app"
  | "design"
  | "landing";

// 서비스 타입
export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  priceRange?: string;
}

// 추천글 타입
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

// 스킬 타입
export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "mobile"
  | "design"
  | "tool";

// 통계 타입
export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

// 프로필 정보
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  socials: Social[];
  resumeUrl?: string;
}

export interface Social {
  platform: "github" | "linkedin" | "instagram" | "twitter" | "youtube" | "behance" | "dribbble";
  url: string;
  label: string;
}

// 네비게이션 타입
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

// 연락 폼 데이터
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

// 애니메이션 타입
export type AnimationDirection = "up" | "down" | "left" | "right";

export interface AnimationProps {
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// 버튼 variants
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

// 카드 hover 효과
export type CardHoverEffect = "lift" | "glow" | "tilt" | "none";
