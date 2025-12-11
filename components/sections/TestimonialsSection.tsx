"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Pause, Play } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import useInterval from "@/hooks/useInterval";
import { useTranslations } from "next-intl";

const AUTO_SLIDE_INTERVAL = 5000; // 5초

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInViewOnce = useInView(sectionRef, { once: true, margin: "-100px" });
  const isInViewContinuous = useInView(sectionRef, { amount: 0.1 }); // 자동 슬라이드용
  const t = useTranslations("testimonials");

  // prefers-reduced-motion 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 자동 슬라이드 (5초마다) - 뷰포트 내에서만 실행
  useInterval(
    () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    },
    isPaused || prefersReducedMotion || !isInViewContinuous ? null : AUTO_SLIDE_INTERVAL
  );

  // 진행 바 업데이트 (100ms마다) - 뷰포트 내에서만 실행
  useInterval(
    () => {
      setProgress((prev) => {
        const increment = (100 / AUTO_SLIDE_INTERVAL) * 100;
        return Math.min(prev + increment, 100);
      });
    },
    isPaused || prefersReducedMotion || !isInViewContinuous ? null : 100
  );

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (isPaused) {
      setProgress(0);
    }
  };

  // 호버 시 일시정지
  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (!prefersReducedMotion) {
      setIsPaused(false);
      setProgress(0);
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} id="testimonials" className="section relative">
      <div className="container">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInViewOnce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            {t("badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            {t("title")}
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* 캐러셀 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInViewOnce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            ref={cardRef}
            className="relative touch-pan-y"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x > 50) {
                prev();
              } else if (info.offset.x < -50) {
                next();
              }
            }}
          >
            {/* 인용부호 */}
            <Quote className="absolute -top-4 -left-4 w-16 h-16 text-primary/20 rotate-180" />

            {/* 추천글 카드 */}
            <div className="relative p-8 md:p-12 rounded-3xl glass min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  className="text-center"
                >
                  {/* 별점 */}
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < currentTestimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-foreground-subtle"
                        )}
                      />
                    ))}
                  </div>

                  {/* 내용 */}
                  <blockquote className="text-lg md:text-xl leading-relaxed text-foreground mb-8">
                    &ldquo;{currentTestimonial.content}&rdquo;
                  </blockquote>

                  {/* 프로필 */}
                  <div className="flex items-center justify-center gap-4">
                    {/* 아바타 플레이스홀더 */}
                    <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                      {currentTestimonial.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-sm text-foreground-muted">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 네비게이션 버튼 */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4">
              <motion.button
                onClick={prev}
                className="p-3 rounded-full bg-background-card border border-border text-foreground-muted hover:text-foreground hover:border-primary transition-colors pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t("controls.prev")}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                onClick={next}
                className="p-3 rounded-full bg-background-card border border-border text-foreground-muted hover:text-foreground hover:border-primary transition-colors pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t("controls.next")}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </motion.div>

          {/* 진행 바 */}
          {!prefersReducedMotion && (
            <div className="mt-6 px-4">
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </div>
          )}

          {/* 인디케이터 + 컨트롤 */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* 인디케이터 */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-foreground-subtle hover:bg-foreground-muted"
                  )}
                  aria-label={t("controls.goTo", { number: index + 1 })}
                />
              ))}
            </div>

            {/* 재생/일시정지 버튼 */}
            {!prefersReducedMotion && (
              <motion.button
                onClick={togglePause}
                className="p-2 rounded-full bg-background-card border border-border text-foreground-muted hover:text-foreground hover:border-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isPaused ? t("controls.play") : t("controls.pause")}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
