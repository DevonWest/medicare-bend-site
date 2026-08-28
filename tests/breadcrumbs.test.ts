import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Breadcrumbs from "../components/Breadcrumbs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("breadcrumbs render a semantic, accessible hierarchy and matching JSON-LD", () => {
  const html = renderToStaticMarkup(
    createElement(Breadcrumbs, {
      items: [
        { href: "/", label: "Home" },
        { href: "/resources", label: "Resources" },
        { label: "Prescription Drug Review" },
      ],
      className: "test-breadcrumb",
    }),
  );

  assert.match(html, /<nav aria-label="Breadcrumb" class="test-breadcrumb">/);
  assert.match(html, /<ol class="flex flex-wrap items-center">/);
  assert.equal((html.match(/<li\b/g) ?? []).length, 3);
  assert.match(html, /<span aria-current="page">Prescription Drug Review<\/span>/);
  assert.match(html, /<span aria-hidden="true" class="mx-2">\/<\/span>/);

  const jsonLd = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
  assert.ok(jsonLd, "Breadcrumb JSON-LD was not rendered");

  const schema = JSON.parse(jsonLd);
  assert.equal(schema["@type"], "BreadcrumbList");
  assert.deepEqual(schema.itemListElement, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.medicareinbend.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Resources",
      item: "https://www.medicareinbend.com/resources",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Prescription Drug Review",
    },
  ]);
});

test("canonical page templates use the shared breadcrumb implementation", () => {
  const sharedTemplatePaths = [
    "components/PageHero.tsx",
    "components/LocalMedicarePage.tsx",
    "app/compare-medicare-options/page.tsx",
    "app/rx-drug-review/page.tsx",
    "app/helping-parent-with-medicare/page.tsx",
    "app/turning-65-medicare-bend/page.tsx",
    "app/contact/page.tsx",
    "app/medicare-plan-review-bend/page.tsx",
    "app/medicare-appointment-checklist/page.tsx",
    "app/working-past-65-medicare/page.tsx",
  ];

  for (const path of sharedTemplatePaths) {
    const source = readFileSync(join(root, path), "utf8");
    assert.match(source, /import Breadcrumbs from "@\/components\/Breadcrumbs";/, path);
    assert.match(source, /<Breadcrumbs/, path);
  }
});
