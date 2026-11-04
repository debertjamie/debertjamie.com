"use client";
import { useT } from "next-i18next/client";
import useSWR from "swr";
import Image from "next/image";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { ExtendedLink as Link } from "../commons/extendlink";

interface NowPlaying {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

const fac = new FastAverageColor();

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function Spotify() {
  const { t } = useT("about");
  const { data, error, isLoading } = useSWR<NowPlaying>(
    "/api/now-playing",
    fetcher,
    { refreshInterval: 10000 },
  );
  const [colors, setColors] = useState({
    bg: "#1DB954",
    text: "#FFFFFF",
  });
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (!data?.albumImageUrl) return;
    fac.getColorAsync(data.albumImageUrl, { algorithm: "dominant" })
      .then((color) => {
        setColors({
          bg: color.hex,
          text: color.isDark ? "#FFFFFF" : "#121212",
        });
        setIsDark(color.isDark);
      }).catch(() => {
        setColors({ bg: "#1DB954", text: "#FFFFFF" });
        setIsDark(true);
      });
  }, [data?.albumImageUrl]);

  const card = "h-full min-h-56 rounded-3xl p-6 flex flex-col gap-4";
  const label = <p className="text-base font-medium text-mist-600">{t("stats.spotify.title")}</p>;

  if (isLoading) {
    return (
      <div className={`${card} border border-mist-300`} aria-busy>
        {label}
        <div className="flex gap-4 animate-pulse" aria-hidden>
          <div className="size-28 rounded-xl bg-mist-200 shrink-0" />
          <div className="flex flex-col gap-3 justify-center flex-1">
            <div className="h-7 rounded bg-mist-200 w-3/4" />
            <div className="h-4 rounded bg-mist-200 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${card} border border-mist-300`}>
        {label}
        <p className="flex items-center gap-2 text-lg">
          <TriangleAlert className="size-5 shrink-0" aria-hidden />
          {t("stats.spotify.error")}
        </p>
      </div>
    );
  }

  if (!data?.isPlaying) {
    return (
      <div className={`${card} border border-mist-300`}>
        {label}
        <p className="text-3xl font-semibold tracking-tight">{t("stats.spotify.noTracks.header")}</p>
        <p className="text-lg text-mist-700">{t("stats.spotify.noTracks.description")}</p>
      </div>
    );
  }

  // Card takes the album's dominant color, so it changes with every song.
  return (
    <Link
      href={data.songUrl}
      style={{ background: colors.bg, color: colors.text }}
      className={`${card} relative select-none transition-transform duration-300 hover:-translate-y-1`}
    >
      <p className="text-base font-medium opacity-80">{t("stats.spotify.title")}</p>
      <div className="flex items-center gap-4">
        <div className="relative size-28 rounded-xl overflow-hidden shrink-0">
          <Image
            src={data.albumImageUrl}
            alt={data.album}
            fill
            unoptimized
            sizes="112px"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1 wrap-break-word">
          <p className="text-2xl font-semibold leading-tight tracking-tight">{data.title}</p>
          <p className="text-base leading-snug pt-1">{data.artist}</p>
          <p className="text-sm leading-snug opacity-80">{data.album}</p>
        </div>
      </div>
      <Image
        src="/spotify_white.svg"
        alt="Spotify"
        width={25}
        height={25}
        unoptimized
        className={`absolute top-6 right-6 ${isDark ? "" : "brightness-0"}`}
      />
    </Link>
  );
}
