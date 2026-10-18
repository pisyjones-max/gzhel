import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { workshops } from "@/lib/workshops";
import { stops } from "@/lib/stops";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urls = ["", "/masterskie", "/marshrut-na-den", "/guide", "/marshrut-gzhel-kolomna", "/gde-poest-i-pospat", ...pages.map((p) => `/${p.slug}`), ...workshops.map((w) => `/masterskie/${w.id}`), ...stops.map((s) => `/guide/${s.id}`)];
  return urls.map((u) => ({ url: base + u }));
}
