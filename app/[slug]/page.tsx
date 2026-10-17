import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/lib/pages";
import LeadForm from "@/components/LeadForm";

export const dynamicParams = false;
export function generateStaticParams() { return pages.map((p) => ({ slug: p.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = pages.find((x) => x.slug === params.slug);
  return p ? { title: p.title, description: p.lead, alternates: { canonical: `/${p.slug}` } } : {};
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = pages.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">{p.h1}</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist/90">{p.lead}</p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="divide-y divide-glow/20 border-y border-glow/20">
          {p.blocks.map((b) => (
            <div key={b.h} className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{b.h}</h2>
              <p className="max-w-lg text-lg leading-relaxed text-mist/85">{b.p}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="zayavka" className="bg-navy/70 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Оставьте заявку, мы вернёмся с вариантами и ценой</h2>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
