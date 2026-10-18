import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlanButton from "@/components/PlanButton";
import ShareButton from "@/components/ShareButton";
import { catName, getItem, items } from "@/lib/catalog";

export const dynamicParams = false;
export function generateStaticParams() { return items.map((i) => ({ id: i.id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const i = getItem(params.id);
  return i ? { title: `${i.name}, ${i.town}`, description: i.short, alternates: { canonical: `/mesta/${i.id}` } } : {};
}

export default function Page({ params }: { params: { id: string } }) {
  const i = getItem(params.id);
  if (!i) notFound();
  const q = encodeURIComponent(`${i.name} ${i.town}`);
  const c = i.contacts || {};
  const rows: [string, string | undefined][] = [["Адрес", c.address], ["Часы работы", c.hours], ["Телефон", c.phone], ["Сайт", c.site], ["Стоимость", c.price]];
  const btn = "border border-glow/40 px-4 py-2 text-sm font-semibold hover:bg-navy";
  const ld = { "@context": "https://schema.org", "@type": i.cat === "stay" ? "LodgingBusiness" : i.cat === "eat" ? "Restaurant" : "TouristAttraction", name: i.name, description: i.short, address: { "@type": "PostalAddress", addressLocality: i.town, addressRegion: "Московская область", addressCountry: "RU" } };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-10">
        <Link href="/mesta" className="text-glow hover:text-white">Все места</Link>
        <h1 className="glow-text mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.03] text-white md:text-6xl">{i.name}</h1>
        <p className="mt-4 text-xl text-glow">{catName[i.cat]}, {i.town}</p>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-mist/90">{i.short}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PlanButton id={i.id} />
          <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://yandex.ru/maps/?rtext=~${q}&rtt=auto`}>Построить маршрут</a>
          {c.phone && <a className={btn} href={`tel:${c.phone}`}>Позвонить</a>}
          {c.site && <a className={btn} target="_blank" rel="noopener noreferrer" href={c.site}>Сайт</a>}
          <Link className={btn} href="/#zayavka">Записаться</Link>
          <ShareButton path={`/mesta/${i.id}`} title={i.name} />
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:grid-cols-[1.3fr_1fr]">
        <div className="grid gap-5 text-lg leading-relaxed text-mist/90">
          {i.text.map((t) => <p key={t}>{t}</p>)}
          {i.href && <Link href={i.href} className="text-glow underline underline-offset-4 hover:text-white">Подробная страница</Link>}
        </div>
        <dl className="divide-y divide-glow/20 border-y border-glow/20">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-4"><dt className="text-glow">{k}</dt><dd>{v || <span className="text-mist/60">уточняется</span>}</dd></div>
          ))}
          <div className="py-4 text-sm text-mist/60">
            <p>Данные проверены: {i.verifiedAt}</p>
            {i.source.map((s) => <p key={s} className="break-all"><a href={s} target="_blank" rel="noopener noreferrer" className="underline">{s.replace(/^https?:\/\//, "").slice(0, 60)}</a></p>)}
          </div>
        </dl>
      </section>
    </main>
  );
}
