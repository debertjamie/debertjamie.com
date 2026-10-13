import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import { urlFor } from "@/src/lib/sanity/image";
import { OpenImage } from "@/src/components/commons/openimage";

type ImageValue = {
  caption?: string;
  alt?: string;
  // Inline Portable Text image blocks arrive as the default Sanity shape
  // `{ asset: { _ref } }`, while gallery passes a bare `_ref` string via `src`.
  src?: SanityImageSource;
  asset?: SanityImageSource;
  openImage?: boolean;
};

// Sanity asset refs encode the original pixel size, e.g.
// "image-<hash>-1495x969-png". Parse it so inline images can render at their
// true aspect ratio (no cropping) and reserve correct layout space.
function dimensionsFromSource(
  source: SanityImageSource,
): { width: number; height: number } | null {
  const ref =
    typeof source === "string"
      ? source
      : typeof source === "object" &&
          source !== null &&
          "_ref" in source &&
          typeof (source as { _ref?: unknown })._ref === "string"
        ? (source as { _ref: string })._ref
        : null;
  if (!ref) return null;

  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return null;

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return null;

  return { width, height };
}

export function ImageComponent({ value }: { value: ImageValue }) {
  // Resolve the source from either the gallery `src` or the inline block `asset`.
  const source = value.src ?? value.asset;

  // Defensive guard: never call urlFor on an undefined/empty source. A single
  // bad author-authored image block must not crash the whole blog page.
  if (!source) return null;

  // Gallery items (openImage) keep the fixed thumbnail look used in the
  // horizontal strip. Inline body images render at their natural aspect ratio.
  if (value.openImage) {
    return (
      <figure className="my-4">
        <OpenImage
          caption={value.caption ?? value.alt}
          className="rounded-sm h-64 w-48 object-cover object-top-left aspect-auto duration-300"
          src={urlFor(source).url()}
          alt={value.alt ?? ""}
          loading="lazy"
          width={160}
          height={120}
          placeholder="blur"
          quality={75}
          sizes="192px"
          blurDataURL={urlFor(source).blur(10).quality(20).url()}
        />
        {value.caption && (
          <figcaption className="text-sm text-mist-800/80 mt-2">
            {value.caption.length > 10
              ? `${value.caption.substring(0, 10)}...`
              : value.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Inline blog image: fit the content column, preserve aspect ratio, no crop.
  const dimensions = dimensionsFromSource(source);
  const width = dimensions?.width ?? 1200;
  const height = dimensions?.height ?? 800;

  return (
    <figure className="my-4">
      <Image
        className="rounded-sm h-auto w-full max-w-full duration-300"
        src={urlFor(source).url()}
        alt={value.alt ?? ""}
        loading="lazy"
        width={width}
        height={height}
        placeholder="blur"
        quality={75}
        sizes="(max-width: 768px) 100vw, 768px"
        blurDataURL={urlFor(source).blur(10).quality(20).url()}
      />
      {value.caption && (
        <figcaption className="text-sm text-mist-800/80 mt-2">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
