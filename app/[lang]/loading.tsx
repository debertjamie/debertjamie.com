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
    <main className="flex flex-col flex-1 w-full justify-center items-center">
      <div className="flex gap-x-0.5 items-center justify-center mb-4">
        <div
          className="w-5 h-5 bg-mist-800 rounded-sm shadow-sm animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-5 h-5 bg-mist-800 rounded-sm shadow-sm animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-5 h-5 bg-mist-800 rounded-sm shadow-sm animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <p className="text-xl">{currentMessage}</p>
    </main>
  );
}
