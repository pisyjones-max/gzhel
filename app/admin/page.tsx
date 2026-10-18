import crypto from "node:crypto";
import { shops } from "@/lib/shops";
import { listCoupons } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata = { title: "Статистика", robots: { index: false, follow: false } };

export default async function Page({ searchParams }: { searchParams: { key?: string } }) {
  const key = process.env.ADMIN_KEY || "";
  const given = searchParams.key || "";
  const ok = key.length > 0 && given.length === key.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(key));
  if (!ok) return <main className="mx-auto max-w-xl px-6 py-20 text-xl">Нет доступа</main>;

  const all = await listCoupons();
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-10">
      <h1 className="font-display text-5xl font-bold text-white">Статистика купонов</h1>
      <div className="mt-10 grid gap-10">
        {shops.map((s) => {
          const mine = all.filter((c) => c.shopId === s.id);
          const used = mine.filter((c) => c.redeemedAt);
          const sum = used.reduce((a, c) => a + (c.amount || 0), 0);
          const byLang = ["ru", "en", "zh"].map((l) => `${l}: ${mine.filter((c) => c.lang === l).length}`).join(", ");
          return (
            <section key={s.id} className="border-t-2 border-cobalt pt-5">
              <h2 className="font-display text-3xl font-bold text-white">{s.name.ru}</h2>
              <p className="mt-3 text-xl">Выдано: <b>{mine.length}</b>. Погашено: <b>{used.length}</b>. Оборот по чекам: <b>{sum.toLocaleString("ru-RU")} ₽</b></p>
              <p className="mt-2 text-mist/80">Выдано по языкам: {byLang}</p>
              <ul className="mt-5 grid gap-1 text-sm text-mist/80">
                {used.slice(-10).reverse().map((c) => <li key={c.code}>{c.code}: {new Date(c.redeemedAt!).toLocaleString("ru-RU")}{c.amount ? `, ${c.amount} ₽` : ""}</li>)}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
