"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory, Project } from "@/types";
import ProjectModal from "./ProjectModal";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { useTranslations } from "next-intl";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const t = useTranslations("projects");
  const tc = useTranslations("common");

  const categories: { value: ProjectCategory; label: string }[] = [
    { value: "all", label: t("filter.all") },
    { value: "web", label: t("filter.web") },
    { value: "app", label: t("filter.app") },
    { value: "design", label: t("filter.uiux") },
    { value: "landing", label: t("filter.landing") },
  ];

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section ref={sectionRef} id="projects" className="section relative">
      <div className="container">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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

        {/* 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Project category filter"
        >
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-full transition-all",
                activeCategory === category.value
                  ? "bg-gradient-primary text-white"
                  : "bg-background-card border border-border text-foreground-muted hover:text-foreground hover:border-primary"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              role="tab"
              aria-selected={activeCategory === category.value}
              aria-controls="projects-grid"
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* 프로젝트 그리드 (벤토 스타일) */}
        <div
          id="projects-grid"
          role="tabpanel"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className={cn(
                  "group relative rounded-2xl overflow-hidden bg-background-card border border-border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                  project.gridSize === "large" && "md:col-span-2 md:row-span-2",
                  project.gridSize === "medium" && "md:col-span-1 md:row-span-1"
                )}
                onClick={() => openModal(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={t("viewDetails", { title: project.title })}
              >
                {/* 이미지 영역 (스켈레톤 로딩) */}
                <div
                  className={cn(
                    "relative overflow-hidden",
                    project.gridSize === "large" ? "h-80 md:h-[400px]" : "h-48 md:h-64"
                  )}
                >
                  <ImageWithSkeleton
                    src={project.image}
                    alt={t("thumbnailAlt", { title: project.title })}
                    fill
                    sizes={project.gridSize === "large"
                      ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    containerClassName="w-full h-full"
                    loading="lazy"
                  />

                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary rounded-full text-white text-sm font-medium">
                      <span>{tc("learnMore")}</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Featured 뱃지 */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-primary text-white rounded-full z-20">
                      {t("modal.featured")}
                    </div>
                  )}
                </div>

                {/* 정보 영역 */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground-muted mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* 기술 태그 */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-background/50 border border-border rounded text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs text-foreground-muted">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* 호버 보더 효과 */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors pointer-events-none" />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* 더보기 버튼 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 text-foreground-muted hover:text-foreground transition-colors"
            whileHover={{ x: 5 }}
            aria-label={t("viewMore")}
          >
            {t("viewMore")}
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* 프로젝트 모달 */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
