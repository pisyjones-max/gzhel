import type { Metadata } from "next";
import "@fontsource/cormorant/cyrillic-500.css";
import "@fontsource/cormorant/cyrillic-700.css";
import "@fontsource/golos-text/cyrillic-400.css";
import "@fontsource/golos-text/cyrillic-600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Гжель: где смотреть, учиться и покупать гжельскую керамику",
  description: "Всё о гжельской керамике в Раменском районе: мастерские, мастер-классы, экскурсии, оптовые заказы и сувениры.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
