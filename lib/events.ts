// Добавляйте сюда только подтверждённые события. Прошедшие автоматически исчезают из афиши.
export type Ev = { id: string; title: string; type: "Мастер-класс" | "Выставка" | "Экскурсия" | "Фестиваль" | "Ярмарка"; date: string; end?: string; place: string; desc: string; price?: string; signup?: string; source: string; verifiedAt: string };
export const events: Ev[] = [];
export const upcoming = (now = new Date()) => events.filter((e) => new Date(e.end || e.date).getTime() >= new Date(now.toDateString()).getTime()).sort((a, b) => a.date.localeCompare(b.date));
