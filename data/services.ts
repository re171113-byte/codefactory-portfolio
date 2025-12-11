import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    icon: "Globe",
    title: "웹사이트 개발",
    description:
      "반응형 웹사이트부터 복잡한 웹 애플리케이션까지, 최신 기술로 완벽하게 구현합니다.",
    features: [
      "반응형 디자인",
      "SEO 최적화",
      "빠른 로딩 속도",
      "CMS 연동",
      "애니메이션 효과",
    ],
    priceRange: "100만원~",
  },
  {
    id: "2",
    icon: "Smartphone",
    title: "앱 개발",
    description:
      "iOS와 Android를 위한 크로스 플랫폼 모바일 앱을 개발합니다.",
    features: [
      "React Native / Flutter",
      "네이티브 성능",
      "푸시 알림",
      "오프라인 지원",
      "앱스토어 배포",
    ],
    priceRange: "200만원~",
  },
  {
    id: "3",
    icon: "Palette",
    title: "UI/UX 디자인",
    description:
      "사용자 중심의 직관적인 인터페이스와 경험을 디자인합니다.",
    features: [
      "사용자 리서치",
      "와이어프레임",
      "프로토타입",
      "디자인 시스템",
      "사용성 테스트",
    ],
    priceRange: "50만원~",
  },
  {
    id: "4",
    icon: "Rocket",
    title: "랜딩페이지",
    description:
      "전환율 최적화된 고퀄리티 랜딩페이지를 빠르게 제작합니다.",
    features: [
      "고전환율 디자인",
      "A/B 테스트 지원",
      "분석 도구 연동",
      "빠른 제작 (1-2주)",
      "모바일 최적화",
    ],
    priceRange: "50만원~",
  },
];

export const getServiceById = (id: string) => {
  return services.find((service) => service.id === id);
};
