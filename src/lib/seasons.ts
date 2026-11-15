export type SeasonId = "christmas";

type Season = {
  id: SeasonId;
  /** Inclusive range as "MM-DD", evaluated in Asia/Jakarta time. */
  start: string;
  end: string;
};

// Lunar seasons (CNY, Mid-Autumn) move every year; add them with per-year dates.
const SEASONS: Season[] = [{ id: "christmas", start: "12-01", end: "12-31" }];

const SEASON_IDS = new Set<string>(SEASONS.map((s) => s.id));

function todayInJakarta(now: Date): string {
  // en-CA formats as YYYY-MM-DD; keep the MM-DD part.
  return now.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }).slice(5);
}

/** `?season=christmas` forces a season for previewing, `?season=none` disables it. */
export function getActiveSeason(now: Date, search: string): SeasonId | null {
  const forced = new URLSearchParams(search).get("season");
  if (forced === "none") return null;
  if (forced && SEASON_IDS.has(forced)) return forced as SeasonId;

  const today = todayInJakarta(now);
  return SEASONS.find((s) => s.start <= today && today <= s.end)?.id ?? null;
}
