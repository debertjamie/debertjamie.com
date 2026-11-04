import { wakatimeKey } from "./env";
import { unstable_cache as cache } from "next/cache";

interface WakatimeStats {
  languages: {
    name: string;
    percent: number;
    total_seconds: number;
  }[];
}

export const getWakatimeData = cache(
  async () => {
    const token = wakatimeKey!;
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats?api_key=" + token,
    );
    const data = await response.json();
    return data.data as WakatimeStats;
  },
  [],
  { revalidate: 3600 },
);
