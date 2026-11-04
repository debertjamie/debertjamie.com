import { type TFunction } from "i18next";
import { ExtendedLink as Link } from "../commons/extendlink";
import { notesQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import type { NoteType } from "@/src/lib/blog";
import { formatDate } from "@/src/lib/blog";

export const series = {
  inspiration: "Inspiration 灵感",
  "daily-life": "Daily Life 日常",
  college: "College 大学",
  programming: "Programming 编程",
  technology: "Technology 科技",
  til: "Today I Learned 今天学到了",
  other: "Other 其他",
};

export async function Notes({
  t,
  locale,
}: {
  t: TFunction<"blog", undefined>;
  locale: string;
}) {
  const notes: NoteType[] = await sanityFetch({
    query: notesQuery,
    tags: ["notes"],
  });

  const groupNotes = notes.reduce<{ series: string; notes: NoteType[] }[]>(
    (groups, note) => {
      const existingGroup = groups.find(
        (group) => group.series === note.series,
      );

      if (existingGroup) {
        existingGroup.notes.push(note);
        return groups;
      }

      groups.push({ series: note.series, notes: [note] });
      return groups;
    },
    [],
  );

  if (groupNotes.length === 0) {
    return <p className="px-4 sm:px-8 py-16 text-xl text-mist-600">{t("notFound")}</p>;
  }

  // One block per series: the series name is the heading, notes are rows.
  return (
    <div className="flex flex-col">
      {groupNotes.map((group) => (
        <section
          key={group.series}
          className="grid gap-6 md:grid-cols-12 px-4 sm:px-8 py-12 border-b border-mist-300"
        >
          <h2 className="md:col-span-4 md:sticky md:top-20 self-start text-3xl sm:text-4xl font-semibold tracking-tight text-balance break-keep">
            {series[group.series as keyof typeof series] || group.series}
          </h2>
          <ul className="md:col-span-8 flex flex-col">
            {group.notes.map((note) => (
              <li key={note._id} className="border-b border-mist-300 last:border-b-0">
                <Link
                  href={`/blog/notes/${note.slug}`}
                  className="group grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6 py-4"
                >
                  <span className="text-base text-mist-600 tabular-nums">
                    {formatDate(note.date, locale)}
                  </span>
                  <span className="text-xl font-medium transition-colors group-hover:text-accent-text">
                    {note.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
