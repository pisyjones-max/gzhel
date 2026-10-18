import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { places } from "@/lib/places";

export const metadata: Metadata = {
  title: "Где поесть и переночевать в Гжели и Коломне",
  description: "Кафе, гостиницы и места для отдыха в Гжели и Коломне: карты поиска и проверенные места.",
  alternates: { canonical: "/gde-poest-i-pospat" },
};

const yMap = (t: string) => `https://yandex.ru/maps/?text=${encodeURIComponent(t)}`;
const searches = [
  { h: "Гжель", items: [["Кафе и рестораны", "кафе Гжель"], ["Гостиницы", "гостиница Гжель"], ["Сувениры", "сувениры Гжель"]] },
  { h: "Коломна", items: [["Кафе и рестораны", "кафе Коломна центр"], ["Гостиницы", "гостиница Коломна центр"], ["Пастила и выпечка", "пастила Коломна"]] },
];
const link = "text-glow underline underline-offset-4 hover:text-white";

export default function Page() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-10">
        <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Где поесть и переночевать</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist/90">Быстрый поиск рядом на карте и список мест, которые мы проверили сами. В высокий сезон номера лучше бронировать заранее.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="divide-y divide-glow/20 border-y border-glow/20">
          {searches.map((s) => (
            <div key={s.h} className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <h2 className="font-display text-4xl font-bold text-white">{s.h}</h2>
              <p className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
                {s.items.map(([t, q]) => <a key={q} href={yMap(q)} target="_blank" rel="noopener noreferrer" className={link}>{t}</a>)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="font-display text-4xl font-bold text-white">Проверенные места</h2>
        <ul className="mt-8 divide-y divide-glow/20 border-y border-glow/20">
          {places.map((p) => (
            <li key={p.name} className="grid gap-2 py-6 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
                <p className="text-glow">{p.kind === "eat" ? "Поесть" : "Остановиться"}, {p.town}</p>
              </div>
              <p className="max-w-lg text-lg text-mist/85">{p.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-mist/60">Список пополняется. Нашли хорошее место или у вас своё заведение? Оставьте заявку ниже.</p>
      </section>

      <section id="zayavka" className="bg-navy/70 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Ваше кафе или гостиница? Добавим в список</h2>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
