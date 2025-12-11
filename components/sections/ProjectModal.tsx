"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, User, Briefcase, Monitor, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import type { Project } from "@/types";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { useTranslations } from "next-intl";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const t = useTranslations("projects.modal");
  const tCommon = useTranslations("common");

  // 라이브 프리뷰 상태
  const [viewMode, setViewMode] = useState<"image" | "preview">("image");
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setViewMode("image");
      setIsIframeLoading(true);
      setIframeError(false);
    }
  }, [isOpen]);

  // ESC 키로 닫기 + 포커스 트랩
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // 포커스 트랩: Tab 키 처리
      if (e.key === "Tab" && modalContentRef.current) {
        const focusableElements = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift+Tab: 첫 번째 요소에서 마지막으로 이동
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: 마지막 요소에서 첫 번째로 이동
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    if (isOpen) {
      // 현재 포커스된 요소 저장 (모달 닫을 때 복귀용)
      previousActiveElement.current = document.activeElement as HTMLElement;

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // 모달 열릴 때 닫기 버튼에 포커스
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      // 모달 닫힐 때 이전 요소로 포커스 복귀
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // 배경 클릭으로 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* 배경 오버레이 */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />

          {/* 모달 콘텐츠 */}
          <motion.div
            ref={modalContentRef}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background-card border border-border"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* 닫기 버튼 */}
            <motion.button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 border border-border text-foreground-muted hover:text-foreground hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t("close")}
            >
              <X size={24} />
            </motion.button>

            {/* 뷰 모드 탭 (프로젝트에 link가 있을 때만 표시) */}
            {project.link && (
              <div className="flex gap-2 p-4 bg-background border-b border-border">
                <button
                  onClick={() => setViewMode("image")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "image"
                      ? "bg-primary text-white"
                      : "bg-background-card text-foreground-muted hover:text-foreground hover:bg-background-hover"
                  }`}
                >
                  <ImageIcon size={16} />
                  {t("image")}
                </button>
                <button
                  onClick={() => {
                    setViewMode("preview");
                    setIsIframeLoading(true);
                    setIframeError(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "preview"
                      ? "bg-primary text-white"
                      : "bg-background-card text-foreground-muted hover:text-foreground hover:bg-background-hover"
                  }`}
                >
                  <Monitor size={16} />
                  {t("preview")}
                </button>
              </div>
            )}

            {/* 이미지/프리뷰 영역 */}
            <div className="relative h-64 md:h-80 lg:h-[500px] overflow-hidden rounded-t-2xl">
              {viewMode === "image" ? (
                <>
                  <ImageWithSkeleton
                    src={project.image}
                    alt={t("imageAlt", { title: project.title })}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1000px"
                    className="object-cover"
                    containerClassName="w-full h-full"
                    priority
                  />

                  {/* Featured 뱃지 */}
                  {project.featured && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4 px-4 py-1.5 text-sm font-medium bg-primary text-white rounded-full"
                    >
                      {t("featured")}
                    </motion.div>
                  )}

                  {/* 그라디언트 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent" aria-hidden="true" />
                </>
              ) : (
                /* 라이브 프리뷰 iframe */
                <div className="relative w-full h-full bg-background">
                  {/* 로딩 상태 */}
                  {isIframeLoading && !iframeError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background z-10">
                      <Loader2 size={40} className="animate-spin text-primary" />
                      <p className="text-foreground-muted">{t("loading")}</p>
                    </div>
                  )}

                  {/* 에러 상태 */}
                  {iframeError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background z-10">
                      <AlertCircle size={40} className="text-secondary" />
                      <p className="text-foreground-muted text-center px-4">
                        {t("previewError")}
                        <br />
                        <span className="text-sm">{t("previewErrorDetail")}</span>
                      </p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <ExternalLink size={16} />
                        {t("openNewTab")}
                      </a>
                    </div>
                  )}

                  {/* iframe */}
                  <iframe
                    src={project.link}
                    title={t("previewTitle", { title: project.title })}
                    className="w-full h-full border-0"
                    onLoad={() => setIsIframeLoading(false)}
                    onError={() => {
                      setIsIframeLoading(false);
                      setIframeError(true);
                    }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    loading="lazy"
                  />

                  {/* 프리뷰 액션 바 */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-sm text-foreground hover:border-primary transition-colors"
                    >
                      <ExternalLink size={14} />
                      {t("openNewTab")}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 콘텐츠 영역 */}
            <div className="p-6 md:p-8 lg:p-10">
              {/* 제목 */}
              <motion.h2
                id="modal-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
              >
                {project.title}
              </motion.h2>

              {/* 메타 정보 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-4 mb-6 text-sm text-foreground-muted"
              >
                {project.year && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" aria-hidden="true" />
                    <span>{project.year}</span>
                  </div>
                )}
                {project.client && (
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-primary" aria-hidden="true" />
                    <span>{project.client}</span>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-primary" aria-hidden="true" />
                    <span>{project.role}</span>
                  </div>
                )}
              </motion.div>

              {/* 설명 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-foreground-muted leading-relaxed mb-8"
              >
                {project.longDescription || project.description}
              </motion.p>

              {/* 기술 스택 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-8"
              >
                <h3 className="text-sm font-medium text-foreground-muted uppercase tracking-wider mb-3">
                  {t("techStack")}
                </h3>
                <div className="flex flex-wrap gap-2" role="list" aria-label={t("techStack")}>
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      role="listitem"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="px-3 py-1.5 text-sm bg-background border border-border rounded-full text-foreground-muted hover:border-primary hover:text-primary transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* 링크 버튼 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4"
              >
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-full text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} aria-hidden="true" />
                    {tCommon("viewProject")}
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-foreground hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} aria-hidden="true" />
                    {tCommon("github")}
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
