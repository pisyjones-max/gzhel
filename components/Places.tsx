"use client";
import Link from "next/link";
import { useState } from "react";
import { catName, type Cat, type Item } from "@/lib/catalog";
import PlanButton from "./PlanButton";

export default function Places({ items, towns }: { items: Item[]; towns: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"all" | Cat>("all");
  const [town, setTown] = useState("all");
  const cats = Array.from(new Set(items.map((i) => i.cat)));
  const shown = items.filter((i) =>
    (cat === "all" || i.cat === cat) && (town === "all" || i.town === town) &&
    `${i.name} ${i.short} ${i.town} ${catName[i.cat]}`.toLowerCase().includes(q.trim().toLowerCase()));
  const chip = (on: boolean) => `px-4 py-2 text-sm font-semibold border ${on ? "border-cobalt bg-cobalt text-white" : "border-glow/40 hover:bg-navy"}`;
  return (
    <>
      <div className="grid gap-5">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск: завод, пастила, кремль…" aria-label="Поиск по каталогу"
          className="w-full border-b-2 border-white/50 bg-transparent px-1 py-3 text-xl text-white placeholder:text-white/50 focus:border-white focus:outline-none" />
        <div className="flex flex-wrap gap-3" role="group" aria-label="Категории">
          <button className={chip(cat === "all")} onClick={() => setCat("all")} aria-pressed={cat === "all"}>Все</button>
          {cats.map((c) => <button key={c} className={chip(cat === c)} onClick={() => setCat(c)} aria-pressed={cat === c}>{catName[c]}</button>)}
        </div>
        <div className="flex flex-wrap gap-3" role="group" aria-label="Населённый пункт">
          {["all", ...towns].map((t) => <button key={t} className={chip(town === t)} onClick={() => setTown(t)} aria-pressed={town === t}>{t === "all" ? "Везде" : t}</button>)}
        </div>
      </div>
      <ul className="mt-10 divide-y divide-glow/20 border-y border-glow/20">
        {shown.map((i) => (
          <li key={i.id} className="grid gap-4 py-7 md:grid-cols-[1.1fr_1.4fr_auto] md:items-center md:gap-10">
            <Link href={`/mesta/${i.id}`} className="group">
              <h2 className="font-display text-3xl font-bold text-white group-hover:text-glow">{i.name}</h2>
              <p className="mt-1 text-glow">{catName[i.cat]}, {i.town}</p>
            </Link>
            <p className="max-w-lg text-lg leading-relaxed text-mist/85">{i.short}</p>
            <PlanButton id={i.id} />
          </li>
        ))}
        {shown.length === 0 && <li className="py-8 text-lg">Ничего не нашлось. Попробуйте другой запрос или сбросьте фильтры.</li>}
      </ul>
    </>
  );
}
