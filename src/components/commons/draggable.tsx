"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

type DraggableProps = {
  children: ReactNode;
  initialRotation?: number;
  initialX?: number;
  initialY?: number;
  baseZIndex?: number;
  className?: string;
  style?: CSSProperties;
};

export function Draggable({
  children,
  initialRotation = 0,
  initialX = 0,
  initialY = 0,
  baseZIndex = 1,
  className = "",
  style,
}: DraggableProps) {
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startCursorPos = useRef({ x: 0, y: 0 });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    startCursorPos.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDragDelta({
      x: event.clientX - startCursorPos.current.x,
      y: event.clientY - startCursorPos.current.y,
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragDelta({ x: 0, y: 0 });
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`touch-none select-none cursor-grab active:cursor-grabbing ${isDragging ? "z-50" : ""} ${className}`}
      style={{
        ...style,
        zIndex: isDragging ? 50 : baseZIndex,
        transform: `translate(${initialX + dragDelta.x}px, ${initialY + dragDelta.y}px) rotate(${initialRotation}deg)`,
      }}
    >
      {children}
    </div>
  );
}