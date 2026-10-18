"use client";
import { useEffect, useState } from "react";

type Saved = { code: string; expiresAt: string; discount: number };
type Labels = { title: string; text: string; get: string; code: string; until: string; discount: string; error: string };

export default function CouponBox({ shopId, stopId, lang, labels }: { shopId: string; stopId: string; lang: string; labels: Labels }) {
  const key = "coupon:" + shopId;
  const [c, setC] = useState<Saved | null>(null);
  const [qr, setQr] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(key);
      if (s) { const v: Saved = JSON.parse(s); if (new Date(v.expiresAt).getTime() > Date.now()) setC(v); }
    } catch {}
  }, [key]);

  useEffect(() => {
    if (!c) return;
    import("qrcode").then((Q) =>
      Q.toDataURL(`${location.origin}/redeem?code=${c.code}`, { margin: 1, width: 240, color: { dark: "#050B1E", light: "#FFFFFF" } }).then(setQr)
    );
  }, [c]);

  async function get() {
    setBusy(true); setErr(false);
    try {
      const r = await fetch("/api/coupon", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ shopId, stopId, lang }) });
      const d = await r.json();
      if (!d.ok) throw new Error();
      const v: Saved = { code: d.code, expiresAt: d.expiresAt, discount: d.discount };
      try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
      setC(v);
    } catch { setErr(true); } finally { setBusy(false); }
  }

  return (
    <section className="border border-glow/40 bg-navy/60 p-6 md:p-8">
      <h2 className="font-display text-3xl font-bold text-white">{labels.title}</h2>
      <p className="mt-3 max-w-xl text-mist/85">{labels.text}</p>
      {!c ? (
        <button onClick={get} disabled={busy} className="mt-6 bg-cobalt px-8 py-4 text-lg font-semibold text-white hover:bg-glow hover:text-night disabled:opacity-60">{labels.get}</button>
      ) : (
        <div className="mt-6 flex flex-wrap items-center gap-8">
          {qr && <img src={qr} alt={c.code} width={180} height={180} className="bg-white p-2" />}
          <div>
            <p className="text-glow">{labels.code}</p>
            <p className="font-display text-5xl font-bold tracking-widest text-white">{c.code}</p>
            <p className="mt-3">{labels.discount}: <b>{c.discount}%</b></p>
            <p className="text-mist/80">{labels.until}: {new Date(c.expiresAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
      {err && <p className="mt-4 text-white">{labels.error}</p>}
    </section>
  );
}
