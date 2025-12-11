import { Profile, Stat } from "@/types";

export const profile: Profile = {
  name: "코드팩토리",
  title: "웹/앱 개발자",
  tagline: "아이디어를 현실로 만드는 풀스택 개발자",
  bio: [
    "안녕하세요! 10년 이상의 경험을 가진 풀스택 개발자 코드팩토리입니다.",
    "클라이언트의 비전을 현실로 구현하는 것을 즐기며, 최신 기술 트렌드를 활용하여 고품질의 웹사이트와 앱을 제작합니다.",
    "숨고 플랫폼에서 150+ 프로젝트를 성공적으로 완료하였으며, 고객 만족도 98%를 유지하고 있습니다.",
  ],
  email: "contact@codefactory.dev",
  phone: "010-1234-5678",
  location: "서울, 대한민국",
  avatar: "/images/avatar.jpg",
  socials: [
    {
      platform: "github",
      url: "https://github.com/codefactory",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/codefactory",
      label: "LinkedIn",
    },
    {
      platform: "instagram",
      url: "https://instagram.com/codefactory",
      label: "Instagram",
    },
  ],
  resumeUrl: "/resume.pdf",
};

export const stats: Stat[] = [
  {
    label: "완료 프로젝트",
    value: 150,
    suffix: "+",
  },
  {
    label: "만족한 고객",
    value: 120,
    suffix: "+",
  },
  {
    label: "개발 경력",
    value: 10,
    suffix: "년+",
  },
  {
    label: "재의뢰율",
    value: 98,
    suffix: "%",
  },
];
