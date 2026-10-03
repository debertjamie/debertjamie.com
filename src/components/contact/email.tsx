"use client";
import { useT } from "next-i18next/client";
import { useEffect, useReducer, useRef } from "react";
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

  useInterval(
    () => {
      dispatch({ type: "TICK", hold: 50 });
    },
    state.isActive && !reduced ? 50 : null,
  );

  const displayMessage = reduced ? prefix[0] : state.message;

  function handlePause() {
    dispatch({ type: "PAUSE" });
  }
  function handleResume() {
    if (!reduced) dispatch({ type: "RESUME", maxId: prefix.length });
  }

  return (
    <div
      className="border border-mist-400 rounded-xl flex flex-col items-center justify-center py-24 px-4"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
    >
      <Link
        href={`mailto:hi@debertjamie.com`}
        className="text-2xl md:text-4xl border-b-4 border-yellow-600 font-mono inline-flex flex-wrap justify-center max-w-full"
        onFocus={handlePause}
        onBlur={handleResume}
      >
        <span className="sr-only">Email hi@debertjamie.com</span>
        <span className="text-yellow-600 break-all wrap-anywhere text-center" aria-hidden>
          {displayMessage}
        </span>
        <span className="font-semibold whitespace-nowrap" aria-hidden>
          @debertjamie.com
        </span>
      </Link>
      <p className="pt-4">{t("email")}</p>
    </div>
  );
}
