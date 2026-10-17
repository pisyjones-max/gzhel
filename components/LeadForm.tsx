"use client";
import { useState } from "react";

export default function LeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  const field = "w-full rounded-none border-b-2 border-white/50 bg-transparent px-1 py-3 text-lg text-white placeholder:text-white/60 focus:border-white focus:outline-none";

  if (state === "ok") return <p className="font-display text-3xl text-white">Заявка отправлена. Перезвоним в течение дня.</p>;

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <label className="grid gap-1"><span className="text-white/80">Что нужно</span>
        <select name="topic" className={field + " [&>option]:text-night"} defaultValue="Опт и заказ посуды">
          <option>Опт и заказ посуды</option><option>Сувениры и подарки</option><option>Мастер-класс</option><option>Экскурсия по Гжели</option>
        </select>
      </label>
      <label className="grid gap-1"><span className="text-white/80">Имя</span><input name="name" required className={field} placeholder="Как к вам обращаться" /></label>
      <label className="grid gap-1"><span className="text-white/80">Телефон</span><input name="phone" required type="tel" className={field} placeholder="+7" /></label>
      <label className="grid gap-1"><span className="text-white/80">Комментарий</span><textarea name="comment" rows={3} className={field} placeholder="Сколько, на какую дату, для кого" /></label>
      <button disabled={state === "sending"} className="justify-self-start bg-white px-8 py-4 text-lg font-semibold text-night transition hover:bg-porcelain disabled:opacity-60">
        {state === "sending" ? "Отправляем" : "Отправить заявку"}
      </button>
      {state === "error" && <p className="text-white">Не отправилось. Попробуйте ещё раз.</p>}
    </form>
  );
}
