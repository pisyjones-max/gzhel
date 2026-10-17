import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const d = await req.json().catch(() => null);
  if (!d?.phone || !d?.name) return NextResponse.json({ ok: false }, { status: 400 });

  const token = process.env.TG_BOT_TOKEN;
  const chat = process.env.TG_CHAT_ID;
  const text = `Заявка с сайта\nТема: ${d.topic}\nИмя: ${d.name}\nТелефон: ${d.phone}\nКомментарий: ${d.comment || "-"}`;

  if (token && chat) {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text }),
    });
    if (!r.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } else {
    console.log(text);
  }
  return NextResponse.json({ ok: true });
}
