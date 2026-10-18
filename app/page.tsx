import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { items, catName } from "@/lib/catalog";
import { articles } from "@/lib/articles";

const tools = [
  { h: "Каталог мест", p: "Мастерские, храмы, музеи, где поесть и остановиться. Поиск и фильтры.", href: "/mesta" },
  { h: "Спланировать поездку", p: "Выберите интересы и время, получите готовый маршрут.", href: "/planirovat" },
  { h: "Купоны", p: "Скидки для туристов в магазинах-партнёрах.", href: "/kupony" },
  { h: "Афиша", p: "Мастер-классы, выставки и ярмарки.", href: "/afisha" },
];

const world = [
  { c: "Делфт, Нидерланды", t: "Синяя керамика стала сувениром всей страны. Вокруг фабрик построены маршруты, музеи и мастер-классы." },
  { c: "Цзиндэчжэнь, Китай", t: "Фарфоровая столица с тысячелетней историей: мастерские, рынки, фестивали и студии для приезжих мастеров." },
  { c: "Мейсен, Германия", t: "Первый европейский фарфор появился здесь в 1710 году. Сегодня это фабрика-музей и главное место притяжения города." },
  { c: "Арита, Япония", t: "Керамический город с ежегодной ярмаркой, на которую съезжаются покупатели и коллекционеры." },
  { c: "Сток-он-Трент, Англия", t: "Исторический центр британской керамики. Здесь проходит биеннале, где традиция встречается с современным дизайном." },
];

const ours = [
  { h: "Маршрут на день", p: "Одна страница, один билет, готовая программа от станции до мастерской." },
  { h: "Мастер-классы с бронью", p: "Выбрал время, оплатил, пришёл расписывать." },
  { h: "Каталог мастерских", p: "Понятно, кто что делает, что стоит и как заказать." },
  { h: "Дизайнерские коллаборации", p: "Гжель в интерьере, моде и корпоративных подарках." },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src="/art-city.jpg" alt="Девушка в платье с гжельской росписью на тёмно-синем фоне" fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[70%_20%] opacity-90"
          style={{ WebkitMaskImage: "linear-gradient(to left, black 35%, transparent 85%)", maskImage: "linear-gradient(to left, black 35%, transparent 85%)" }}
        />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl items-center px-6 py-16">
          <div className="hero-in max-w-xl">
            <h1 className="glow-text font-display text-6xl font-bold leading-[0.95] text-white sm:text-7xl md:text-8xl">Гжель: синяя столица русской керамики</h1>
            <p className="mt-8 text-xl leading-relaxed text-mist/90">История, мастерские, мастер-классы и покупка у мастеров. Всё о гжельской керамике в Раменском районе в одном месте.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/ekskursii" className="bg-cobalt px-7 py-4 font-semibold text-white hover:bg-glow hover:text-night">Планировать поездку</Link>
              <Link href="/opt" className="border border-glow px-7 py-4 font-semibold text-white hover:bg-navy">Заказать опт</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-gz" aria-hidden />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-3xl font-display text-5xl font-bold leading-tight text-white md:text-6xl">Всё для поездки в одном месте</h2>
        <ul className="mt-12 grid gap-px bg-glow/20 md:grid-cols-2">
          {tools.map((t) => (
            <li key={t.h} className="bg-night"><Link href={t.href} className="block p-8 hover:bg-navy/60">
              <h3 className="font-display text-3xl font-bold text-white">{t.h}</h3><p className="mt-2 text-lg text-mist/85">{t.p}</p>
            </Link></li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex items-end justify-between gap-6"><h2 className="font-display text-5xl font-bold text-white">Что посмотреть</h2><Link href="/mesta" className="text-glow underline underline-offset-4 hover:text-white">Весь каталог</Link></div>
        <ul className="mt-10 divide-y divide-glow/20 border-y border-glow/20">
          {items.slice(0, 6).map((i) => (
            <li key={i.id}><Link href={`/mesta/${i.id}`} className="grid gap-2 py-6 hover:bg-navy/50 md:grid-cols-[1.1fr_1.4fr] md:gap-10">
              <div><h3 className="font-display text-3xl font-bold text-white">{i.name}</h3><p className="text-glow">{catName[i.cat]}, {i.town}</p></div>
              <p className="max-w-lg text-lg text-mist/85">{i.short}</p>
            </Link></li>
          ))}
        </ul>
      </section>

      <div className="border-gz" aria-hidden />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="max-w-3xl font-display text-5xl font-bold leading-tight text-white md:text-6xl">Как мир превращает керамику в туристический бренд</h2>
        <ul className="mt-12 divide-y divide-glow/20 border-y border-glow/20">
          {world.map((w) => (
            <li key={w.c} className="grid gap-3 py-7 md:grid-cols-[1fr_1.6fr] md:gap-12">
              <h3 className="font-display text-3xl font-bold text-glow">{w.c}</h3>
              <p className="max-w-xl text-lg leading-relaxed text-mist/85">{w.t}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <img src="/girl-portrait.jpg" alt="Девушка с гжельскими цветами в волосах" loading="lazy" className="h-full w-full object-cover" />
          <img src="/girl-face.jpg" alt="Портрет с синей гжельской росписью" loading="lazy" className="mt-12 h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-5xl font-bold leading-tight text-white">Что мы берём у лучших и делаем для Гжели</h2>
          <ul className="mt-10 grid gap-6">
            {ours.map((o) => (
              <li key={o.h} className="border-l-2 border-cobalt pl-5">
                <h3 className="font-display text-2xl font-bold text-white">{o.h}</h3>
                <p className="mt-1 text-mist/85">{o.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="font-display text-5xl font-bold text-white">Читать о гжели</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug} className="border-t-2 border-cobalt pt-4"><Link href={`/stati/${a.slug}`} className="block hover:text-glow">
              <h3 className="font-display text-2xl font-bold text-white">{a.title}</h3><p className="mt-2 text-mist/85">{a.lead}</p>
            </Link></li>
          ))}
        </ul>
      </section>

      <section className="bg-navy/70 py-20" id="zayavka">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl font-bold leading-tight text-white">Расскажите, что вам нужно, и мы подберём мастерскую</h2>
            <p className="mt-6 max-w-md text-lg text-mist/85">Опт, сувениры, мастер-класс или экскурсия. Мы перезвоним в течение дня и назовём цену.</p>
          </div>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
