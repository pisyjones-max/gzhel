import type { Metadata } from "next";
import Link from "next/link";
import { shops } from "@/lib/shops";
import { stops } from "@/lib/stops";

export const metadata: Metadata = { title: "Купоны и скидки в магазинах Гжели", description: "Скидки для туристов в магазинах-партнёрах Гжели: как получить купон и предъявить его на кассе.", alternates: { canonical: "/kupony" } };

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
      <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Купоны и скидки</h1>
      <p className="mt-8 max-w-2xl text-xl text-mist/90">Получите купон на сайте, покажите QR или код на кассе. Продавец проверит его и применит скидку.</p>
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {["Откройте страницу остановки и нажмите «Получить купон»", "Покажите QR или назовите код на кассе магазина", "Продавец проверит купон и применит скидку"].map((t, n) => (
          <li key={t} className="border-t-2 border-cobalt pt-4 text-lg">{n + 1}. {t}</li>
        ))}
      </ol>
      <h2 className="mt-16 font-display text-4xl font-bold text-white">Магазины-партнёры</h2>
      <ul className="mt-8 divide-y divide-glow/20 border-y border-glow/20">
        {shops.map((s) => {
          const stop = stops.find((x) => x.shopId === s.id);
          return (
            <li key={s.id} className="grid gap-3 py-7 md:grid-cols-[1.1fr_1fr_auto] md:items-center md:gap-10">
              <div><h3 className="font-display text-3xl font-bold text-white">{s.name.ru}</h3>{s.demo && <p className="mt-1 text-sm text-glow">Демонстрационные условия</p>}</div>
              <p className="text-mist/85">Скидка {s.discount}%, купон действует {s.validDays} дня. {s.conditions}</p>
              {stop && <Link href={`/guide/${stop.id}`} className="bg-cobalt px-5 py-3 font-semibold text-white hover:bg-glow hover:text-night">Получить купон</Link>}
            </li>
          );
        })}
      </ul>
      <p className="mt-10 max-w-2xl text-mist/85">Вы владелец магазина или кафе? <Link href="/#zayavka" className="underline">Оставьте заявку</Link>, и мы подключим вас к купонам.</p>
    </main>
  );
}
