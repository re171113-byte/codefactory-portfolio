import { Project, ProjectCategory } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "이커머스 플랫폼",
    description: "Next.js와 Stripe를 활용한 풀스택 쇼핑몰 플랫폼",
    longDescription:
      "결제 시스템, 재고 관리, 주문 추적 기능을 갖춘 완전한 이커머스 솔루션입니다. Stripe 결제 연동과 실시간 재고 관리로 비즈니스 운영을 간소화했습니다.",
    category: "web",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    ],
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
    link: "https://example-shop.com",
    github: "https://github.com/example/shop",
    featured: true,
    gridSize: "large",
    year: "2024",
    client: "ABC 스타트업",
    role: "풀스택 개발",
  },
  {
    id: "2",
    title: "헬스케어 모바일 앱",
    description: "React Native 기반 건강 관리 및 운동 트래킹 앱",
    longDescription:
      "사용자의 건강 데이터를 추적하고 맞춤형 운동 계획을 제공하는 모바일 앱입니다. 웨어러블 디바이스와 연동되어 실시간 심박수, 걸음 수 등을 모니터링합니다.",
    category: "app",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&h=600&fit=crop",
    technologies: ["React Native", "TypeScript", "Firebase", "Health Kit"],
    link: "https://apps.apple.com/example",
    featured: true,
    gridSize: "medium",
    year: "2024",
    client: "헬스케어 스타트업",
    role: "앱 개발",
  },
  {
    id: "3",
    title: "기업 대시보드",
    description: "실시간 데이터 시각화 관리자 대시보드",
    longDescription:
      "복잡한 비즈니스 데이터를 직관적인 차트와 그래프로 시각화하는 대시보드입니다. 실시간 업데이트와 커스터마이징 가능한 위젯을 제공합니다.",
    category: "web",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io"],
    featured: false,
    gridSize: "medium",
    year: "2023",
    client: "금융 기업",
    role: "프론트엔드 개발",
  },
  {
    id: "4",
    title: "SaaS 랜딩 페이지",
    description: "고전환율 SaaS 제품 랜딩 페이지",
    longDescription:
      "스타트업의 SaaS 제품을 위한 고전환율 랜딩 페이지입니다. A/B 테스트를 통해 최적화된 디자인과 마이크로 인터랙션으로 전환율을 40% 향상시켰습니다.",
    category: "landing",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    link: "https://saas-example.com",
    featured: true,
    gridSize: "small",
    year: "2024",
    client: "SaaS 스타트업",
    role: "디자인 & 개발",
  },
  {
    id: "5",
    title: "레스토랑 예약 시스템",
    description: "실시간 테이블 예약 및 관리 시스템",
    longDescription:
      "레스토랑 운영자와 고객 모두를 위한 예약 관리 시스템입니다. 실시간 테이블 현황, 예약 알림, 고객 관리 기능을 제공합니다.",
    category: "web",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Twilio"],
    featured: false,
    gridSize: "small",
    year: "2023",
    client: "레스토랑 체인",
    role: "풀스택 개발",
  },
  {
    id: "6",
    title: "포트폴리오 템플릿",
    description: "크리에이터를 위한 프리미엄 포트폴리오 템플릿",
    longDescription:
      "디자이너와 개발자를 위한 커스터마이징 가능한 포트폴리오 템플릿입니다. 다양한 레이아웃 옵션과 애니메이션 효과를 제공합니다.",
    category: "design",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&h=800&fit=crop",
    technologies: ["Next.js", "GSAP", "Three.js", "Tailwind CSS"],
    github: "https://github.com/example/portfolio-template",
    featured: true,
    gridSize: "large",
    year: "2024",
    role: "디자인 & 개발",
  },
  {
    id: "7",
    title: "교육 플랫폼",
    description: "온라인 강의 플랫폼 및 LMS",
    longDescription:
      "강사와 학생을 연결하는 온라인 교육 플랫폼입니다. 비디오 스트리밍, 퀴즈, 과제 제출, 진도 추적 기능을 제공합니다.",
    category: "web",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    technologies: ["Next.js", "AWS", "Prisma", "Stripe"],
    featured: false,
    gridSize: "medium",
    year: "2023",
    client: "교육 스타트업",
    role: "풀스택 개발",
  },
  {
    id: "8",
    title: "푸드 딜리버리 앱",
    description: "Flutter 기반 음식 배달 앱",
    longDescription:
      "실시간 주문 추적, 결제 시스템, 리뷰 기능을 갖춘 음식 배달 앱입니다. 배달 기사용 앱도 함께 개발했습니다.",
    category: "app",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    technologies: ["Flutter", "Firebase", "Google Maps", "Stripe"],
    featured: false,
    gridSize: "small",
    year: "2023",
    client: "딜리버리 스타트업",
    role: "앱 개발",
  },
];

// 카테고리 목록
export const projectCategories: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "web", label: "웹 개발" },
  { value: "app", label: "앱 개발" },
  { value: "design", label: "UI/UX" },
  { value: "landing", label: "랜딩페이지" },
];

// 피처드 프로젝트
export const featuredProjects = projects.filter((p) => p.featured);

// 카테고리별 필터링
export const getProjectsByCategory = (category: ProjectCategory) => {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
};
