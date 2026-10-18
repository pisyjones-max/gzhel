import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Гжель и Коломна: маршрут на целый день",
  description: "Утро в Гжели с заводом и мастер-классом, день в Коломне: кремль, пастила, музеи. Как построить маршрут и что учесть.",
  alternates: { canonical: "/marshrut-gzhel-kolomna" },
};

const steps = [
  { t: "Утро", h: "Гжель", p: "Завод и экскурсия, мастер-класс по росписи, магазин сувениров. Закладывайте на это первую половину дня.", href: "/marshrut-na-den", l: "Маршрут по Гжели" },
  { t: "Дорога", h: "Переезд в Коломну", p: "Это длинный переезд, поэтому маршрут делают на целый день или с ночёвкой. Автобусные группы обычно едут с остановкой на обед.", href: "/gde-poest-i-pospat", l: "Где поесть и поспать" },
  { t: "День", h: "Коломенский кремль и посад", p: "Кремль на высоком берегу Москвы-реки, прогулка по старому городу. От платформы до кремля около получаса пешком.", href: "/guide/kolomna", l: "Гид по Коломне" },
  { t: "Дальше", h: "Пастила и «Патефонка»", p: "Два музея пастилы и музей «Патефонка» находятся примерно в 15 минутах пешком от платформы. Здесь же можно поесть выпечку и купить сладкие сувениры.", href: "/guide/kolomna", l: "Что смотреть" },
];

export default function Page() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-10">
        <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Гжель и Коломна за один день</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist/90">Керамика утром, кремль и пастила днём. Это один из самых частых маршрутов для туристов из Москвы.</p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <ol className="divide-y divide-glow/20 border-y border-glow/20">
          {steps.map((s) => (
            <li key={s.h} className="grid gap-4 py-8 md:grid-cols-[0.6fr_1fr_1.4fr] md:gap-10">
              <p className="text-glow">{s.t}</p>
              <h2 className="font-display text-3xl font-bold text-white">{s.h}</h2>
              <div>
                <p className="max-w-lg text-lg leading-relaxed text-mist/85">{s.p}</p>
                <Link href={s.href} className="mt-4 inline-block text-glow underline underline-offset-4 hover:text-white">{s.l}</Link>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-mist/60">Время ориентировочное. Расписание музеев и экскурсий проверяйте при записи.</p>
      </section>
      <section id="zayavka" className="bg-navy/70 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Нужен такой маршрут для группы? Оставьте заявку</h2>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
