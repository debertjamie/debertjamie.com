"use client";

import Image from "next/image";
import { Draggable } from "./draggable";

type CardProps = {
  src: string;
  alt: string;
  initialRotation: number;
  initialX: number;
  initialY: number;
  baseZIndex: number;
  loading?: "lazy" | "eager";
};

export function StackImage({
  src,
  alt,
  initialRotation,
  initialX,
  initialY,
  baseZIndex,
  loading
}: CardProps) {
  return (
    <Draggable
      initialRotation={initialRotation}
      initialX={initialX}
      initialY={initialY}
      baseZIndex={baseZIndex}
      className="absolute h-42 w-32 origin-center overflow-hidden rounded-2xl border-4 border-mist-300 bg-mist-200 shadow-2xl transition-transform duration-300 ease-out hover:scale-105 sm:h-72 sm:w-56"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="pointer-events-none object-cover"
        sizes="(max-width: 768px) 100vw, 300px"
        loading={loading}
      />
    </Draggable>
  );
}
