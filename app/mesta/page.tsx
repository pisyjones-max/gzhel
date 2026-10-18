import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import Places from "@/components/Places";
import { items, towns } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Каталог мест Гжели и окрестностей",
  description: "Мастерские, производства, храмы, достопримечательности, где поесть и остановиться в Гжели и Коломне. Поиск и фильтры.",
  alternates: { canonical: "/mesta" },
};

export default function Page() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Каталог мест</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist/90">Всё, что стоит увидеть в Гжели и рядом. Добавляйте места в план поездки одной кнопкой.</p>
        <div className="mt-12"><Places items={items} towns={towns} /></div>
        <p className="mt-6 text-sm text-mist/60">Мы публикуем только проверенные сведения. Адреса, часы и цены появятся после подтверждения у организаций.</p>
      </section>
      <section id="zayavka" className="bg-navy/70 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Вашего места нет в каталоге? Добавим</h2>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
