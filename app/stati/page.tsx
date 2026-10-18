import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = { title: "Статьи о гжели: как делают, чем отличается, как читать узор", description: "Редакционные материалы о гжельской керамике: производство, виды и узоры.", alternates: { canonical: "/stati" } };

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
      <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Статьи о гжели</h1>
      <ul className="mt-12 divide-y divide-glow/20 border-y border-glow/20">
        {articles.map((a) => (
          <li key={a.slug}><Link href={`/stati/${a.slug}`} className="grid gap-3 py-9 hover:bg-navy/50 md:grid-cols-[1.2fr_1fr] md:gap-12">
            <h2 className="font-display text-4xl font-bold text-white">{a.title}</h2><p className="max-w-lg text-lg text-mist/85">{a.lead}</p>
          </Link></li>
        ))}
      </ul>
    </main>
  );
}
