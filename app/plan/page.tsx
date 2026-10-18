"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ShareButton from "@/components/ShareButton";
import { getItem } from "@/lib/catalog";
import { usePlan } from "@/lib/usePlan";

function View() {
  const sp = useSearchParams();
  const shared = (sp.get("ids") || "").split(",").filter((x) => getItem(x));
  const { ids, write, toggle } = usePlan();
  const list = shared.length ? shared : ids;
  const move = (i: number, d: number) => { const n = [...ids]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; write(n); };
  const btn = "border border-glow/40 px-3 py-2 text-sm hover:bg-navy";
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-10">
      <h1 className="glow-text font-display text-5xl font-bold text-white md:text-6xl">Мой план</h1>
      {shared.length > 0 && (
        <p className="mt-6 border border-glow/30 p-4">Это план, которым с вами поделились. <button className="underline" onClick={() => write(Array.from(new Set([...ids, ...shared])))}>Добавить в мой план</button></p>
      )}
      {list.length === 0 ? (
        <p className="mt-10 text-xl">В плане пусто. Загляните в <Link href="/mesta" className="underline">каталог мест</Link> или <Link href="/planirovat" className="underline">подберите маршрут</Link>.</p>
      ) : (
        <>
          <ol className="mt-10 divide-y divide-glow/20 border-y border-glow/20">
            {list.map((id, n) => { const i = getItem(id)!; const q = encodeURIComponent(`${i.name} ${i.town}`); return (
              <li key={id} className="grid gap-3 py-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <Link href={`/mesta/${id}`} className="font-display text-3xl font-bold text-white hover:text-glow">{n + 1}. {i.name}</Link>
                  <p className="text-glow">{i.town}</p>
                  <a className="mt-2 inline-block underline underline-offset-4 hover:text-glow" target="_blank" rel="noopener noreferrer" href={`https://yandex.ru/maps/?rtext=~${q}&rtt=auto`}>Построить маршрут</a>
                </div>
                {!shared.length && <div className="flex gap-2"><button className={btn} onClick={() => move(n, -1)} aria-label="Выше">↑</button><button className={btn} onClick={() => move(n, 1)} aria-label="Ниже">↓</button><button className={btn} onClick={() => toggle(id)}>Убрать</button></div>}
              </li>); })}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3"><ShareButton path={`/plan?ids=${list.join(",")}`} title="Мой план поездки в Гжель" label="Отправить план" /></div>
        </>
      )}
    </main>
  );
}
export default function Page() { return <Suspense><View /></Suspense>; }
