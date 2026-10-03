import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
import { type TFunction } from "i18next";
import { colorIndex } from "@/src/lib/board-colors";
import { db } from "@/src/lib/db";
import { board, type SelectBoard } from "@/src/lib/db/schema";
import { createMessage } from "@/src/lib/board";
import { Monogram } from "../commons/monogram";

function enrichMessages(messages: SelectBoard[]) {
  if (messages.length === 0) return [];
  return messages.map((msg, index) => {
    let stationName = null;
    const currentMonth = msg.createdAt.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (index === 0) {
      stationName = "Current Terminus";
    } else if (index === messages.length - 1) {
      stationName = "Origin Point";
    } else {
      const prevMonth = messages[index - 1].createdAt.toLocaleString(
        "default",
        { month: "long", year: "numeric" },
      );
      if (currentMonth !== prevMonth) {
        stationName = `"${currentMonth}" Transfer`;
      }
    }
    return { ...msg, stationName };
  });
}

export async function Chat({
  lang,
  t,
}: {
  lang: string;
  t: TFunction<"guestbook", undefined>;
}) {
  const rawMessages = await db
    .select()
    .from(board)
    .orderBy(desc(board.createdAt), desc(board.id));
  const messages = enrichMessages(rawMessages);
  const user = await currentUser();

  return (
    <div className="min-h-screen p-6 md:p-12 flex justify-center">
      <div className="max-w-xl w-full relative">
        <div className="flex flex-col gap-10 relative">
          <section className="border-b border-mist-300 pb-8">
            <h2 className="mb-4 text-2xl font-semibold text-mist-900">
              {t("form.title")}
            </h2>
            {user ? (
              <>
                <form action={createMessage} className="space-y-4">
                  <textarea
                    name="content"
                    required
                    maxLength={1000}
                    rows={4}
                    placeholder={t("form.placeholder")}
                    className="w-full resize-y rounded-xl border border-mist-300 bg-white p-4 text-base text-mist-900 outline-none transition-colors placeholder:text-mist-500 focus:border-mist-500"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div
                      className="flex items-center gap-3"
                      aria-label="Comment color"
                    >
                      {colorIndex.map((color, index) => (
                        <label key={color} className="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            value={color}
                            defaultChecked={index === 0}
                            className="peer sr-only"
                          />
                          <span
                            className={`block h-6 w-6 rounded-full border-2 border-transparent ${color} ring-offset-2 transition peer-checked:border-mist-50 peer-checked:ring-2 peer-checked:ring-mist-700`}
                          />
                        </label>
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="rounded-full bg-mist-900 text-mist-50 px-5 py-2 text-sm font-semibold transition-colors hover:bg-mist-700"
                    >
                      {t("form.submit")}
                    </button>
                  </div>
                </form>
                <div className="mt-2">
                  <SignOutButton redirectUrl={`/${lang}/guestbook`}>
                    <button
                      type="button"
                      className="block ml-auto rounded-full bg-red-700 text-mist-50 px-5 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-red-500"
                    >
                      {t("auth.logout")}
                    </button>
                  </SignOutButton>
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="rounded-full bg-mist-900 text-mist-50 px-5 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-mist-700"
                >
                  {t("auth.login")}
                </button>
              </SignInButton>
            )}
          </section>

          {messages.map((msg, index) => (
            <div key={msg.id} className="relative flex items-start group">
              {index !== messages.length - 1 && (
                <div className="absolute left-3.5 top-1 -bottom-14 z-0 w-3 rounded-full bg-mist-300" />
              )}

              <div className="relative z-10 shrink-0 mt-1">
                <div
                  className={`relative z-10 w-10 h-10 bg-mist-50 rounded-full flex items-center justify-center border-4 shadow-sm transition-colors ${msg.stationName ? "border-slate-800 border-4" : "border-slate-200 group-hover:border-slate-400"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${colorIndex[msg.colorChoice]}`}
                  />
                </div>

                {index !== messages.length - 1 && (
                  <div
                    className={`absolute top-8 left-1/2 -translate-x-1/2 w-3 h-10 ${colorIndex[msg.colorChoice]} z-0`}
                  />
                )}
              </div>

              <div className="ml-6 pt-2 w-full">
                <div className="mb-2 h-4">
                  {msg.stationName ? (
                    <span className="text-xs font-black uppercase tracking-widest text-slate-800 bg-slate-200 px-2 py-1 rounded-t-sm">
                      {msg.stationName}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">
                      {msg.createdAt.toLocaleTimeString("default", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "longGeneric",
                      })}
                    </span>
                  )}
                </div>

                <div className="bg-mist-50 p-5 rounded-b-2xl rounded-r-2xl shadow-sm border border-mist-200 hover:shadow-md duration-300 transition-shadow">
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    {msg.content}
                  </p>
                  <div className="flex items-center gap-3 border-t border-mist-500 pt-2 pb-1">
                    <Monogram name={msg.username} className="rounded-full w-8 h-8 text-xs" />
                    <span className="font-semibold text-mist-700">
                      {msg.username}
                    </span>
                  </div>
                  <p className="text-xs">
                    {msg.createdAt.toLocaleTimeString("default", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
