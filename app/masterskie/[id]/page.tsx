import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { workshops } from "@/lib/workshops";

export const dynamicParams = false;
export function generateStaticParams() { return workshops.map((w) => ({ id: w.id })); }

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const w = workshops.find((x) => x.id === params.id);
  return w ? { title: w.name, description: w.short, alternates: { canonical: `/masterskie/${w.id}` } } : {};
}

export default function Page({ params }: { params: { id: string } }) {
  const w = workshops.find((x) => x.id === params.id);
  if (!w) notFound();
  const ld = { "@context": "https://schema.org", "@type": "TouristAttraction", name: w.name, description: w.short, address: { "@type": "PostalAddress", addressLocality: "Гжель", addressRegion: "Московская область", addressCountry: "RU" } };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <Link href="/masterskie" className="text-glow hover:text-white">Все мастерские</Link>
        <h1 className="glow-text mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-6xl">{w.name}</h1>
        <p className="mt-4 text-xl text-glow">{w.kind}, {w.place}</p>
        <p className="mt-3 flex flex-wrap gap-2 text-sm">{w.offers.map((o) => <span key={o} className="border border-glow/40 px-3 py-1">{o}</span>)}</p>
        <div className="mt-10 grid max-w-2xl gap-5 text-lg leading-relaxed text-mist/90">{w.text.map((t) => <p key={t}>{t}</p>)}</div>
        <p className="mt-8 text-sm text-mist/60">Цены, часы работы и запись уточняйте у организации.</p>
      </section>
      <section id="zayavka" className="bg-navy/70 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Хотите сюда? Оставьте заявку, организуем поездку</h2>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
