import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export type Coupon = {
  code: string; shopId: string; stopId: string; lang: string;
  issuedAt: string; expiresAt: string; redeemedAt?: string; amount?: number;
};

const dir = process.env.DATA_DIR || path.join(process.cwd(), "data");
const file = path.join(dir, "coupons.json");
let chain: Promise<unknown> = Promise.resolve();
function locked<T>(fn: () => Promise<T>): Promise<T> {
  const r = chain.then(fn, fn);
  chain = r.catch(() => undefined);
  return r;
}
async function load(): Promise<Coupon[]> {
  try { return JSON.parse(await fs.readFile(file, "utf8")); } catch { return []; }
}
async function save(c: Coupon[]) {
  await fs.mkdir(dir, { recursive: true });
  const tmp = file + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(c));
  await fs.rename(tmp, file);
}

export const listCoupons = () => load();

export function issue(shopId: string, stopId: string, lang: string, validDays: number) {
  return locked(async () => {
    const all = await load();
    let code = "";
    do { code = "GZ-" + crypto.randomInt(0, 1_000_000).toString().padStart(6, "0"); } while (all.some((c) => c.code === code));
    const now = Date.now();
    const c: Coupon = { code, shopId, stopId, lang, issuedAt: new Date(now).toISOString(), expiresAt: new Date(now + validDays * 864e5).toISOString() };
    all.push(c);
    await save(all);
    return c;
  });
}

export function findCoupon(code: string) {
  return load().then((all) => all.find((c) => c.code === code.trim().toUpperCase()));
}

export type RedeemResult = { status: "ok" | "notfound" | "used" | "expired"; coupon?: Coupon };
export function redeem(code: string, amount?: number): Promise<RedeemResult> {
  return locked(async () => {
    const all = await load();
    const c = all.find((x) => x.code === code.trim().toUpperCase());
    if (!c) return { status: "notfound" };
    if (c.redeemedAt) return { status: "used", coupon: c };
    if (new Date(c.expiresAt).getTime() < Date.now()) return { status: "expired", coupon: c };
    c.redeemedAt = new Date().toISOString();
    if (amount && amount > 0) c.amount = Math.round(amount);
    await save(all);
    return { status: "ok", coupon: c };
  });
}
