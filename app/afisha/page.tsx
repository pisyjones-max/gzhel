import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { upcoming } from "@/lib/events";

export const metadata: Metadata = { title: "Афиша Гжели: мастер-классы, выставки, фестивали", description: "События Гжели: мастер-классы, выставки, экскурсии, ярмарки и фестивали.", alternates: { canonical: "/afisha" } };
export const dynamic = "force-dynamic";
const types = ["Мастер-класс", "Выставка", "Экскурсия", "Фестиваль", "Ярмарка"];

export default function Page({ searchParams }: { searchParams: { type?: string } }) {
  const list = upcoming().filter((e) => !searchParams.type || e.type === searchParams.type);
  const chip = (on: boolean) => `px-4 py-2 text-sm font-semibold border ${on ? "border-cobalt bg-cobalt text-white" : "border-glow/40 hover:bg-navy"}`;
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Афиша Гжели</h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/afisha" className={chip(!searchParams.type)}>Все</Link>
          {types.map((t) => <Link key={t} href={`/afisha?type=${encodeURIComponent(t)}`} className={chip(searchParams.type === t)}>{t}</Link>)}
        </div>
        {list.length ? (
          <ul className="mt-10 divide-y divide-glow/20 border-y border-glow/20">
            {list.map((e) => (
              <li key={e.id} className="grid gap-3 py-7 md:grid-cols-[0.7fr_1.2fr_1fr] md:gap-10">
                <p className="text-glow">{new Date(e.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}<br />{e.type}</p>
                <div><h2 className="font-display text-3xl font-bold text-white">{e.title}</h2><p className="mt-2 text-mist/85">{e.desc}</p><p className="mt-2 text-sm text-mist/60">{e.place}{e.price ? `, ${e.price}` : ""}</p></div>
                <p>{e.signup ? <a href={e.signup} target="_blank" rel="noopener noreferrer" className="bg-cobalt px-5 py-3 font-semibold text-white hover:bg-glow hover:text-night">Записаться</a> : <Link href="#zayavka" className="underline">Узнать подробности</Link>}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 border border-glow/30 p-8">
            <p className="font-display text-3xl font-bold text-white">Подтверждённых событий пока нет</p>
            <p className="mt-3 max-w-xl text-lg text-mist/85">Мы не публикуем даты, пока их не подтвердили организаторы. Проводите мастер-классы, выставки или ярмарки? Расскажите нам, и событие появится здесь.</p>
          </div>
        )}
      </section>
      <section id="zayavka" className="bg-navy/70 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Предложите событие в афишу</h2>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
