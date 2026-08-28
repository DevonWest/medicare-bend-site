import Link from "next/link";
import BreadcrumbSchema, { type BreadcrumbItem } from "@/components/BreadcrumbSchema";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center">
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;

            return (
              <li className="flex items-center" key={`${item.href ?? "current"}-${item.label}`}>
                {index > 0 ? (
                  <span aria-hidden="true" className="mx-2">
                    /
                  </span>
                ) : null}
                {item.href && !isCurrent ? (
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isCurrent ? "page" : undefined}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
