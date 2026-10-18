import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CouponBox from "@/components/CouponBox";
import { getShop } from "@/lib/shops";
import { asLang, getStop, langName, langs, pick, stops, ui } from "@/lib/stops";

export function generateStaticParams() { return stops.map((s) => ({ id: s.id })); }
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = getStop(params.id);
  return s ? { title: s.name.ru, description: s.tagline.ru, alternates: { canonical: `/guide/${s.id}` } } : {};
}

export default function Page({ params, searchParams }: { params: { id: string }; searchParams: { lang?: string } }) {
  const s = getStop(params.id);
  if (!s) notFound();
  const lang = asLang(searchParams.lang);
  const shop = getShop(s.shopId)!;
  const q = encodeURIComponent(s.query);
  const yMap = (t: string) => `https://yandex.ru/maps/?text=${encodeURIComponent(t)}`;
  const link = "text-glow underline underline-offset-4 hover:text-white";
  const t = (k: string) => pick(ui[k], lang);

  return (
    <main lang={lang}>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-8">
        <nav className="flex flex-wrap items-center gap-3 text-sm" aria-label="Language">
          {langs.map((l) => (
            <Link key={l} href={`?lang=${l}`} lang={l} aria-current={l === lang} className={`border px-4 py-2 ${l === lang ? "border-cobalt bg-cobalt text-white" : "border-glow/40 hover:bg-navy"}`}>{langName[l]}</Link>
          ))}
          <Link href="/guide" className="ml-auto text-glow hover:text-white">{t("allStops")}</Link>
        </nav>
        <p className="mt-10 text-glow">{t("guide")}</p>
        <h1 className="glow-text mt-2 max-w-4xl font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl">{pick(s.name, lang)}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-mist/90">{pick(s.tagline, lang)}</p>
        <p className="mt-8 flex flex-wrap gap-6">
          <a className={link} target="_blank" rel="noopener noreferrer" href={`https://yandex.ru/maps/?rtext=~${q}&rtt=auto`}>{t("route")}: Yandex</a>
          <a className={link} target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}>{t("route")}: Google</a>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <CouponBox shopId={shop.id} stopId={s.id} lang={lang} labels={{ title: `${t("couponTitle")}: ${shop.name[lang]}`, text: t("couponText"), get: t("getCoupon"), code: t("yourCode"), until: t("validUntil"), discount: t("discount"), error: t("error") }} />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="divide-y divide-glow/20 border-y border-glow/20">
          {s.sections.map((b) => (
            <div key={b.h.ru} className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <h2 className="font-display text-3xl font-bold text-white">{pick(b.h, lang)}</h2>
              <p className="max-w-lg text-lg leading-relaxed text-mist/85">{pick(b.p, lang)}</p>
            </div>
          ))}
          <div className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
            <h2 className="font-display text-3xl font-bold text-white">{t("around")}</h2>
            <p className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
              <a className={link} target="_blank" rel="noopener noreferrer" href={yMap("кафе Гжель")}>{t("eat")}</a>
              <a className={link} target="_blank" rel="noopener noreferrer" href={yMap("гостиница Гжель")}>{t("stay")}</a>
              <a className={link} target="_blank" rel="noopener noreferrer" href={yMap("сувениры гжель")}>{t("buy")}</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
