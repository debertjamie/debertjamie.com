"use client";
import { useDictionary } from "@/src/components/DictionaryProvider";
import { wechatUrl } from "@/src/lib/env";
import { DesignQR } from "designqr";
import { Scan, TreeDeciduous } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

function getLowPerformanceDevice() {
  const browserNavigator = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  const { connection, deviceMemory, hardwareConcurrency } = browserNavigator;

  return (
    connection?.saveData === true ||
    (deviceMemory !== undefined && deviceMemory <= 4) ||
    (hardwareConcurrency !== undefined && hardwareConcurrency <= 4)
  );
}

const subscribeToPerformanceChanges = () => () => {};

export default function WeChat() {
  const dict = useDictionary();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLowPerformanceDevice = useSyncExternalStore(
    subscribeToPerformanceChanges,
    getLowPerformanceDevice,
    () => false,
  );
  const [current, setCurrent] = useState<"tree" | "qr">("tree");
  const showOnlyQr = prefersReducedMotion || isLowPerformanceDevice;
  const view = showOnlyQr ? "qr" : current === "tree" ? "design" : "qr";

  return (
    <main className="flex flex-col">
      <section className="px-8 py-4 sm:pt-20 flex flex-col gap-y-2 border-b border-mist-300">
        <h1 className="text-5xl">{dict.wechat.header.title}</h1>
        <p>{dict.wechat.header.description}</p>
      </section>
      <section className="flex justify-center items-center pt-4 pb-16 relative">
        <div className="h-[70vh] w-[70vh]">
          <DesignQR
            style={{
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              display: "inline-block",
              borderWidth: "0",
              boxShadow: "none",
            }}
            details={{
              border: { padding: 10 },
            }}
            className="h-64"
            value={wechatUrl!}
            view={view}
            onViewChange={(nextView) => setCurrent(nextView === "qr" ? "qr" : "tree")}
            transparentBackground
          />
        </div>
        {!showOnlyQr && (
          <div className="absolute bottom-4 px-2 py-1 flex items-center gap-x-2 rounded-lg bg-pink-100 border-2 border-pink-200">
            {current === "tree" ? <TreeDeciduous className="w-4 h-4" /> : <Scan className="w-4 h-4" />}
            <p>{dict.wechat.instructions[current]}</p>
          </div>
        )}
      </section>
    </main>
  );
}
