import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";
import { getItem } from "@/lib/catalog";

export const dynamicParams = false;
export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug);
  return a ? { title: a.title, description: a.lead, alternates: { canonical: `/stati/${a.slug}` } } : {};
}

export default function Page({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.lead, inLanguage: "ru" };
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Link href="/stati" className="text-glow hover:text-white">Все статьи</Link>
      <h1 className="glow-text mt-6 font-display text-5xl font-bold leading-[1.05] text-white md:text-6xl">{a.title}</h1>
      <p className="mt-6 text-xl leading-relaxed text-mist/90">{a.lead}</p>
      <div className="mt-10 grid gap-8">
        {a.blocks.map((b) => (<section key={b.h}><h2 className="font-display text-3xl font-bold text-white">{b.h}</h2><p className="mt-3 text-lg leading-relaxed text-mist/85">{b.p}</p></section>))}
      </div>
      <aside className="mt-14 border-t border-glow/20 pt-6">
        <p className="text-glow">Посмотреть вживую</p>
        <ul className="mt-3 grid gap-2 text-lg">{a.related.map((r) => { const i = getItem(r); return i && <li key={r}><Link className="underline underline-offset-4 hover:text-glow" href={`/mesta/${r}`}>{i.name}</Link></li>; })}</ul>
      </aside>
    </main>
  );
}
