import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";

// Below-the-fold 섹션들은 동적 import로 코드 스플리팅
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  loading: () => <SectionSkeleton />,
});

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  loading: () => <SectionSkeleton />,
});

const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), {
  loading: () => <SectionSkeleton />,
});

const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  loading: () => <SectionSkeleton />,
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <SectionSkeleton />,
});

// 로딩 스켈레톤 컴포넌트
function SectionSkeleton() {
  return (
    <div className="section">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-background-card rounded mb-4 mx-auto" />
          <div className="h-12 w-64 bg-background-card rounded mb-6 mx-auto" />
          <div className="h-4 w-96 max-w-full bg-background-card rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
