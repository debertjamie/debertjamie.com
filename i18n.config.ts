import type { I18nConfig } from "next-i18next/proxy";

const i18nConfig: I18nConfig = {
  supportedLngs: ["en", "zh-CN"],
  fallbackLng: "en",
  defaultNS: "common",
  ns: [
    "common",
    "about",
    "blog",
    "contact",
    "friends",
    "guestbook",
    "home",
    "layout",
    "nav",
    "now",
    "projects",
    "wechat",
  ],
  cookieName: "selectedLanguage",
  resourceLoader: async (language, namespace) => {
    if (namespace !== "common") {
      const translations = await import(`./src/dictionary/${language}/${namespace}.json`);
      return translations.default;
    }

    const translations = await import(`./src/dictionary/${language}.json`);
    return translations.default;
  },
};

export default i18nConfig;
