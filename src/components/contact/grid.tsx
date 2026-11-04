import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { ExtendedLink as Link } from "../commons/extendlink";
import { GitHub, LinkedIn, Twitter, WeChat } from "../commons/icons";

const channels: {
  name: string;
  handle: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { name: "GitHub", handle: "debertjamie", href: "https://github.com/debertjamie", Icon: GitHub },
  { name: "LinkedIn", handle: "in/debertjamie", href: "https://linkedin.com/in/debertjamie", Icon: LinkedIn },
  { name: "Twitter", handle: "@debertjamie", href: "https://twitter.com/debertjamie", Icon: Twitter },
  { name: "WeChat", handle: "", href: "/wechat", Icon: WeChat },
];

// Other channels as a plain list: name and handle, so people know which
// account they are opening before they click.
export function Grid({ title, wechatHandle }: { title: string; wechatHandle: string }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
      <ul className="flex flex-col border-t border-mist-300">
        {channels.map(({ name, handle, href, Icon }) => (
          <li key={name} className="border-b border-mist-300">
            <Link href={href} className="group flex items-center gap-4 py-5">
              <Icon className="size-7 shrink-0" aria-hidden />
              <span className="flex flex-col">
                <span className="text-xl font-semibold transition-colors group-hover:text-accent-text">
                  {name}
                </span>
                <span className="text-base text-mist-600">{handle || wechatHandle}</span>
              </span>
              <ArrowUpRight
                className="ml-auto size-6 text-mist-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mist-900"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
