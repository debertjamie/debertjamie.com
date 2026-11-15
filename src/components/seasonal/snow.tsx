"use client";
import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

type Flake = { x: number; y: number; depth: number; phase: number };

const AREA_PER_FLAKE = 12000;
const MAX_FLAKES = 140;

const LIGHT_RGB = "150, 185, 225";
const DARK_RGB = "255, 255, 255";

const radius = (f: Flake) => 1.2 + f.depth * f.depth * 4.5;
const speed = (f: Flake) => 18 + f.depth * 55;
const alpha = (f: Flake) => 0.35 + f.depth * 0.6;

function makeFlake(width: number, height: number, y = Math.random() * height): Flake {
  const depth = Math.random() ** 2;
  return { x: Math.random() * width, y, depth, phase: Math.random() * Math.PI * 2 };
}

function makeSprite(rgb: string): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = size;
  const ctx = sprite.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `rgba(${rgb}, 1)`);
  g.addColorStop(0.45, `rgba(${rgb}, 0.85)`);
  g.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    const isDark = () => document.documentElement.classList.contains("dark");
    let sprite = makeSprite(isDark() ? DARK_RGB : LIGHT_RGB);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        const d = radius(f) * 2;
        ctx.globalAlpha = alpha(f);
        ctx.drawImage(sprite, f.x - d, f.y - d, d * 2, d * 2);
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_FLAKES, Math.round((width * height) / AREA_PER_FLAKE));
      flakes = Array.from({ length: reduced ? Math.round(count / 2) : count }, () =>
        makeFlake(width, height),
      );
      draw();
    };

    const themeObserver = new MutationObserver(() => {
      sprite = makeSprite(isDark() ? DARK_RGB : LIGHT_RGB);
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // Reduced motion: a still scattering of flakes, no animation loop.
    if (reduced) {
      return () => {
        themeObserver.disconnect();
        resizeObserver.disconnect();
      };
    }

    let frame = 0;
    let last = 0;
    let visible = true;

    const tick = (time: number) => {
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;
      for (const f of flakes) {
        const r = radius(f) * 2;
        f.y += speed(f) * dt;
        f.x += Math.sin(time / 1400 + f.phase) * (8 + f.depth * 22) * dt;
        if (f.y - r > height) Object.assign(f, makeFlake(width, height, -r));
        if (f.x < -r) f.x = width + r;
        else if (f.x > width + r) f.x = -r;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const viewObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    viewObserver.observe(canvas);
    start();

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      viewObserver.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
