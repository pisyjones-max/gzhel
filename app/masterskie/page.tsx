import type { Metadata } from "next";
import Catalog from "@/components/Catalog";
import LeadForm from "@/components/LeadForm";
import { workshops } from "@/lib/workshops";

export const metadata: Metadata = {
  title: "Мастерские и фабрики Гжели: каталог",
  description: "Каталог гжельских заводов, мануфактур и мастерских: экскурсии, мастер-классы, магазины и выездные программы.",
  alternates: { canonical: "/masterskie" },
};

export default function Page() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <h1 className="glow-text max-w-4xl font-display text-5xl font-bold leading-[1.02] text-white md:text-7xl">Мастерские и фабрики Гжели</h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist/90">Где посмотреть производство, расписать свою чашку и купить у мастеров. Выберите, что вам нужно.</p>
        <div className="mt-12"><Catalog items={workshops} /></div>
        <p className="mt-6 text-sm text-mist/60">Данные из открытых источников. Цены, часы работы и запись уточняйте у организаций.</p>
      </section>
      <section id="zayavka" className="bg-navy/70 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Ваша мастерская не в списке?</h2>
            <p className="mt-6 max-w-md text-lg text-mist/85">Выберите в заявке «Добавить мою мастерскую в каталог». Мы свяжемся и расскажем условия.</p>
          </div>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
