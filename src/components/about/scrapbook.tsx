"use client";
import Image from "next/image";
import { useDictionary } from "../DictionaryProvider";
import { Draggable } from "../commons/draggable";

const stickers = [
  {
    src: "/assets/robot.png",
    alt: "A small robot sticker",
    text: "discord",
    position: "left-[7%] top-[15%]",
    rotation: -9,
    width: "w-24 lg:w-32",
    zIndex: 3,
  },
  {
    src: "/assets/book.png",
    alt: "An open book sticker",
    text: "psychology",
    position: "left-[29%] top-[10%]",
    rotation: 6,
    width: "w-28 lg:w-36",
    zIndex: 4,
  },
  {
    src: "/assets/keyboard.png",
    alt: "A keyboard sticker",
    text: "webdev",
    position: "right-[7%] top-[14%]",
    rotation: -5,
    width: "w-32 lg:w-44",
    zIndex: 1,
  },
  {
    src: "/assets/camera.png",
    alt: "A camera sticker",
    text: "camera",
    position: "left-[12%] bottom-[9%]",
    rotation: 8,
    width: "w-24 lg:w-32",
    zIndex: 4,
  },
  {
    src: "/assets/weather.png",
    alt: "A weather sticker",
    text: "ml",
    position: "left-[32%] bottom-[14%]",
    rotation: -4,
    width: "w-24 lg:w-32",
    zIndex: 2,
  },
  {
    src: "/assets/music.png",
    alt: "A music sticker",
    text: "music",
    position: "right-[10%] bottom-[10%]",
    rotation: 7,
    width: "w-24 lg:w-32",
    zIndex: 3,
  },
  {
    src: "/assets/board.png",
    alt: "A chalkboard sticker",
    text: "teaching",
    position: "right-[36%] bottom-[8%]",
    rotation: 5,
    width: "w-20 lg:w-28",
    zIndex: 1,
  },
];

export function Scrapbook() {
  const dict = useDictionary();
  return (
    <div className="border-y border-mist-300">
      <div className="relative mx-auto hidden min-h-152 max-w-6xl bg-[radial-gradient(#d7cec0_1px,transparent_1px)] bg-size-[18px_18px] px-4 py-8 md:block">
        {stickers.map((sticker, i) => (
          <Draggable
            key={i}
            initialRotation={sticker.rotation}
            baseZIndex={sticker.zIndex}
            className={`group absolute transition-transform duration-300 ease-out ${sticker.position} ${sticker.width}`}
          >
            <div className="relative">
              <Image
                src={sticker.src}
                alt={sticker.alt}
                width={176}
                height={176}
                className="pointer-events-none h-auto w-auto drop-shadow-lg transition-all duration-200 ease-out group-hover:drop-shadow-xl group-hover:scale-110"
              />
              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-48 -translate-x-1/2 translate-y-2 rounded-xl border border-mist-300 bg-mist-100/95 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm leading-relaxed">
                  {
                    dict.about.scrapbook[
                      sticker.text as keyof typeof dict.about.scrapbook
                    ]
                  }
                </p>
              </div>
            </div>
          </Draggable>
        ))}
        <div className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-3xl italic sm:text-5xl">a little about me</span>
        </div>
      </div>
      <div className="px-5 py-10 md:hidden">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 flex items-end justify-between border-b border-dashed border-mist-300 pb-4">
            <div>
              <h2 className="mt-2 text-3xl italic">a little about me</h2>
            </div>
          </div>
          <div className="space-y-4">
            {stickers.map((sticker, index) => (
              <article
                key={`mobile-${sticker.src}`}
                className="flex gap-4 border-b border-mist-300/70 pb-4 last:border-b-0"
              >
                <div className="flex w-16 shrink-0 flex-col items-center gap-2">
                  <Image
                    src={sticker.src}
                    alt={sticker.alt}
                    width={96}
                    height={96}
                    className="h-14 w-14 object-contain drop-shadow-md"
                  />
                  <span className="font-mono text-[0.65rem] text-mist-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="pt-1 text-sm leading-6">
                  {
                    dict.about.scrapbook[
                      sticker.text as keyof typeof dict.about.scrapbook
                    ]
                  }
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
