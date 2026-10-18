// Проверенные места. Добавляйте сюда только то, что проверили сами: название, город, примечание.
export type Place = { name: string; kind: "eat" | "stay"; town: string; note: string };
export const places: Place[] = [
  { name: "Мини-гостиница «Акварель»", kind: "stay", town: "Гжель", note: "Небольшая гостиница в самой Гжели. Условия и цены уточняйте при бронировании." },
];
