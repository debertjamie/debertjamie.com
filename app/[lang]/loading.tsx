"use client";
import { useEffect, useState } from "react";
import { useDictionary } from "@/src/components/DictionaryProvider";

export default function Loading() {
  const dict = useDictionary();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % dict.loading.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [dict.loading.length]);

  const currentMessage = dict.loading[messageIndex] || "Loading...";

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
