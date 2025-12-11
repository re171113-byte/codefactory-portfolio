"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

// 3D 컴포넌트 동적 로드 (SSR 비활성화)
const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-primary/20 blur-2xl animate-pulse" />
    </div>
  ),
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  // 타이핑할 역할들
  const roles = [
    t("roles.fullstack"),
    t("roles.frontend"),
    t("roles.backend"),
    t("roles.mobile"),
  ];

  // 타이핑 애니메이션
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && displayText === currentRole) {
      // 완성 후 대기
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      // 삭제 완료 후 다음 역할
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      } else {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  };

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const name = t("name");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid 배경 */}
      <div
        className="hero-grid absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--grid-color, rgba(139, 92, 246, 0.15)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Mouse Spotlight */}
      <div
        className="hero-spotlight absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color, rgba(139, 92, 246, 0.15)), transparent 40%)`,
        }}
      />

      {/* Grid Glow (마우스 주변 도트 강조) */}
      <div
        className="hero-grid-glow absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--grid-glow-color, rgba(139, 92, 246, 0.4)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          maskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />

      {/* 3D 배경 (데스크톱만) */}
      <div className="absolute inset-0 hidden lg:block">
        <Hero3D />
      </div>

      {/* 모바일 전용 비주얼 (3D 대체) */}
      <div className="absolute inset-0 lg:hidden flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative w-64 h-64 sm:w-80 sm:h-80"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* 회전하는 그라디언트 링 */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
          <div className="absolute inset-4 rounded-full border border-secondary/20" />
          <div className="absolute inset-8 rounded-full border border-primary/10" />

          {/* 빛나는 도트들 */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-light"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </motion.div>

        {/* 중앙 글로우 */}
        <div className="absolute w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:text-left text-center"
        >
          {/* 상단 뱃지 */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-background-card/50 border border-border backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground-muted">
              {t("available")}
            </span>
          </motion.div>

          {/* 인사말 */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground-muted mb-4"
          >
            {t("greeting")}
          </motion.p>

          {/* 이름 (글자별 애니메이션 + 글로우 펄스) */}
          <h1 key={name} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            {name.split("").map((char, i) => {
              if (char === "\n") {
                return <br key={i} />;
              }
              return (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-primary"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </h1>

          {/* 직함 - 타이핑 애니메이션 */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-6 h-[1.5em]"
          >
            <span className="gradient-text">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
            />
          </motion.h2>

          {/* 태그라인 */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground-muted max-w-2xl lg:mx-0 mx-auto mb-12"
          >
            {t("description")}
          </motion.p>

          {/* CTA 버튼들 */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 text-lg font-medium bg-gradient-primary rounded-full text-white overflow-hidden shadow-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10">{t("cta.portfolio")}</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 text-lg font-medium border border-border rounded-full text-foreground hover:border-primary hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("cta.contact")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* 스크롤 힌트 */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
        aria-label={tCommon("scrollDown")}
      >
        <span className="text-sm" aria-hidden="true">{tCommon("scrollDown")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.button>

      {/* 데코레이션 라인 */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 200, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
        />
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 200, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
        />
      </div>
    </section>
  );
}
