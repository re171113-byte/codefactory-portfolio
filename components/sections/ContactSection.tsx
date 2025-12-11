"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Send,
  Globe,
  Smartphone,
  Palette,
  FileText,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type ServiceOption = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

type BudgetOption = {
  id: string;
  label: string;
  description: string;
};

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Palette,
  FileText,
  MoreHorizontal,
};

export default function ContactSection() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");

  // 서비스 옵션
  const serviceOptions = [
    { id: "website", label: t("serviceOptions.website"), icon: "Globe", description: t("serviceOptions.websiteDesc") },
    { id: "app", label: t("serviceOptions.app"), icon: "Smartphone", description: t("serviceOptions.appDesc") },
    { id: "design", label: t("serviceOptions.uiux"), icon: "Palette", description: t("serviceOptions.uiuxDesc") },
    { id: "landing", label: t("serviceOptions.landing"), icon: "FileText", description: t("serviceOptions.landingDesc") },
    { id: "other", label: t("serviceOptions.other"), icon: "MoreHorizontal", description: t("serviceOptions.otherDesc") },
  ];

  // 예산 옵션
  const budgetOptions = [
    { id: "under100", label: t("budgetOptions.under100"), description: t("budgetOptions.under100Desc") },
    { id: "100-300", label: t("budgetOptions.100to300"), description: t("budgetOptions.100to300Desc") },
    { id: "300-500", label: t("budgetOptions.300to500"), description: t("budgetOptions.300to500Desc") },
    { id: "over500", label: t("budgetOptions.over500"), description: t("budgetOptions.over500Desc") },
    { id: "negotiable", label: t("budgetOptions.negotiable"), description: t("budgetOptions.negotiableDesc") },
  ];

  // 스텝 정보
  const steps = [
    { label: t("steps.service"), title: t("form.serviceTitle"), subtitle: t("form.serviceSubtitle") },
    { label: t("steps.budget"), title: t("form.budgetTitle"), subtitle: t("form.budgetSubtitle") },
    { label: t("steps.contactInfo"), title: t("form.contactTitle"), subtitle: t("form.contactSubtitle") },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // 멀티스텝 상태
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    service: "",
    budget: "",
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(0);

  // 스텝 이동
  const nextStep = () => {
    if (currentStep < 2) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 서비스/예산 선택
  const selectOption = (field: "service" | "budget", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => nextStep(), 400);
  };

  // 입력 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(0);
      setFormData({ service: "", budget: "", name: "", email: "", message: "" });
    }, 5000);
  };

  // 현재 스텝 유효성
  const isStepValid = () => {
    if (currentStep === 0) return !!formData.service;
    if (currentStep === 1) return !!formData.budget;
    if (currentStep === 2) return !!formData.name && !!formData.email && !!formData.message;
    return false;
  };

  // 애니메이션 variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  const goToStep = (step: number) => {
    if (step < currentStep || (step === 1 && formData.service) || (step === 2 && formData.budget)) {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section relative overflow-hidden">
      {/* Aurora 배경 효과 */}
      <div className="aurora-bg" />

      {/* 배경 글로우 오브 */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
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
          <p className="text-foreground-muted max-w-xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* 멀티스텝 폼 컨테이너 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* 프로그레스 바 (라벨 포함) */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  disabled={index > currentStep && !isStepValid()}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 group transition-all",
                    index <= currentStep ? "cursor-pointer" : "cursor-not-allowed"
                  )}
                >
                  {/* 스텝 번호 원형 */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                      index < currentStep
                        ? "bg-gradient-primary text-white shadow-lg shadow-primary/30"
                        : index === currentStep
                        ? "bg-primary/20 text-primary border-2 border-primary shadow-lg shadow-primary/20"
                        : "bg-background-card text-foreground-muted border border-border"
                    )}
                  >
                    {index < currentStep ? <Check size={20} /> : index + 1}
                  </div>
                  {/* 스텝 라벨 */}
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      index <= currentStep ? "text-foreground" : "text-foreground-muted"
                    )}
                  >
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
            {/* 프로그레스 라인 */}
            <div className="relative h-1 bg-background-card rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* 스텝 타이틀 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${currentStep}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-10"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {steps[currentStep].title}
              </h3>
              <p className="text-foreground-muted">
                {steps[currentStep].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 스텝 콘텐츠 */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1: 서비스 선택 */}
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                >
                  {serviceOptions.map((option, index) => {
                    const Icon = iconMap[option.icon] || Globe;
                    const isSelected = formData.service === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        onClick={() => selectOption("service", option.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className={cn(
                          "relative p-6 rounded-2xl text-left transition-all duration-300 group overflow-hidden",
                          "bg-background-card/60 backdrop-blur-sm",
                          isSelected
                            ? "border-2 border-primary shadow-lg shadow-primary/20"
                            : "border border-border hover:border-primary/50"
                        )}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* 선택 시 글로우 배경 */}
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 pointer-events-none" />
                        )}

                        {/* 아이콘 */}
                        <div
                          className={cn(
                            "relative w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                            isSelected
                              ? "bg-gradient-primary text-white shadow-lg shadow-primary/30"
                              : "bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-primary/10"
                          )}
                        >
                          <Icon size={26} />
                        </div>

                        {/* 텍스트 */}
                        <div className="relative">
                          <div className={cn(
                            "font-semibold text-lg mb-1 transition-colors",
                            isSelected ? "text-foreground" : "text-foreground group-hover:text-foreground"
                          )}>
                            {option.label}
                          </div>
                          <div className="text-sm text-foreground-muted">
                            {option.description}
                          </div>
                        </div>

                        {/* 선택 체크 표시 */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}

              {/* Step 2: 예산 선택 */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {budgetOptions.map((option, index) => {
                    const isSelected = formData.budget === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        onClick={() => selectOption("budget", option.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06 }}
                        className={cn(
                          "relative p-5 rounded-2xl text-left transition-all duration-300 overflow-hidden",
                          "bg-background-card/60 backdrop-blur-sm",
                          isSelected
                            ? "border-2 border-primary shadow-lg shadow-primary/20"
                            : "border border-border hover:border-primary/50"
                        )}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 pointer-events-none" />
                        )}

                        <div className="relative">
                          <div className={cn(
                            "font-bold text-xl mb-1 transition-colors",
                            isSelected ? "text-primary" : "text-foreground"
                          )}>
                            {option.label}
                          </div>
                          <div className="text-sm text-foreground-muted">
                            {option.description}
                          </div>
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}

              {/* Step 3: 연락처 입력 */}
              {currentStep === 2 && (
                <motion.form
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* 선택 요약 */}
                  <div className="flex flex-wrap gap-3 justify-center mb-8">
                    <div className="px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-medium shadow-lg shadow-primary/20">
                      {serviceOptions.find((s) => s.id === formData.service)?.label}
                    </div>
                    <div className="px-5 py-2.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-medium">
                      {budgetOptions.find((b) => b.id === formData.budget)?.label}
                    </div>
                  </div>

                  {/* 폼 카드 */}
                  <div className="p-8 rounded-2xl bg-background-card/60 backdrop-blur-sm border border-border">
                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground-muted">
                          {t("form.name")} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground-muted">
                          {t("form.email")} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="hello@example.com"
                          className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground-muted">
                        {t("form.message")} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted || !isStepValid()}
                    className={cn(
                      "w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all",
                      isSubmitted
                        ? "bg-green-500 text-white"
                        : "bg-gradient-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:shadow-none"
                    )}
                    whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        {t("form.sending")}
                      </span>
                    ) : isSubmitted ? (
                      <>
                        <Check size={20} />
                        {t("form.success")}
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        {t("form.submit")}
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* 네비게이션 버튼 */}
          <div className="flex justify-between mt-10">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                currentStep === 0
                  ? "opacity-0 pointer-events-none"
                  : "text-foreground-muted hover:text-foreground bg-background-card/50 hover:bg-background-card border border-border"
              )}
              whileHover={{ x: -3 }}
            >
              <ArrowLeft size={18} />
              {tc("previous")}
            </motion.button>

            {currentStep < 2 && (
              <motion.button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                  isStepValid()
                    ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
                    : "opacity-40 cursor-not-allowed text-foreground-muted bg-background-card/50 border border-border"
                )}
                whileHover={isStepValid() ? { x: 3 } : {}}
              >
                {tc("next")}
                <ArrowRight size={18} />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
