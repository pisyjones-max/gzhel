import Link from "next/link";

export const nav = [
  ["История", "/istoriya"], ["Мастерские", "/masterskie"], ["Мастер-классы", "/masterklassy"],
  ["Экскурсии", "/ekskursii"], ["Гид", "/guide"], ["Маршрут на день", "/marshrut-na-den"], ["Купить", "/kupit"], ["Опт", "/opt"],
] as const;

export default function Header() {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="font-display text-2xl font-medium tracking-[0.18em] text-mist">Art City Gzhel</Link>
      <nav className="hidden gap-7 text-sm xl:flex">
        {nav.map(([t, h]) => <Link key={h} href={h} className="text-mist/80 hover:text-white">{t}</Link>)}
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/#zayavka" className="bg-cobalt px-5 py-2.5 text-sm font-semibold text-white hover:bg-glow hover:text-night">Оставить заявку</Link>
        <details className="relative xl:hidden">
          <summary className="cursor-pointer list-none px-3 py-2 text-xl" aria-label="Меню">☰</summary>
          <div className="absolute right-0 mt-2 grid w-56 gap-1 border border-glow/30 bg-night p-3">
            {nav.map(([t, h]) => <Link key={h} href={h} className="px-2 py-2 hover:bg-navy">{t}</Link>)}
          </div>
        </details>
      </div>
    </header>
  );
}
