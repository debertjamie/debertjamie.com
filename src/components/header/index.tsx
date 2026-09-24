import { ExtendedLink as Link } from "../commons/extendlink";
import { Navbar } from "./nav";
import { HEADER_LINKS } from "../commons/constants";
import { MobileNav } from "./mobilenav";

export function Header() {
  return (
    <header
      className={`z-50 duration-300 py-2 px-4 flex items-center justify-between border-b border-mist-300`}
    >
      <Link href="/" className="px-4 py-2">
        <p className="text-xl font-bold select-none">
          <span className="text-mist-500 tracking-tight">debert</span>
          <span className="text-mist-800 tracking-tight">jamie</span>
        </p>
      </Link>
      <div className="flex items-center gap-2">
        <Navbar links={HEADER_LINKS} />
        <MobileNav links={HEADER_LINKS} />
      </div>
    </header>
  );
}
