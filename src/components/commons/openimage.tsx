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

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  return (
    <>
      <Image
        {...props}
        alt={alt}
        onClick={(event) => {
          onClick?.(event);
          setOpen(true);
        }}
        className={["cursor-pointer", props.className]
          .filter(Boolean)
          .join(" ")}
        style={style}
      />

      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-mist-100/50 backdrop-blur-lg p-6"
        >
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

type OpenTextImageProps = ImageProps & {
  caption?: string;
  children: React.ReactNode;
};

export function OpenTextImage({
  caption,
  children,
  alt,
  style,
  ...props
}: OpenTextImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-mist-500/75 p-6"
        >
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
              style={style}
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
