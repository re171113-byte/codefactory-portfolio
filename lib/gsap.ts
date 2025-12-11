"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 기본 이징 설정
gsap.defaults({
  ease: "power3.out",
  duration: 1,
});

// ScrollTrigger 기본 설정
ScrollTrigger.defaults({
  toggleActions: "play none none none",
  start: "top 85%",
});

export { gsap, ScrollTrigger };

// 자주 사용하는 애니메이션 프리셋
export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeInUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
  },
  slideUp: {
    from: { y: "100%" },
    to: { y: "0%" },
  },
  slideDown: {
    from: { y: "-100%" },
    to: { y: "0%" },
  },
  reveal: {
    from: { clipPath: "inset(0 100% 0 0)" },
    to: { clipPath: "inset(0 0% 0 0)" },
  },
};

// 스크롤 트리거 유틸리티
export function createScrollTrigger(
  trigger: string | Element,
  animation: gsap.core.Tween | gsap.core.Timeline,
  options: ScrollTrigger.Vars = {}
) {
  return ScrollTrigger.create({
    trigger,
    animation,
    start: "top 85%",
    toggleActions: "play none none none",
    ...options,
  });
}

// 배치 애니메이션 (stagger)
export function animateBatch(
  selector: string,
  vars: gsap.TweenVars,
  staggerAmount = 0.1
) {
  return gsap.from(selector, {
    ...vars,
    stagger: staggerAmount,
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
    },
  });
}

// 텍스트 분리 유틸리티
export function splitText(element: Element): Element[] {
  const text = element.textContent || "";
  element.textContent = "";

  return text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    element.appendChild(span);
    return span;
  });
}

// 타임라인 생성 유틸리티
export function createTimeline(options: gsap.TimelineVars = {}) {
  return gsap.timeline({
    paused: true,
    ...options,
  });
}
