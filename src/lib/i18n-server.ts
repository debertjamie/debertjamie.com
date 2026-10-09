import {
  getResources,
  getT,
  generateI18nStaticParams,
  initServerI18next,
} from "next-i18next/server";
import i18nConfig from "@/i18n.config";

// Initialize the next-i18next server singleton as a top-level side effect.
// Any module that imports getT/getResources from here is guaranteed to have
// run this first, so `_config` is populated in every (stateless) Workers isolate
// before getConfig() runs. init is cheap and idempotent.
initServerI18next(i18nConfig);

export { getResources, getT, generateI18nStaticParams };
