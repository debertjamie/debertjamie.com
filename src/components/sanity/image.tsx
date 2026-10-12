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

export function ImageComponent({ value }: { value: ImageValue }) {
  // Resolve the source from either the gallery `src` or the inline block `asset`.
  const source = value.src ?? value.asset;

  // Defensive guard: never call urlFor on an undefined/empty source. A single
  // bad author-authored image block must not crash the whole blog page.
  if (!source) return null;

  return (
    <figure className="my-4">
      {value.openImage ? (
        <OpenImage
          caption={value.caption ?? value.alt}
          className="rounded-sm h-64 w-48 object-cover object-top-left aspect-auto duration-300"
          src={urlFor(source).url()}
          alt={value.alt ?? ""}
          loading="lazy"
          width={160}
          height={120}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          blurDataURL={urlFor(source).blur(10).quality(20).url()}
        />
      ) : (
        <Image
          className="rounded-sm h-64 w-48 object-cover object-top-left aspect-auto duration-300"
          src={urlFor(source).url()}
          alt={value.alt ?? ""}
          loading="lazy"
          width={160}
          height={120}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          blurDataURL={urlFor(source).blur(10).quality(20).url()}
        />
      )}
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