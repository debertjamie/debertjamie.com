"use client";
import { useEffect, useState } from "react";
import { useT } from "next-i18next/client";

export default function Loading() {
  const { t } = useT("layout");
  const messages = t("loading", {
    returnObjects: true,
  }) as unknown as string[];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const currentMessage = messages[messageIndex] ?? "Loading...";

  return (
    <main
      className="flex flex-col flex-1 justify-center gap-6 px-4 sm:px-8 py-32"
      aria-busy="true"
    >
      <div className="flex gap-2" aria-hidden>
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-3 rounded-full bg-mist-900 motion-safe:animate-pulse"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
      <p className="text-2xl sm:text-4xl font-semibold tracking-tight text-mist-700" role="status">
        {currentMessage}
      </p>
    </main>
  );
}
