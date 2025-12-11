"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { topSkills } from "@/data/skills";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// 카운트업 컴포넌트
function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// GSAP 스킬 바 컴포넌트 (ScrollTrigger 스크러빙)
function SkillBar({
  name,
  level,
  index = 0,
}: {
  name: string;
  level: number;
  index?: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (!barRef.current || !fillRef.current) return;

    // 모션 감소 선호 시 애니메이션 없이 바로 표시
    if (shouldReduceMotion) {
      gsap.set(fillRef.current, { width: `${level}%` });
      return;
    }

    // GSAP ScrollTrigger로 스킬바 애니메이션
    gsap.fromTo(
      fillRef.current,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay: index * 0.15,
      }
    );
  }, { scope: barRef, dependencies: [shouldReduceMotion, level] });

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="text-foreground-muted">{level}%</span>
      </div>
      <div className="h-2 bg-background-card rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="h-full bg-gradient-primary rounded-full"
          style={{ width: shouldReduceMotion ? `${level}%` : 0 }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const t = useTranslations("about");

  const statsData = [
    { label: t("stats.projects"), value: 150, suffix: "+" },
    { label: t("stats.clients"), value: 120, suffix: "+" },
    { label: t("stats.experience"), value: 5, suffix: "+" },
    { label: t("stats.retention"), value: 98, suffix: "%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section relative"
    >
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* 왼쪽: 소개 */}
          <div>
            {/* 섹션 라벨 */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                {t("badge")}
              </span>
            </motion.div>

            {/* 제목 */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8"
            >
              {t("title")}
              <br />
              <span className="gradient-text">{t("titleHighlight")}</span>
            </motion.h2>

            {/* 소개 문구 */}
            <div className="space-y-4 mb-10">
              <motion.p
                variants={itemVariants}
                className="text-foreground-muted leading-relaxed"
              >
                {t("description1")}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-foreground-muted leading-relaxed"
              >
                {t("description2")}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-foreground-muted leading-relaxed"
              >
                {t("description3")}
              </motion.p>
            </div>

            {/* 통계 */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-2xl bg-background-card/50 border border-border"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-xs text-foreground-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 오른쪽: 스킬 */}
          <div>
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-3xl bg-background-card/50 border border-border backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold mb-8">{t("skills.title")}</h3>

              <div className="space-y-6">
                {topSkills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                  />
                ))}
              </div>

              {/* 추가 기술 태그 */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-foreground-muted mb-4">
                  {t("skills.others")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "AWS", "Firebase", "GraphQL", "Redis", "Prisma"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-background/50 border border-border rounded-full text-foreground-muted"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
