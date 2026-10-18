import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { workshops } from "@/lib/workshops";
import { stops } from "@/lib/stops";
import { items } from "@/lib/catalog";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urls = ["", "/masterskie", "/marshrut-na-den", "/guide", "/mesta", "/planirovat", "/afisha", "/kupony", "/stati", "/marshrut-gzhel-kolomna", "/gde-poest-i-pospat", ...pages.map((p) => `/${p.slug}`), ...workshops.map((w) => `/masterskie/${w.id}`), ...stops.map((s) => `/guide/${s.id}`), ...items.map((i) => `/mesta/${i.id}`), ...articles.map((a) => `/stati/${a.slug}`)];
  return urls.map((u) => ({ url: base + u }));
}
