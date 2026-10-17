import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { workshops } from "@/lib/workshops";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urls = ["", "/masterskie", ...pages.map((p) => `/${p.slug}`), ...workshops.map((w) => `/masterskie/${w.id}`)];
  return urls.map((u) => ({ url: base + u }));
}
