import { type TFunction } from "i18next";
import Image from "next/image";
import { projectsQuery } from "@/src/lib/sanity/lib/query";
import { sanityFetch } from "@/src/lib/sanity/lib/client";
import type { ProjectType } from "@/src/lib/blog";
import { ExtendedLink as Link } from "../commons/extendlink";
import { PortableTextRenderer } from "../sanity/portableText";

export async function Bento({ t }: { t: TFunction<"projects", undefined>}) {
  const data: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["projects"],
  });
  const projects = data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return (
    <div className="w-full max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 *:h-75">
      {projects.map((project) => (
        <div
          key={project._id}
          className="group relative min-h-fit rounded-lg hover:shadow-md p-4 overflow-hidden border border-mist-500 group cursor-default"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Image
              className="object-cover scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 blur-xs"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={project.mainImage.image}
              alt={project.mainImage.alt || project.title}
            />
            <div className="absolute inset-0 opacity-100 bg-blue-50 group-hover:bg-green-100/60 transition-colors duration-200" />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl self-end font-semibold">
                {project.title}
              </h3>
              <div className="p-1 border border-mist-300 rounded-md">
                <div className="relative w-10 h-10">
                  <Image
                    className="rounded-sm object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={project.mainImage.image}
                    alt={project.mainImage.alt || project.title}
                  />
                </div>
              </div>
            </div>
            <div className="leading-tight min-h-36">
              <PortableTextRenderer value={project.description} />
            </div>
            <hr className="mb-4 border-mist-500" />
            <div className="flex gap-x-2">
              {project.repository && (
                <Link
                  className="flex items-center gap-x-1 px-2 py-0.5 text-base rounded-xl border-2 border-transparent hover:bg-green-300/80 hover:border-green-500/70 hover:scale-105 duration-200 transition-[colors_transform]"
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="underline">{t("cta.github")}</span>
                </Link>
              )}
              {project.projectUrl && (
                <Link
                  className="flex items-center gap-x-1 px-2 py-0.5 text-base rounded-xl border-2 border-transparent hover:bg-yellow-300/80 hover:border-yellow-500/70 hover:scale-105 duration-200 transition-[colors_transform]"
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="underline">{t("cta.live")}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
