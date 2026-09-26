import { wakatimeKey } from "./env";
import { unstable_cache as cache } from "next/cache";

interface WakatimeStats {
    total_seconds: number;
    daily_average: number;
    languages: {
        name: string;
        percent: number;
        total_seconds: number;
    }[];
    editors: {
        name: string;
    }[];
    best_day: {
        date: string;
        total_seconds: number;
    };
}

export const getWakatimeData = cache(
  async () => {
    const token = wakatimeKey!;
    const headers = {
      Authorization: `Basic ${Buffer.from(token).toString("base64")}`,
    };
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats",
      {
        headers: headers,
      },
    );
    const data = await response.json();
    return data.data as WakatimeStats;
  },
  [],
  { revalidate: 3600 },
);

export const getWakatimeWeeklyData = cache(
  async () => {
    const token = wakatimeKey!;
    const headers = {
      Authorization: `Basic ${Buffer.from(token).toString("base64")}`,
    };
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: headers,
      },
    );
    const data = await response.json();
    return data.data;
  },
  [],
  { revalidate: 3600 },
);