import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getShop } from "@/lib/shops";
import { findCoupon, redeem } from "@/lib/store";
import { ipOf, limited } from "@/lib/limit";

const same = (a: string, b: string) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

export async function POST(req: Request) {
  const pin = process.env.SHOP_PIN;
  if (!pin) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  if (limited("pin:" + ipOf(req), 20, 600_000)) return NextResponse.json({ ok: false, error: "slow_down" }, { status: 429 });
  const b = await req.json().catch(() => null);
  if (!b?.code || !same(String(b.pin || ""), pin)) return NextResponse.json({ ok: false, error: "bad_pin" }, { status: 401 });

  if (b.action === "redeem") {
    const r = await redeem(String(b.code), Number(b.amount) || undefined);
    const shop = r.coupon && getShop(r.coupon.shopId);
    return NextResponse.json({ ok: r.status === "ok", status: r.status, discount: shop?.discount, shop: shop?.name.ru });
  }
  const c = await findCoupon(String(b.code));
  if (!c) return NextResponse.json({ ok: false, status: "notfound" });
  const shop = getShop(c.shopId);
  const status = c.redeemedAt ? "used" : new Date(c.expiresAt).getTime() < Date.now() ? "expired" : "valid";
  return NextResponse.json({ ok: status === "valid", status, discount: shop?.discount, shop: shop?.name.ru, expiresAt: c.expiresAt });
}
