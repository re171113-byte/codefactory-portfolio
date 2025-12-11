import { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  {
    name: "React / Next.js",
    level: 95,
    category: "frontend",
  },
  {
    name: "TypeScript",
    level: 90,
    category: "frontend",
  },
  {
    name: "Vue.js / Nuxt",
    level: 85,
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    level: 95,
    category: "frontend",
  },
  {
    name: "Framer Motion / GSAP",
    level: 85,
    category: "frontend",
  },

  // Backend
  {
    name: "Node.js",
    level: 90,
    category: "backend",
  },
  {
    name: "Python / Django",
    level: 80,
    category: "backend",
  },
  {
    name: "PostgreSQL / MongoDB",
    level: 85,
    category: "backend",
  },
  {
    name: "REST API / GraphQL",
    level: 90,
    category: "backend",
  },

  // Mobile
  {
    name: "React Native",
    level: 85,
    category: "mobile",
  },
  {
    name: "Flutter",
    level: 75,
    category: "mobile",
  },

  // Design
  {
    name: "Figma",
    level: 90,
    category: "design",
  },
  {
    name: "UI/UX Design",
    level: 85,
    category: "design",
  },

  // Tools
  {
    name: "Git / GitHub",
    level: 95,
    category: "tool",
  },
  {
    name: "Docker / AWS",
    level: 80,
    category: "tool",
  },
  {
    name: "Vercel / Netlify",
    level: 95,
    category: "tool",
  },
];

// 카테고리별 스킬 필터링
export const getSkillsByCategory = (category: Skill["category"]) => {
  return skills.filter((skill) => skill.category === category);
};

// 상위 스킬 (레벨 기준)
export const topSkills = skills
  .sort((a, b) => b.level - a.level)
  .slice(0, 6);
