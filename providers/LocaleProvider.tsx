"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { IntlProvider } from "next-intl";
import { Locale, defaultLocale, locales } from "@/i18n/config";
import koMessages from "@/messages/ko.json";
import enMessages from "@/messages/en.json";

const messages: Record<Locale, typeof koMessages> = {
  ko: koMessages,
  en: enMessages,
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  toggleLocale: () => {},
});

const LOCALE_STORAGE_KEY = "codefactory-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  // 초기 로케일 로드
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // 브라우저 언어 감지
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLocaleState("en");
      }
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    // HTML lang 속성 업데이트
    document.documentElement.lang = newLocale;
  }, []);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === "ko" ? "en" : "ko";
    setLocale(newLocale);
  }, [locale, setLocale]);

  // SSR에서도 기본 context 제공
  const contextValue = {
    locale: mounted ? locale : defaultLocale,
    setLocale,
    toggleLocale,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      <IntlProvider locale={mounted ? locale : defaultLocale} messages={messages[mounted ? locale : defaultLocale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
