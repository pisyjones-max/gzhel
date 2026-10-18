"use client";
import Link from "next/link";
import { useState } from "react";
import { getItem } from "@/lib/catalog";
import { durationName, interestName, routes, suggest, type Duration, type Interest } from "@/lib/routes";
import { usePlan } from "@/lib/usePlan";

function RouteCard({ id, big }: { id: string; big?: boolean }) {
  const r = routes.find((x) => x.id === id)!;
  const { addMany } = usePlan();
  const [added, setAdded] = useState(false);
  return (
    <article className={`border border-glow/30 ${big ? "bg-navy/60 p-7" : "p-6"}`}>
      <p className="text-glow">{durationName[r.duration]}{r.paid ? "" : ", без трат"}</p>
      <h3 className={`mt-1 font-display font-bold text-white ${big ? "text-4xl" : "text-2xl"}`}>{r.title}</h3>
      <p className="mt-3 max-w-xl text-mist/85">{r.note}</p>
      <ol className="mt-5 grid gap-2">
        {r.stops.map((s, n) => { const it = getItem(s); return it && <li key={s}><Link href={`/mesta/${s}`} className="underline underline-offset-4 hover:text-glow">{n + 1}. {it.name}</Link></li>; })}
      </ol>
      <button onClick={() => { addMany(r.stops); setAdded(true); }} className="mt-6 bg-cobalt px-5 py-3 font-semibold text-white hover:bg-glow hover:text-night">{added ? "Добавлено, смотрите «Мой план»" : "Взять маршрут в план"}</button>
    </article>
  );
}

export default function Page() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [duration, setDuration] = useState<Duration>("day");
  const [noPaid, setNoPaid] = useState(false);
  const [go, setGo] = useState(false);
  const res = suggest(interests, duration, noPaid);
  const chip = (on: boolean) => `px-4 py-2.5 text-sm font-semibold border ${on ? "border-cobalt bg-cobalt text-white" : "border-glow/40 hover:bg-navy"}`;
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
      <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Спланировать поездку</h1>
      <p className="mt-8 max-w-2xl text-xl text-mist/90">Выберите, что вам интересно и сколько есть времени. Мы подберём маршрут из проверенных мест.</p>

      <div className="mt-12 grid gap-8">
        <fieldset><legend className="mb-3 text-glow">Что интересно</legend>
          <div className="flex flex-wrap gap-3">{(Object.keys(interestName) as Interest[]).map((k) => (
            <button key={k} aria-pressed={interests.includes(k)} className={chip(interests.includes(k))} onClick={() => { setGo(false); setInterests(interests.includes(k) ? interests.filter((x) => x !== k) : [...interests, k]); }}>{interestName[k]}</button>
          ))}</div>
        </fieldset>
        <fieldset><legend className="mb-3 text-glow">Сколько времени</legend>
          <div className="flex flex-wrap gap-3">{(Object.keys(durationName) as Duration[]).map((k) => (
            <button key={k} aria-pressed={duration === k} className={chip(duration === k)} onClick={() => { setGo(false); setDuration(k); }}>{durationName[k]}</button>
          ))}</div>
        </fieldset>
        <fieldset><legend className="mb-3 text-glow">Траты</legend>
          <div className="flex flex-wrap gap-3">
            <button aria-pressed={!noPaid} className={chip(!noPaid)} onClick={() => { setGo(false); setNoPaid(false); }}>Готов платить за экскурсии и мастер-классы</button>
            <button aria-pressed={noPaid} className={chip(noPaid)} onClick={() => { setGo(false); setNoPaid(true); }}>Минимум трат</button>
          </div>
        </fieldset>
        <button onClick={() => setGo(true)} className="justify-self-start bg-cobalt px-8 py-4 text-lg font-semibold text-white hover:bg-glow hover:text-night">Подобрать маршрут</button>
      </div>

      {go && res.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-4xl font-bold text-white">Ваш маршрут</h2>
          <div className="mt-6"><RouteCard id={res[0].id} big /></div>
          {res.length > 1 && <p className="mt-6 text-mist/80">Ещё варианты: {res.slice(1, 3).map((r) => r.title).join(", ")}. Все маршруты ниже.</p>}
        </section>
      )}
      <p className="mt-6 text-sm text-mist/60">Цены и часы работы уточняйте у организаций: мы публикуем только подтверждённые сведения.</p>

      <h2 className="mt-16 font-display text-4xl font-bold text-white">Все готовые маршруты</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">{routes.map((r) => <RouteCard key={r.id} id={r.id} />)}</div>
    </main>
  );
}
