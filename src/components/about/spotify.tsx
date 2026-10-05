"use client";
import { useT } from "next-i18next/client";
import useSWR from "swr";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";
import { ExtendedLink as Link } from "../commons/extendlink";

interface NowPlaying {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
  color: string;
  titleColor: string;
  bodyColor: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function Spotify() {
  const { t } = useT("about");
  const { data, error, isLoading } = useSWR<NowPlaying>(
    "/api/now-playing",
    fetcher,
    { refreshInterval: 10000 },
  );

  if (isLoading) {
    return (
      <div className="relative overflow-hidden min-h-36 rounded-xl bg-mist-200 px-4 py-2 flex flex-col justify-center">
        <div className="absolute inset-0 z-10 animate-shimmer bg-linear-to-r from-transparent via-mist-50/80 to-transparent" />
        <div className="flex gap-x-2">
          <div className="w-24 h-24 rounded-md bg-mist-300 shrink-0" />
          <div className="flex flex-col gap-y-2 justify-center min-w-0 flex-1">
            <div className="h-8 rounded bg-mist-300 w-3/4" />
            <div className="h-4 rounded bg-mist-300" />
            <div className="h-4 rounded bg-mist-300" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-36 rounded-xl bg-yellow-200 px-4 py-2 flex flex-col justify-center">
        <TriangleAlert className="h-8 w-8" />
        <p className="font-semibold">{t("stats.spotify.error")}</p>
      </div>
    );
  }

  if (!data?.isPlaying) {
    return (
      <div className="min-h-fit rounded-xl bg-mist-100 px-4 py-2 flex flex-col justify-center">
        <p className="font-semibold">
          {t("stats.spotify.noTracks.header")}
        </p>
        <p>{t("stats.spotify.noTracks.description")}</p>
      </div>
    );
  }

  return (
    <Link
      href={data.songUrl}
      style={{ background: data.color, color: data.bodyColor }}
      className="relative min-h-36 h-auto rounded-xl px-4 py-3.5 flex items-center gap-x-3 select-none"
    >
      <div className="relative w-24 h-24 rounded sm:rounded-lg overflow-hidden shrink-0 bg-mist-300">
        <span aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={data.albumImageUrl}
            alt={data.album}
            fill
            quality={100}
            sizes="96px"
            className="object-cover object-center"
          />
        </span>
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1 pr-8 wrap-break-word">
        <p style={{ color: data.titleColor }} className="text-xl font-semibold leading-snug">
          {data.title}
        </p>
        <p className="text-sm leading-snug">{data.artist}</p>
        <p className="text-sm leading-snug">{data.album}</p>
      </div>
      <div className="absolute top-4 right-4">
        <Image
          src="/spotify_white.svg"
          alt="Spotify logo"
          width={25}
          height={25}
        />
      </div>
    </Link>
  );
}
