// Партнёрские магазины. Название и размер скидки согласуйте с владельцем магазина.
export type Shop = { id: string; name: Record<string, string>; discount: number; validDays: number };

export const shops: Shop[] = [
  {
    id: "shop-uspenskaya",
    name: { ru: "Магазин гжели у храма", en: "Gzhel shop by the church", zh: "教堂旁的格热利陶瓷店" },
    discount: 10,
    validDays: 3,
  },
];
export const getShop = (id: string) => shops.find((s) => s.id === id);
