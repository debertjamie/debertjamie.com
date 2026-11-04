const SITE = "https://debertjamie.com";

// Each page is canonical to its own localized URL and lists the other
// language as an alternate. `path` is the route without the locale, e.g. "/about".
export function alternates(lang: string, path = "") {
  return {
    canonical: `${SITE}/${lang}${path}`,
    languages: {
      en: `${SITE}/en${path}`,
      "zh-CN": `${SITE}/zh-CN${path}`,
      "x-default": `${SITE}/en${path}`,
    },
  };
}
