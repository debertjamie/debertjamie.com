import { Vibrant } from "node-vibrant/node";
import { getNowPlaying } from "@/src/lib/spotify";

interface SongResponse {
  item: {
    name: string;
    artists: {
      name: string;
    }[];
    album: {
      name: string;
      images: {
        url: string;
      }[];
    };
    external_urls: {
      spotify: string;
    };
  };
  is_playing: boolean;
}

export async function GET() {
  let res: Awaited<ReturnType<typeof getNowPlaying>>;

  try {
    res = await getNowPlaying();
  } catch (error) {
    return new Response(
      JSON.stringify({ isPlaying: false, error: true, message: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 503,
        headers: {
          "content-type": "application/json",
          "Cache-Control": "no-cache",
        },
      },
    );
  }

  if (res.status === 204) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  }

  if (!res.ok) {
    const text = await res.text();
    return new Response(
      JSON.stringify({ isPlaying: false, error: true, message: text }),
      {
        status: res.status,
        headers: {
          "content-type": "application/json",
          "Cache-Control": "no-cache",
        },
      },
    );
  }

  const song = (await res.json()) as SongResponse;
  if (song.item === null) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    .map((_artist: { name: string }) => _artist.name)
    .join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0]?.url ?? "";
  const songUrl = song.item.external_urls.spotify;

  const albumImageSmall = song.item.album.images[song.item.album.images.length - 1]?.url ?? "";
  const palette = await (Vibrant.from(albumImageSmall)).getPalette();
  const color = palette?.Vibrant?.hex ?? "#1DB954";
  const titleColor = palette?.Vibrant?.titleTextColor ?? "#FFFFFF";
  const bodyColor = palette?.Vibrant?.bodyTextColor ?? "#FFFFFF";

  return new Response(
    JSON.stringify({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      color,
      titleColor,
      bodyColor,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Cache-Control": "public, max-age=0, s-maxage=3",
      },
    },
  );
}
