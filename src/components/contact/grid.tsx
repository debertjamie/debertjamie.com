import { ExternalLink } from "lucide-react";
import { ExtendedLink as Link } from "../commons/extendlink";
import { GitHub, LinkedIn, Twitter, WeChat } from "../commons/icons";

export function Grid() {
  return (
    <section className="grid grid-cols-2 gap-2 *:min-h-30">
      <Link
        href="https://github.com/debertjamie"
        className="border md:border-mist-400 relative rounded-xl p-4 flex flex-col justify-center gap-2 not-md:bg-gray-800 not-md:border-gray-800 not-md:text-mist-50 md:duration-300 md:transition-colors md:hover:bg-gray-800 md:hover:border-gray-800 md:hover:text-mist-50"
      >
        <GitHub className="h-8 w-8" />
        <span>GitHub</span>
        <ExternalLink className="absolute right-4 top-4" />
      </Link>
      <Link
        href="https://linkedin.com/in/debertjamie"
        className="border md:border-mist-400 relative rounded-xl p-4 flex flex-col justify-center gap-2 not-md:bg-blue-600 not-md:border-blue-600 not-md:text-mist-50 md:duration-300 md:transition-colors md:hover:bg-blue-600 md:hover:border-blue-600 md:hover:text-mist-50"
      >
        <LinkedIn className="h-8 w-8" />
        <span>LinkedIn</span>
        <ExternalLink className="absolute right-4 top-4" />
      </Link>
      <Link
        href="https://twitter.com/debertjamie"
        className="border md:border-mist-400 relative rounded-xl p-4 flex flex-col justify-center gap-2 not-md:bg-neutral-900 not-md:border-neutral-900 not-md:text-mist-50 md:duration-300 md:transition-colors md:hover:bg-neutral-900 md:hover:border-neutral-900 md:hover:text-mist-50"
      >
        <Twitter className="h-8 w-8" />
        <span>Twitter</span>
        <ExternalLink className="absolute right-4 top-4" />
      </Link>
      <Link
        href="/wechat"
        className="border md:border-mist-400 relative rounded-xl p-4 flex flex-col justify-center gap-2 not-md:bg-green-600 not-md:border-green-600 not-md:text-mist-50 md:duration-300 md:transition-colors md:hover:bg-green-600 md:hover:border-green-600 md:hover:text-mist-50"
      >
        <WeChat className="h-8 w-8" />
        <span>WeChat</span>
      </Link>
    </section>
  );
}
