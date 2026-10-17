import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Что посмотреть в Гжели за один день: маршрут из Москвы",
  description: "Готовый маршрут на день: электричка до станции Гжель, завод и экскурсия, мастер-класс по росписи, магазин сувениров.",
  alternates: { canonical: "/marshrut-na-den" },
};

const map = (q: string) => `https://yandex.ru/maps/?text=${encodeURIComponent(q)}`;

const stops = [
  { t: "Утро", h: "Дорога", p: "Электричка с Казанского вокзала до станции Гжель. На машине быстрее, но с электричкой не нужен парковочный квест.", q: "станция Гжель" },
  { t: "Первая половина дня", h: "Завод и экскурсия", p: "От станции до Гжельского завода идти около 15 минут. На экскурсии производство работает, видно мастеров и цеха. Запись заранее.", q: "Гжельский фарфоровый завод", link: "/masterskie/gzhelskiy-farforovyi-zavod" },
  { t: "Середина дня", h: "Мастер-класс", p: "Расписываете заготовку кобальтом. Изделие обжигают, затем вы его забираете, договоритесь о способе получения заранее.", q: "Гжельский фарфоровый завод мастер-класс", link: "/masterklassy" },
  { t: "После обеда", h: "Магазин и сувениры", p: "Магазин при заводе и «Гжельские сувениры» при фабрике «Синь России»: чайные пары, тарелки, колокольчики.", q: "Синь России Гжель магазин", link: "/masterskie/sin-rossii" },
];

export default function Page() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-10">
        <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Гжель за один день из Москвы</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist/90">Готовый маршрут: дорога, завод, мастер-класс и сувениры. Времена ориентировочные, расписание экскурсий уточняйте при записи.</p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <ol className="divide-y divide-glow/20 border-y border-glow/20">
          {stops.map((s) => (
            <li key={s.h} className="grid gap-4 py-8 md:grid-cols-[0.7fr_1fr_1.4fr] md:gap-10">
              <p className="text-glow">{s.t}</p>
              <h2 className="font-display text-3xl font-bold text-white">{s.h}</h2>
              <div>
                <p className="max-w-lg text-lg leading-relaxed text-mist/85">{s.p}</p>
                <p className="mt-4 flex flex-wrap gap-5 text-sm">
                  <a href={map(s.q)} target="_blank" rel="noopener noreferrer" className="text-glow underline underline-offset-4 hover:text-white">Открыть на Яндекс.Картах</a>
                  {s.link && <Link href={s.link} className="text-glow underline underline-offset-4 hover:text-white">Подробнее</Link>}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section id="zayavka" className="bg-navy/70 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Хотите такой маршрут под вашу группу? Оставьте заявку</h2>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
