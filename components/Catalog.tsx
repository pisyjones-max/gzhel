"use client";
import Link from "next/link";
import { useState } from "react";
import type { Workshop, Offer } from "@/lib/workshops";

const filters: ("Все" | Offer)[] = ["Все", "Экскурсия", "Мастер-класс", "Магазин", "Выездные программы"];

export default function Catalog({ items }: { items: Workshop[] }) {
  const [f, setF] = useState<(typeof filters)[number]>("Все");
  const shown = items.filter((w) => f === "Все" || w.offers.includes(f));
  return (
    <>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Фильтр по услугам">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} aria-pressed={f === x}
            className={`px-5 py-2.5 text-sm font-semibold border ${f === x ? "border-cobalt bg-cobalt text-white" : "border-glow/40 text-mist hover:bg-navy"}`}>
            {x}
          </button>
        ))}
      </div>
      <ul className="mt-10 divide-y divide-glow/20 border-y border-glow/20">
        {shown.map((w) => (
          <li key={w.id}>
            <Link href={`/masterskie/${w.id}`} className="grid gap-3 py-8 hover:bg-navy/50 md:grid-cols-[1.1fr_1.4fr] md:gap-12">
              <div>
                <h2 className="font-display text-3xl font-bold text-white">{w.name}</h2>
                <p className="mt-1 text-glow">{w.kind}, {w.place}</p>
              </div>
              <div>
                <p className="max-w-lg text-lg leading-relaxed text-mist/85">{w.short}</p>
                <p className="mt-3 flex flex-wrap gap-2 text-sm">
                  {w.offers.map((o) => <span key={o} className="border border-glow/40 px-3 py-1">{o}</span>)}
                </p>
              </div>
            </Link>
          </li>
        ))}
        {shown.length === 0 && <li className="py-8 text-lg">Пока никого с таким форматом. Оставьте заявку, мы подберём вариант.</li>}
      </ul>
    </>
  );
}
