import type { Metadata } from "next";
import "@fontsource/cormorant/cyrillic-500.css";
import "@fontsource/cormorant/cyrillic-700.css";
import "@fontsource/golos-text/cyrillic-400.css";
import "@fontsource/golos-text/cyrillic-600.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Art City Gzhel: гжельская керамика, мастер-классы, экскурсии, опт", template: "%s | Art City Gzhel" },
  description: "Гжель в Раменском районе: история, мастерские, мастер-классы, экскурсии, покупка и оптовые заказы гжельской керамики.",
  openGraph: { images: ["/art-city.jpg"], locale: "ru_RU", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body><Header />{children}<Footer /></body>
    </html>
  );
}
