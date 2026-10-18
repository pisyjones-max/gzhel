import { NextRequest, NextResponse } from "next/server";

// Сюда ведёт QR в автобусе: язык берём из настроек телефона.
export function GET(req: NextRequest) {
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  const first = al.split(",")[0] || "";
  const lang = first.startsWith("zh") ? "zh" : first.startsWith("ru") ? "ru" : first.startsWith("en") ? "en" : al.includes("zh") ? "zh" : "ru";
  const url = req.nextUrl.clone();
  url.pathname = "/guide/uspenskaya-tserkov";
  url.search = `?lang=${lang}`;
  return NextResponse.redirect(url, 307);
}
