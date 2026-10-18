"use client";
import { useState } from "react";

export default function ShareButton({ path, title, label = "Поделиться" }: { path: string; title: string; label?: string }) {
  const [done, setDone] = useState(false);
  async function share() {
    const url = location.origin + path;
    try {
      if (navigator.share) { await navigator.share({ title, url }); return; }
      await navigator.clipboard.writeText(url);
      setDone(true); setTimeout(() => setDone(false), 2500);
    } catch {}
  }
  return <button onClick={share} className="border border-glow/40 px-4 py-2 text-sm font-semibold hover:bg-navy">{done ? "Ссылка скопирована" : label}</button>;
}
