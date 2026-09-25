import type { PortableTextComponents } from "@portabletext/react";
import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { ExtendedLink as Link } from "../commons/extendlink";
import { CodeBlock } from "../commons/codeblock";
import { ImageComponent } from "./image";
import { GalleryComponent } from "./gallery";
import { BlockQuoteComponent, CalloutComponent } from "./blockquote";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

function toSlug(text: string | ReactNode) {
  return text
    ?.toString()
    .toLowerCase()
    .replace(/[^a-z0-9\p{Script=Han}]+/gu, "-")
    .replace(/(^-|-$)+/g, "");
}

export const CustomPortableTextComponents: PortableTextComponents = {
  types: {
    image: ImageComponent,
    code: CodeBlock,
    blockquote: BlockQuoteComponent,
    callout: CalloutComponent,
    gallery: GalleryComponent,
  },
  marks: {
    link: ({ value, children }) => <Link href={value}>{children}</Link>,
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    "strike-through": ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    code: ({ children }) => (
      <code
        className={`${jetbrainsMono.className} bg-mist-200 px-1 py-0.5 rounded-sm`}
      >
        {children}
      </code>
    ),
    spoiler: ({ children }) => (
      <span className="bg-mist-700 blur-md hover:bg-transparent hover:blur-none transition-all duration-200 select-none">
        {children}
      </span>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed tracking-wide mb-2">{children}</p>
    ),
    h2: ({ children }) => (
      <h2
        className="text-2xl tracking-wider font-bold mt-4 mb-2"
        id={toSlug(children)}
      >
        <Link
          href={`#${toSlug(children)}`}
          className="before:content-['#'] before:font-bold before:text-mist-500 before:opacity-0 before:-ml-4 before:pr-1 hover:before:opacity-100 before:duration-300 before:transition-opacity"
        >
          {children}
        </Link>
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-xl tracking-wider font-semibold mt-2 mb-2"
        id={toSlug(children)}
      >
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc -mt-1 mb-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal -mt-1 mb-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-6">{children}</li>,
    number: ({ children }) => <li className="ml-6">{children}</li>,
  },
};
