import fs from "node:fs";
import path from "node:path";
import { HeroArt } from "@/components/HeroArt";
import LeadForm from "@/components/LeadForm";

const directions = [
  { id: "see", title: "Что посмотреть", text: "Фабрики, музеи и мастерские, где можно увидеть, как глина становится фарфором и как кисть кладёт кобальт." },
  { id: "learn", title: "Где научиться", text: "Мастер-классы по росписи для взрослых, детей и компаний. Уходите со своей расписной тарелкой." },
  { id: "buy", title: "Где купить", text: "Посуда, сувениры и подарочные наборы напрямую от мастерских Гжели, без наценок перекупщиков." },
  { id: "order", title: "Опт и под заказ", text: "Сервизы с логотипом, свадебные и корпоративные подарки, партии для кафе, отелей и магазинов." },
];

const facts = [
  { h: "Кобальт чернеет, а потом синеет", t: "Перед обжигом роспись выглядит почти чёрной. Синий цвет появляется только в печи." },
  { h: "Первое упоминание в 1339 году", t: "Гжельские деревни названы в грамоте Ивана Калиты. Глину здесь копали веками." },
  { h: "Каждый мазок делается одним движением", t: "Мастер ведёт кисть без правок, поэтому нет двух одинаковых лепестков." },
];

export default function Home() {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public/hero.png"));
  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="font-display text-3xl font-bold text-cobalt">Гжель</a>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#about" className="hover:text-cobalt">О гжели</a>
          <a href="#directions" className="hover:text-cobalt">Что делать</a>
          <a href="#order" className="hover:text-cobalt">Заявка</a>
        </nav>
        <a href="#order" className="bg-cobalt px-5 py-2.5 text-sm font-semibold text-white hover:bg-deep">Оставить заявку</a>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-6xl items-center gap-4 px-6 pb-16 pt-6 md:grid-cols-[1.1fr_0.9fr] md:pb-24">
          <div className="relative z-10">
            <h1 className="font-display text-6xl font-bold leading-[0.95] text-cobalt sm:text-7xl md:text-8xl">
              Синяя роспись по белому фарфору
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed">
              Всё про гжельскую керамику в Раменском районе: где посмотреть, чему научиться и где купить у самих мастеров.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#directions" className="bg-cobalt px-7 py-4 font-semibold text-white hover:bg-deep">Выбрать, что нужно</a>
              <a href="#order" className="border-2 border-cobalt px-7 py-4 font-semibold text-cobalt hover:bg-porcelain">Заказать опт</a>
            </div>
          </div>
          <div className="relative -mt-10 h-[460px] md:mt-0 md:h-[640px]">
            {hasPhoto ? <img src="/hero.png" alt="Девушка с длинными волосами и бантами в гжельской росписи" className="h-full w-full object-contain object-right" /> : <HeroArt />}
          </div>
        </section>

        <div className="border-gz" aria-hidden />

        <section id="about" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-2xl font-display text-5xl font-bold leading-tight text-cobalt">Почему гжель узнают с первого взгляда</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {facts.map((f) => (
              <div key={f.h} className="border-t-2 border-cobalt pt-5">
                <h3 className="font-display text-2xl font-bold">{f.h}</h3>
                <p className="mt-3 leading-relaxed">{f.t}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="directions" className="bg-porcelain py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-5xl font-bold text-cobalt">Что можно сделать в Гжели</h2>
            <ul className="mt-12 divide-y divide-glaze">
              {directions.map((d) => (
                <li key={d.id} id={d.id} className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
                  <h3 className="font-display text-4xl font-bold text-cobalt">{d.title}</h3>
                  <p className="max-w-lg text-lg leading-relaxed">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="order" className="bg-cobalt py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
            <div>
              <h2 className="font-display text-5xl font-bold leading-tight text-white">Оставьте заявку, подберём мастерскую под вашу задачу</h2>
              <p className="mt-6 max-w-md text-lg text-white/85">Опт, сувениры, мастер-класс или экскурсия. Перезвоним в течение дня и назовём цену.</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <div className="border-gz" aria-hidden />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm">Гжель, Раменский район, Московская область</footer>
    </>
  );
}
