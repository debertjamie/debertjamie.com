import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import { urlFor } from "@/src/lib/sanity/image";
import { OpenImage } from "@/src/components/commons/openimage";

type ImageValue = {
  caption: string;
  alt: string;
  src: SanityImageSource;
  openImage?: boolean;
};

export function ImageComponent({ value }: { value: ImageValue }) {
  return (
    <figure className="my-4">
      {value.openImage ? (
        <OpenImage
          caption={value.caption ?? value.alt}
          className="rounded-sm h-64 w-48 object-cover object-top-left aspect-auto duration-300"
          src={urlFor(value.src).url()}
          alt={value.alt}
          loading="lazy"
          width={160}
          height={120}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          blurDataURL={urlFor(value.src).blur(10).quality(20).url()}
        />
      ) : (
        <Image
          className="rounded-sm h-64 w-48 object-cover object-top-left aspect-auto duration-300"
          src={urlFor(value.src).url()}
          alt={value.alt}
          loading="lazy"
          width={160}
          height={120}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          blurDataURL={urlFor(value.src).blur(10).quality(20).url()}
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