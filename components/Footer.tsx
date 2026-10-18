import Link from "next/link";
import { nav } from "./Header";

export default function Footer() {
  return (
    <>
      <div className="border-gz" aria-hidden />
      <footer className="mx-auto grid max-w-6xl gap-6 px-6 py-12 text-sm text-mist/80 md:grid-cols-2">
        <p className="font-display text-2xl tracking-[0.18em] text-mist">Art City Gzhel</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
          {[...nav, ["Гид по остановкам", "/guide"], ["Где поесть и поспать", "/gde-poest-i-pospat"], ["Мастерские", "/masterskie"], ["История", "/istoriya"], ["Мастер-классы", "/masterklassy"], ["Экскурсии", "/ekskursii"], ["Купить", "/kupit"], ["Опт", "/opt"]].map(([t, h]) => <Link key={h} href={h} className="hover:text-white">{t}</Link>)}
        </nav>
        <p>Гжель, Раменский район, Московская область</p>
      </footer>
    </>
  );
}
