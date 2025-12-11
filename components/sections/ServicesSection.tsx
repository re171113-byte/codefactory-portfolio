"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, Palette, Rocket, Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Palette,
  Rocket,
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const t = useTranslations("services");

  const services = [
    {
      id: "web",
      icon: "Globe",
      title: t("items.web.title"),
      description: t("items.web.description"),
      features: [t("items.web.features.0"), t("items.web.features.1"), t("items.web.features.2")],
      priceRange: t("items.web.price") + t("startFrom"),
    },
    {
      id: "app",
      icon: "Smartphone",
      title: t("items.app.title"),
      description: t("items.app.description"),
      features: [t("items.app.features.0"), t("items.app.features.1"), t("items.app.features.2")],
      priceRange: t("items.app.price") + t("startFrom"),
    },
    {
      id: "uiux",
      icon: "Palette",
      title: t("items.uiux.title"),
      description: t("items.uiux.description"),
      features: [t("items.uiux.features.0"), t("items.uiux.features.1"), t("items.uiux.features.2")],
      priceRange: t("items.uiux.price") + t("startFrom"),
    },
    {
      id: "landing",
      icon: "Rocket",
      title: t("items.landing.title"),
      description: t("items.landing.description"),
      features: [t("items.landing.features.0"), t("items.landing.features.1"), t("items.landing.features.2")],
      priceRange: t("items.landing.price") + t("startFrom"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section ref={sectionRef} id="services" className="section relative">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container relative">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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

        {/* 서비스 카드 그리드 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative p-6 rounded-2xl glass hover:bg-background-hover transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                {/* 아이콘 */}
                <motion.div
                  className="w-14 h-14 mb-6 rounded-xl bg-gradient-primary flex items-center justify-center"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* 제목 */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* 설명 */}
                <p className="text-sm text-foreground-muted mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* 기능 목록 */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-foreground-muted"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* 가격 */}
                {service.priceRange && (
                  <div className="pt-4 border-t border-border">
                    <span className="text-lg font-semibold gradient-text">
                      {service.priceRange}
                    </span>
                  </div>
                )}

                {/* 호버 글로우 효과 */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl shadow-glow" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-foreground-muted mb-4">
            {t("cta.question")}
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-full text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("cta.button")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
