const dictionaries = {
  en: () => import("../../src/dictionary/en.json").then((module) => module.default),
  "zh-CN": () =>
    import("../../src/dictionary/zh-CN.json").then((module) => module.default),
};

export async function getDictionary(locale: "en" | "zh-CN") {
  return dictionaries[locale]?.() ?? dictionaries.en();
}
