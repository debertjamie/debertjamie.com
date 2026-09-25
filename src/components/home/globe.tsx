"use client";
import { useCallback, useEffect, useRef } from "react";
import { useDictionary } from "../DictionaryProvider";
import createGlobe, { type Globe } from "cobe";
import { MapPin } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const southeastAsiaMarkers: Array<{
  id: string;
  location: [number, number];
  size: number;
}> = [
  {
    id: "yogyakarta",
    location: [-7.765479212924204, 110.37173394417341],
    size: 0.03,
  },
];

export function Globe() {
  const dict = useDictionary();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    phi: number;
    theta: number;
  } | null>(null);
  const rotationRef = useRef({ phi: 2.75, theta: -0.15 });

  const updateRotation = useCallback((phi: number, theta: number) => {
    rotationRef.current = { phi, theta };
    globeRef.current?.update({
      phi,
      theta,
    });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      phi: rotationRef.current.phi,
      theta: rotationRef.current.theta,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStartRef.current) return;

      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      const nextPhi = dragStartRef.current.phi + deltaX / 180;
      const nextTheta = clamp(dragStartRef.current.theta - deltaY / 220, -1, 1);

      updateRotation(nextPhi, nextTheta);
    },
    [updateRotation],
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    dragStartRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const getSize = () => {
      const width = canvas.clientWidth || 280;
      return Math.min(Math.max(width, 220), 520);
    };

    const getDpr = () =>
      Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.8 : 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio: getDpr(),
      width: getSize(),
      height: getSize(),
      phi: rotationRef.current.phi,
      theta: rotationRef.current.theta,
      dark: 0,
      diffuse: 1.25,
      scale: 1.08,
      mapSamples: 18000,
      mapBrightness: 1.4,
      baseColor: [0.96, 0.98, 1],
      markerColor: [0.2, 0.2, 0.2],
      glowColor: [0.8, 0.8, 0.8],
      offset: [0.08, -0.06],
      markerElevation: 0.01,
      markers: southeastAsiaMarkers,
    });

    globeRef.current = globe;

    let animationId = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const nextWidth = Math.min(Math.max(entry.contentRect.width, 220), 520);
      globeRef.current?.update({
        devicePixelRatio: getDpr(),
        width: nextWidth,
        height: nextWidth,
      });
    });

    resizeObserver.observe(canvas);

    function animate() {
      if (globeRef.current) {
        globeRef.current.update({
          phi: rotationRef.current.phi,
          theta: rotationRef.current.theta,
        });
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();

    requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 px-2 sm:px-4 pt-4">
      <div className="z-20 flex items-center gap-2 text-base">
        <MapPin className="h-4 w-4" strokeWidth={2} />
        <span className="font-medium tracking-wide">
          {dict.home.globe.name}
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-72 sm:max-w-88 lg:max-w-104">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative z-10 size-full cursor-grab touch-none rounded-full opacity-0 transition-opacity duration-1000 ease-in-out"
        />
        {southeastAsiaMarkers.map((s) => (
          <div
            key={s.id}
            className="absolute z-50 pointer-events-none bottom-[anchor(top)] left-[anchor(center)] -translate-x-1/2 -translate-y-2 transition-[opacity,filter]"
            style={{
              positionAnchor: `--cobe-${s.id}`,
              opacity: `var(--cobe-visible-${s.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${s.id}, 0)) * 8px))`,
            }}
          >
            <span className="text-sm font-medium bg-mist-800 text-mist-50 px-2 py-0.5 rounded-2xl whitespace-nowrap">{dict.home.globe.loc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
