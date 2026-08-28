import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export interface BreadcrumbItem {
  href?: string;
  label: string;
}

export default function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: new URL(item.href, siteConfig.url).toString() }
        : {}),
    })),
  };

  return <JsonLd data={schema} />;
}
