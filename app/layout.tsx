import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingContactButton from "@/components/ui/FloatingContactButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 폰트 설정
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// 메타데이터
export const metadata: Metadata = {
  metadataBase: new URL("https://codefactory.vercel.app"),
  title: "코드팩토리 | 웹/앱 개발자 포트폴리오",
  description:
    "5년 이상의 경험을 가진 풀스택 개발자 코드팩토리입니다. 웹사이트, 모바일 앱, UI/UX 디자인 서비스를 제공합니다.",
  keywords: [
    "웹 개발",
    "앱 개발",
    "풀스택 개발자",
    "프리랜서 개발자",
    "React",
    "Next.js",
    "포트폴리오",
  ],
  authors: [{ name: "코드팩토리" }],
  creator: "코드팩토리",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://codefactory.dev",
    title: "코드팩토리 | 웹/앱 개발자 포트폴리오",
    description:
      "5년 이상의 경험을 가진 풀스택 개발자. 웹사이트, 모바일 앱, UI/UX 디자인.",
    siteName: "코드팩토리 포트폴리오",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "코드팩토리 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "코드팩토리 | 웹/앱 개발자 포트폴리오",
    description: "5년 이상의 경험을 가진 풀스택 개발자",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0F1A",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "코드팩토리",
  url: "https://codefactory.vercel.app",
  image: "https://codefactory.vercel.app/og-image.jpg",
  jobTitle: "풀스택 개발자",
  worksFor: {
    "@type": "Organization",
    name: "프리랜서",
  },
  sameAs: [
    "https://github.com/codefactory",
    "https://linkedin.com/in/codefactory",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
    "웹 개발",
    "앱 개발",
  ],
  description: "5년 이상의 경험을 가진 풀스택 개발자",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "웹/앱 개발",
  provider: {
    "@type": "Person",
    name: "코드팩토리",
  },
  areaServed: "대한민국",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "개발 서비스",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "웹사이트 개발",
          description: "반응형 웹사이트, 랜딩페이지, 기업 홈페이지 개발",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "모바일 앱 개발",
          description: "iOS, Android 크로스플랫폼 앱 개발",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX 디자인",
          description: "사용자 경험 중심의 인터페이스 디자인",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKr.variable}`} suppressHydrationWarning>
      <head>
        {/* 리소스 힌트 - 성능 최적화 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://vercel.com" />

        {/* PWA 메타 태그 */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="코드팩토리" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />

        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>
            {/* 스킵 네비게이션 (접근성) */}
            <a href="#main-content" className="skip-to-content">
              본문으로 바로가기
            </a>

            {/* 로딩 스크린 */}
            <LoadingScreen />

            {/* 커스텀 커서 */}
            <CustomCursor />

            {/* 스크롤 프로그레스 바 */}
            <ScrollProgress />

            {/* Lenis 스무스 스크롤 Provider */}
            <LenisProvider>
              {/* 노이즈 텍스처 오버레이 */}
              <div className="noise-overlay" aria-hidden="true" />

              {/* 배경 그라디언트 오브 */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="gradient-orb gradient-orb-1" />
                <div className="gradient-orb gradient-orb-2" />
              </div>

              {/* 메인 콘텐츠 */}
              {children}
            </LenisProvider>

            {/* 모바일 FAB (Contact 바로가기) */}
            <FloatingContactButton />

            {/* Vercel Analytics & Speed Insights */}
            <Analytics />
            <SpeedInsights />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
