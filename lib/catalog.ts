import { workshops } from "./workshops";

export type Cat = "workshop" | "sight" | "church" | "shop" | "park" | "eat" | "stay";
export const catName: Record<Cat, string> = {
  workshop: "Мастерские и производства", sight: "Достопримечательности", church: "Храмы",
  shop: "Магазины", park: "Парки и прогулки", eat: "Где поесть", stay: "Где остановиться",
};
// Пустое поле в contacts значит «уточняется». Ничего не выдумываем: заполняем только проверенным.
export type Item = {
  id: string; cat: Cat; name: string; town: string; short: string; text: string[]; tags: string[];
  href?: string; contacts?: { phone?: string; site?: string; address?: string; hours?: string; price?: string };
  source: string[]; verifiedAt: string; demo?: boolean;
};

const src: Record<string, string[]> = {
  "gzhelskiy-farforovyi-zavod": ["https://t-j.ru/must-see-gzhelskii-farforovyi-zavod/", "https://tonkosti.ru/Гжель"],
  "gzhelskaya-farforovaya-manufaktura": ["https://www.sputnik8.com/ru/moscow/activities/48406-sinie-uzory-rossii-gzhel-farforovaya-manufaktura-galaktika-i-ko"],
  "obedinenie-gzhel": ["https://riamo.ru/articles/istorii/gzhel-russkij-narodnyj-promysel-rodom-iz-podmoskovya"],
  "sin-rossii": ["https://www.culture.ru/events/1801539/ekskursiya-sin-rossii", "https://tonkosti.ru/Гжель"],
  "kolledzh-gzhel": ["https://tonkosti.ru/Гжель"],
};
const fromWorkshops: Item[] = workshops.map((w) => ({
  id: w.id, cat: "workshop", name: w.name, town: "Гжель", short: w.short, text: w.text,
  tags: [...w.offers.map((o) => o.toLowerCase()), "ceramics", ...(w.id === "kolledzh-gzhel" ? ["art"] : []), ...(w.offers.includes("Мастер-класс") ? ["masterclass"] : [])],
  href: `/masterskie/${w.id}`, source: src[w.id] || [], verifiedAt: "2026-10",
}));

export const items: Item[] = [
  ...fromWorkshops,
  {
    id: "uspenskaya-tserkov", cat: "church", name: "Церковь Успения Пресвятой Богородицы", town: "Гжель",
    short: "Старый храм, переживший пожар 1736 года. Сейчас на реставрации. Рядом магазин гжели.",
    text: ["Первое упоминание храма относится к 1631–1633 годам. Нынешнее здание построено в 1859 году."],
    tags: ["history", "free-walk"], href: "/guide/uspenskaya-tserkov", source: ["https://nashipredki.com/church/15706"], verifiedAt: "2026-10",
  },
  {
    id: "kolomna-kreml", cat: "sight", name: "Коломенский кремль", town: "Коломна",
    short: "Средневековая крепость на высоком берегу Москвы-реки, главная точка города.",
    text: ["От платформы Коломна до кремля около получаса пешком."], tags: ["history", "free-walk"],
    href: "/guide/kolomna", source: ["https://journal.sovcombank.ru/puteshestviya/kuda-shodit-i-chto-posmotret-v-kolomne-za-odin-den"], verifiedAt: "2026-10",
  },
  {
    id: "kolomna-muzei-pastily", cat: "sight", name: "Музеи пастилы", town: "Коломна",
    short: "Два музея: «Коломенская пастила» и музейная фабрика купца Чуприкова. Есть экскурсии с дегустацией.",
    text: ["От платформы Коломна около 15 минут пешком."], tags: ["food", "family", "excursion"],
    href: "/guide/kolomna", source: ["https://journal.sovcombank.ru/puteshestviya/kuda-shodit-i-chto-posmotret-v-kolomne-za-odin-den", "https://www.sputnik8.com/ru/activities/78521"], verifiedAt: "2026-10",
  },
  {
    id: "patefonka", cat: "sight", name: "Музей «Патефонка»", town: "Коломна",
    short: "Музей в центре Коломны рядом с музеями пастилы.", text: ["Подробности о часах работы и ценах уточняются."], tags: ["art", "family"],
    href: "/guide/kolomna", source: ["https://journal.sovcombank.ru/puteshestviya/kuda-shodit-i-chto-posmotret-v-kolomne-za-odin-den"], verifiedAt: "2026-10",
  },
  {
    id: "mini-gostinitsa-akvarel", cat: "stay", name: "Мини-гостиница «Акварель»", town: "Гжель",
    short: "Небольшая гостиница в самой Гжели.", text: ["Условия и цены уточняйте при бронировании."], tags: ["stay"],
    source: ["https://101hotels.com/main/cities/gzhel"], verifiedAt: "2026-10",
  },
];
export const getItem = (id: string) => items.find((i) => i.id === id);
export const towns = Array.from(new Set(items.map((i) => i.town)));
