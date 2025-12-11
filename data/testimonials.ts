import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "김철수",
    role: "대표이사",
    company: "ABC 스타트업",
    content:
      "코드팩토리님 덕분에 원하던 퀄리티의 웹사이트를 완성했습니다. 소통도 원활하고 결과물도 만족스럽습니다. 다음 프로젝트도 꼭 함께 하고 싶습니다!",
    rating: 5,
    avatar: "/images/testimonials/avatar1.jpg",
  },
  {
    id: "2",
    name: "이영희",
    role: "마케팅 팀장",
    company: "XYZ 마케팅",
    content:
      "랜딩페이지 전환율이 40% 이상 향상되었어요. 디자인 감각도 뛰어나고 기술적인 부분도 완벽하게 처리해주셨습니다.",
    rating: 5,
    avatar: "/images/testimonials/avatar2.jpg",
  },
  {
    id: "3",
    name: "박민수",
    role: "CTO",
    company: "테크 스타트업",
    content:
      "복잡한 대시보드 프로젝트였는데 기대 이상으로 잘 만들어주셨습니다. 코드 품질도 높고 문서화도 꼼꼼하게 해주셔서 유지보수가 편합니다.",
    rating: 5,
    avatar: "/images/testimonials/avatar3.jpg",
  },
  {
    id: "4",
    name: "정수진",
    role: "대표",
    company: "디자인 에이전시",
    content:
      "우리 디자인을 완벽하게 구현해주셨어요. 세세한 애니메이션까지 놓치지 않고 표현해주셔서 정말 감동받았습니다.",
    rating: 5,
    avatar: "/images/testimonials/avatar4.jpg",
  },
  {
    id: "5",
    name: "최현우",
    role: "사업부장",
    company: "이커머스 기업",
    content:
      "쇼핑몰 리뉴얼 이후 매출이 눈에 띄게 증가했습니다. UX 개선 제안도 많이 해주셔서 더욱 좋았어요.",
    rating: 5,
    avatar: "/images/testimonials/avatar5.jpg",
  },
];

export const getTestimonialById = (id: string) => {
  return testimonials.find((testimonial) => testimonial.id === id);
};

// 평균 평점 계산
export const averageRating =
  testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
