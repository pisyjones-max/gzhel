import type { Metadata } from "next";
import Link from "next/link";
import { stops } from "@/lib/stops";

export const metadata: Metadata = {
  title: "Гид по остановкам Гжели",
  description: "Истории, факты и скидки на остановках гжельского маршрута. Русский, English, 中文.",
  alternates: { canonical: "/guide" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
      <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Гид по остановкам</h1>
      <p className="mt-8 max-w-2xl text-xl text-mist/90">Выберите остановку: история места, как добраться, где поесть и скидка в магазине рядом.</p>
      <ul className="mt-12 divide-y divide-glow/20 border-y border-glow/20">
        {stops.map((s) => (
          <li key={s.id}>
            <Link href={`/guide/${s.id}`} className="grid gap-3 py-8 hover:bg-navy/50 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <h2 className="font-display text-3xl font-bold text-white">{s.name.ru}</h2>
              <p className="max-w-lg text-lg text-mist/85">{s.tagline.ru}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
