import { type TFunction } from "i18next";
import Image from "next/image";
import { projectsQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import type { ProjectType } from "@/src/lib/blog";
import { ExtendedLink as Link } from "../commons/extendlink";
import { PortableTextRenderer } from "../sanity/portableText";

const linkClass =
  "py-2 text-lg font-medium underline decoration-mist-400 decoration-2 underline-offset-8 transition-colors hover:decoration-accent-text hover:text-mist-900";

// One full-width row per project, newest first. The image side alternates so
// a long list does not read as a uniform grid.
export async function ProjectList({ t }: { t: TFunction<"projects", undefined> }) {
  const data: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["projects"],
  });
  const projects = data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  if (projects.length === 0) {
    return <p className="px-4 sm:px-8 py-16 text-xl text-mist-600">{t("notFound")}</p>;
  }

  return (
    <ol className="flex flex-col border-t border-mist-300">
      {projects.map((project, i) => (
        <li
          key={project._id}
          className="grid gap-8 md:grid-cols-12 md:items-center px-4 sm:px-8 py-12 md:py-16 border-b border-mist-300"
        >
          <div
            className={`md:col-span-6 relative aspect-4/3 overflow-hidden rounded-3xl bg-mist-200 ${
              i % 2 === 1 ? "md:order-2" : ""
            }`}
          >
            <Image
              src={project.mainImage.image}
              alt={project.mainImage.alt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={project.mainImage.lqip}
              className="object-cover"
            />
          </div>
          <div className="md:col-span-6 flex flex-col gap-4 md:px-4">
            <p className="text-base text-mist-600 tabular-nums">
              {new Date(project.date).getFullYear()}
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight text-balance">
              {project.title}
            </h2>
            <div className="text-mist-700 max-w-prose">
              <PortableTextRenderer value={project.description} />
            </div>
            {(project.repository || project.projectUrl) && (
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {project.projectUrl && (
                  <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t("cta.live")}
                  </Link>
                )}
                {project.repository && (
                  <Link href={project.repository} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t("cta.github")}
                  </Link>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
