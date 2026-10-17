import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [{ url: base }, ...pages.map((p) => ({ url: `${base}/${p.slug}` }))];
}
