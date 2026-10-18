"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type R = { ok: boolean; status?: string; discount?: number; shop?: string; error?: string; expiresAt?: string };
const msg: Record<string, string> = { valid: "Купон действует", ok: "Скидка применена", used: "Уже использован", expired: "Срок истёк", notfound: "Такого купона нет", bad_pin: "Неверный PIN", slow_down: "Слишком много попыток, подождите", not_configured: "Сервер не настроен" };

function Form() {
  const sp = useSearchParams();
  const [code, setCode] = useState(sp.get("code") || "");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [r, setR] = useState<R | null>(null);

  useEffect(() => { try { setPin(sessionStorage.getItem("pin") || ""); } catch {} }, []);

  async function send(action: "check" | "redeem") {
    try { sessionStorage.setItem("pin", pin); } catch {}
    const res = await fetch("/api/coupon/redeem", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, pin, action, amount }) });
    setR(await res.json());
  }
  const field = "w-full border-b-2 border-white/50 bg-transparent px-1 py-3 text-xl text-white placeholder:text-white/50 focus:border-white focus:outline-none";
  const key = r?.status || r?.error || "";

  return (
    <main className="mx-auto max-w-xl px-6 pb-24 pt-10">
      <h1 className="font-display text-5xl font-bold text-white">Проверка купона</h1>
      <div className="mt-10 grid gap-6">
        <input className={field} value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="GZ-123456" aria-label="Код купона" />
        <input className={field} value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN продавца" type="password" inputMode="numeric" aria-label="PIN" />
        <input className={field} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Сумма чека, ₽ (по желанию)" inputMode="numeric" aria-label="Сумма" />
        <div className="flex gap-4">
          <button onClick={() => send("check")} className="border border-glow px-6 py-3 font-semibold hover:bg-navy">Проверить</button>
          <button onClick={() => send("redeem")} className="bg-cobalt px-6 py-3 font-semibold text-white hover:bg-glow hover:text-night">Применить скидку</button>
        </div>
      </div>
      {r && (
        <p className={`mt-8 border p-5 text-2xl ${r.ok ? "border-glow bg-navy" : "border-white/40"}`}>
          {msg[key] || "Ошибка"}{r.ok && r.discount ? `: −${r.discount}%` : ""}
        </p>
      )}
    </main>
  );
}

export default function Page() {
  return <Suspense><Form /></Suspense>;
}
