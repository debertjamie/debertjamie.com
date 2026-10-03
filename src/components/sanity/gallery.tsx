"use client";
import { useT } from "next-i18next/client";
import type { SanityImageSource } from "@sanity/image-url";
import { ImageComponent } from "./image";

type GalleryValue = {
  title: string;
  images: {
    caption: string;
    alt: string;
    asset: { _ref: SanityImageSource; _type: string };
  }[];
};

export function GalleryComponent({ value }: { value: GalleryValue }) {
  const { t } = useT();
  return (
    <div className="px-4 pb-1 pt-4 border border-mist-300 bg-mist-100 rounded-lg">
      <span className="font-semibold">{value.title}</span>
      <div className="px-4 flex flex-nowrap gap-x-4 overflow-auto scrollbar-none">
        {value.images.map((image, index) => (
          <div key={index} className="shrink-0">
            <ImageComponent
              value={{
                caption: image.caption,
                alt: image.alt,
                src: image.asset._ref,
                openImage: true,
              }}
            />
          </div>
        ))}
      </div>
      <span className="text-sm">{t("sanity.gallery")}</span>
    </div>
  );
}