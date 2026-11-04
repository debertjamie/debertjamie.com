"use client";
import { useT } from "next-i18next/client";
import Image from "next/image";
import { Draggable } from "../commons/draggable";

// Sticker art is resized to 400px wide WebP (originals stay in /public/assets).
const stickers = [
  { src: "/assets/stickers/robot.webp", w: 400, h: 502, alt: "A small robot sticker", text: "discord", position: "left-[7%] top-[15%]", rotation: -9, width: "w-24 lg:w-32", zIndex: 3 },
  { src: "/assets/stickers/book.webp", w: 400, h: 302, alt: "An open book sticker", text: "psychology", position: "left-[29%] top-[10%]", rotation: 6, width: "w-28 lg:w-36", zIndex: 4 },
  { src: "/assets/stickers/keyboard.webp", w: 400, h: 270, alt: "A keyboard sticker", text: "webdev", position: "right-[7%] top-[14%]", rotation: -5, width: "w-32 lg:w-44", zIndex: 1 },
  { src: "/assets/stickers/camera.webp", w: 400, h: 329, alt: "A camera sticker", text: "camera", position: "left-[12%] bottom-[12%]", rotation: 8, width: "w-24 lg:w-32", zIndex: 4 },
  { src: "/assets/stickers/weather.webp", w: 400, h: 376, alt: "A weather sticker", text: "ml", position: "left-[32%] bottom-[16%]", rotation: -4, width: "w-24 lg:w-32", zIndex: 2 },
  { src: "/assets/stickers/music.webp", w: 400, h: 221, alt: "A music sticker", text: "music", position: "right-[10%] bottom-[12%]", rotation: 7, width: "w-24 lg:w-32", zIndex: 3 },
  { src: "/assets/stickers/board.webp", w: 400, h: 399, alt: "A chalkboard sticker", text: "teaching", position: "right-[36%] bottom-[10%]", rotation: 5, width: "w-20 lg:w-28", zIndex: 1 },
];

export function Scrapbook() {
  const { t } = useT("about");
  return (
    <section className="border-y border-mist-300">
      {/* Desktop: a corkboard of stickers. Each one can be dragged; hover or
          keyboard focus reveals the story behind it. */}
      <div className="relative mx-auto hidden min-h-160 max-w-6xl bg-[radial-gradient(var(--color-mist-300)_1px,transparent_1px)] bg-size-[18px_18px] px-4 py-8 md:block">
        <div className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-3">
          <h2 className="text-5xl italic">{t("scrapbook_title")}</h2>
          <p className="text-base text-mist-600">{t("scrapbook_hint")}</p>
        </div>
        {stickers.map((sticker) => (
          <Draggable
            key={sticker.src}
            initialRotation={sticker.rotation}
            baseZIndex={sticker.zIndex}
            tabIndex={0}
            role="group"
            aria-label={sticker.alt}
            className={`group absolute rounded-lg outline-offset-8 focus-visible:outline-2 focus-visible:outline-accent-mark focus-visible:z-40 ${sticker.position} ${sticker.width}`}
          >
            <div className="relative">
              <Image
                src={sticker.src}
                alt=""
                width={sticker.w}
                height={sticker.h}
                unoptimized
                className="pointer-events-none h-auto w-full drop-shadow-lg transition-transform duration-200 ease-out group-hover:scale-110 group-focus-visible:scale-110"
              />
              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-56 -translate-x-1/2 translate-y-2 rounded-xl border border-mist-300 bg-mist-100 p-3 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <p className="text-sm leading-relaxed">{t(`scrapbook.${sticker.text}`)}</p>
              </div>
            </div>
          </Draggable>
        ))}
      </div>

      {/* Mobile: the same stories as a plain list. */}
      <div className="px-4 sm:px-8 py-16 md:hidden">
        <h2 className="text-4xl italic pb-8">{t("scrapbook_title")}</h2>
        <ul className="flex flex-col divide-y divide-mist-300">
          {stickers.map((sticker) => (
            <li key={sticker.src} className="flex gap-4 py-5">
              <Image
                src={sticker.src}
                alt={sticker.alt}
                width={sticker.w}
                height={sticker.h}
                unoptimized
                className="h-14 w-14 shrink-0 object-contain"
              />
              <p className="text-base leading-relaxed">{t(`scrapbook.${sticker.text}`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
