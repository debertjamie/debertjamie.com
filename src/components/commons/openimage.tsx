"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

type OpenImageProps = ImageProps & {
  caption?: string;
};

export function OpenImage({
  caption,
  onClick,
  alt,
  style,
  ...props
}: OpenImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Keyboard users open it with Enter or Space, close with Escape. */}
      <Image
        {...props}
        alt={alt}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={(event) => {
          onClick?.(event);
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={["cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-mark", props.className]
          .filter(Boolean)
          .join(" ")}
        style={style}
      />

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-mist-100/50 backdrop-blur-lg p-6"
        >
          <button
            type="button"
            autoFocus
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-mist-900 text-mist-50 text-2xl leading-none hover:bg-accent hover:text-accent-ink"
          >
            <span aria-hidden>×</span>
          </button>
          <div
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-3"
          >
            <Image
              {...props}
              alt={alt}
              quality={100}
              unoptimized
              className="h-auto w-auto max-h-[80vh] max-w-[90vw] object-contain"
            />

            {caption ? (
              <div className="text-center text-sm leading-6">
                {caption}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
