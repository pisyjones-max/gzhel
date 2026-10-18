export type Interest = "ceramics" | "history" | "art" | "family" | "food" | "independent";
export const interestName: Record<Interest, string> = { ceramics: "Керамика и мастерские", history: "История и храмы", art: "Искусство", family: "С детьми", food: "Вкусное", independent: "Сам по себе" };
export type Duration = "short" | "day" | "weekend";
export const durationName: Record<Duration, string> = { short: "2–3 часа", day: "Один день", weekend: "Выходные" };

export type Route = { id: string; title: string; duration: Duration; tags: Interest[]; paid: boolean; stops: string[]; note: string };
export const routes: Route[] = [
  { id: "short", title: "Гжель за 2–3 часа", duration: "short", tags: ["ceramics", "independent"], paid: true, stops: ["gzhelskiy-farforovyi-zavod", "sin-rossii"], note: "Экскурсия на заводе и сувениры. От станции Гжель до завода идти около 15 минут. Запись на экскурсию лучше сделать заранее." },
  { id: "walk", title: "Прогулка без трат: храм и посёлок", duration: "short", tags: ["history", "independent"], paid: false, stops: ["uspenskaya-tserkov"], note: "Осмотр храма снаружи (идёт реставрация) и неспешная прогулка по Гжели." },
  { id: "day", title: "День в Гжели: производство и роспись", duration: "day", tags: ["ceramics", "history", "independent"], paid: true, stops: ["uspenskaya-tserkov", "gzhelskiy-farforovyi-zavod", "gzhelskaya-farforovaya-manufaktura", "sin-rossii"], note: "Храм утром, затем завод и мануфактура с мастер-классом, в конце магазины сувениров." },
  { id: "family", title: "Семейный день в Гжели", duration: "day", tags: ["family", "ceramics"], paid: true, stops: ["gzhelskaya-farforovaya-manufaktura", "sin-rossii", "uspenskaya-tserkov"], note: "Центр дня — мастер-класс по росписи. Заранее уточните, какие программы подходят детям вашего возраста." },
  { id: "art", title: "Для любителей искусства", duration: "day", tags: ["art", "ceramics"], paid: true, stops: ["kolledzh-gzhel", "gzhelskiy-farforovyi-zavod", "obedinenie-gzhel"], note: "Учебные мастерские, где растят художников, производство и организации с выездными и авторскими программами." },
  { id: "weekend", title: "Выходные: Гжель и Коломна", duration: "weekend", tags: ["ceramics", "history", "food"], paid: true, stops: ["gzhelskiy-farforovyi-zavod", "gzhelskaya-farforovaya-manufaktura", "mini-gostinitsa-akvarel", "kolomna-kreml", "kolomna-muzei-pastily", "patefonka"], note: "День в Гжели, ночёвка, затем Коломна: кремль, пастила и музеи. Время переезда закладывайте с запасом." },
];
export function suggest(interests: Interest[], duration: Duration, noPaid: boolean) {
  const pool = routes.filter((r) => !(noPaid && r.paid));
  return pool
    .map((r) => ({ r, s: (r.duration === duration ? 10 : 0) + r.tags.filter((t) => interests.includes(t)).length * 3 }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.r);
}
