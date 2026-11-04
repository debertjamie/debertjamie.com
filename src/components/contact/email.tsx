"use client";
import { useT } from "next-i18next/client";
import { useEffect, useReducer, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { ExtendedLink as Link } from "../commons/extendlink";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

const prefix = [
  "hi",
  "nihao",
  "you-can-email-me-at-almost-anything",
  "like-this",
  "or.this",
  "but not this :(",
  "you.can.also.use.specific.topics.like",
  "another.banger",
  "debertjamie.com",
  "yyds",
  "pyq",
  "nb.tql",
  "3Q",
  "thanks",
];

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay) return;
    const id = setInterval(() => savedCallback.current?.(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

interface AnimationState {
  id: number;
  message: string;
  char: number;
  isActive: boolean;
}

type AnimationAction =
  | { type: "TICK"; hold: number }
  | { type: "PAUSE" }
  | { type: "RESUME"; maxId: number };

function startOf(id: number): AnimationState {
  return {
    id,
    message: prefix[id].slice(0, 1),
    char: 2,
    isActive: true,
  };
}

function animationReducer(
  state: AnimationState,
  action: AnimationAction,
): AnimationState {
  switch (action.type) {
    case "TICK": {
      if (state.id >= prefix.length) {
        return state;
      }
      const finished = state.char - action.hold >= prefix[state.id].length;
      if (!finished) {
        return {
          ...state,
          message: prefix[state.id].slice(0, state.char),
          char: state.char + 1,
          isActive: true,
        };
      }
      const nextId = state.id + 1;
      if (nextId === prefix.length) {
        return startOf(0);;
      }
      return startOf(nextId);
    }
    case "PAUSE":
      return { ...state, isActive: false };
    case "RESUME":
      return {
        ...state,
        isActive: state.id < action.maxId,
      };
    default:
      return state;
  }
}

export function Email() {
  const { t } = useT("contact");
  const reduced = usePrefersReducedMotion();

  const [state, dispatch] = useReducer(animationReducer, {
    id: 0,
    message: prefix[0],
    char: prefix[0].length,
    isActive: true,
  });

  useEffect(() => {
    if (reduced) dispatch({ type: "PAUSE" });
  }, [reduced]);

  // The prefix keeps cycling, so it needs an explicit pause control.
  const [stopped, setStopped] = useState(false);

  useInterval(
    () => {
      dispatch({ type: "TICK", hold: 50 });
    },
    state.isActive && !reduced && !stopped ? 50 : null,
  );

  const displayMessage = reduced ? prefix[0] : state.message;

  function handlePause() {
    dispatch({ type: "PAUSE" });
  }
  function handleResume() {
    if (!reduced) dispatch({ type: "RESUME", maxId: prefix.length });
  }

  // The address is the focal point of the page: anything before the @ works,
  // and the cycling prefix shows that instead of saying it.
  return (
    <section
      className="flex flex-col gap-6 px-4 sm:px-8 py-16 md:py-24 border-y border-mist-300"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
    >
      <Link
        href="mailto:hi@debertjamie.com"
        className="w-fit max-w-full text-[clamp(1.75rem,6vw,5rem)] font-semibold tracking-tight leading-tight underline decoration-4 decoration-accent-mark underline-offset-[0.2em] transition-colors hover:text-accent-text"
        onFocus={handlePause}
        onBlur={handleResume}
      >
        <span className="sr-only">Email hi@debertjamie.com</span>
        <span aria-hidden className="break-all">
          <span className="text-mist-600">{displayMessage}</span>
          <span className="whitespace-nowrap">@debertjamie.com</span>
        </span>
      </Link>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-mist-700">
        <p>{t("email")}</p>
        {!reduced && (
          <button
            type="button"
            onClick={() => setStopped((s) => !s)}
            className="inline-flex items-center gap-2 py-2 text-base font-medium text-mist-600 hover:text-mist-900"
          >
            {stopped ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            {stopped ? t("animation.play") : t("animation.pause")}
          </button>
        )}
      </div>
    </section>
  );
}
