import { NextResponse } from "next/server";
import { getShop } from "@/lib/shops";
import { getStop, asLang } from "@/lib/stops";
import { issue } from "@/lib/store";
import { ipOf, limited } from "@/lib/limit";

export async function POST(req: Request) {
  if (limited("issue:" + ipOf(req), 5, 3600_000)) return NextResponse.json({ ok: false }, { status: 429 });
  const b = await req.json().catch(() => null);
  const shop = getShop(b?.shopId);
  const stop = getStop(b?.stopId);
  if (!shop || !stop || stop.shopId !== shop.id) return NextResponse.json({ ok: false }, { status: 400 });
  const c = await issue(shop.id, stop.id, asLang(b?.lang), shop.validDays);
  return NextResponse.json({ ok: true, code: c.code, expiresAt: c.expiresAt, discount: shop.discount });
}
