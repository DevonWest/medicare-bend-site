import Image from "next/image";
import Link from "next/link";
import HeaderMobileMenu, { type HeaderNavItem } from "@/components/HeaderMobileMenu";
import { siteConfig, telHref } from "@/lib/site";

const primaryNav: HeaderNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/medicare-bend", label: "Medicare Help" },
  { href: "/our-team", label: "Our Team" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const headerRowClassName =
  "grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-2 py-2.5 landscape-mobile:py-1 landscape-mobile:gap-x-1.5 lg:flex lg:h-16 lg:items-center lg:justify-between lg:gap-4 lg:py-0";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={headerRowClassName}>
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
            aria-label="Medicare in Bend home page"
          >
            {/* Icon-only brand mark (no baked-in text) + rendered brand text, so
                the visible brand always tracks siteConfig and stays Bend-safe. */}
            <Image
              src="/brand/hio-icon.png"
              alt=""
              aria-hidden="true"
              width={512}
              height={512}
              priority
              sizes="48px"
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 lg:h-11 lg:w-11 landscape-mobile:h-7 landscape-mobile:w-7"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-lg font-extrabold tracking-tight text-blue-700 sm:text-xl lg:text-2xl landscape-mobile:text-base">
                {siteConfig.shortName}
              </span>
              <span className="mt-0.5 truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[10px] lg:text-[11px]">
                By Health Insurance Options
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-5 text-sm font-medium text-gray-700 lg:flex"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={telHref}
            className="inline-flex h-11 min-h-11 items-center justify-center gap-1.5 justify-self-end rounded-lg bg-blue-700 px-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-800 landscape-mobile:h-8 landscape-mobile:px-2 landscape-mobile:text-xs"
            aria-label={`Call ${siteConfig.phone}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
              />
            </svg>
            <span className="hidden sm:inline">{siteConfig.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>

          <HeaderMobileMenu items={primaryNav} phone={siteConfig.phone} telHref={telHref} />
        </div>
      </div>
    </header>
  );
}
