export type L = Record<"ru" | "en" | "zh", string>;
export const langs = ["ru", "en", "zh"] as const;
export type Lang = (typeof langs)[number];
export const langName: Record<Lang, string> = { ru: "Русский", en: "English", zh: "中文" };
export const pick = (o: L, lang: Lang) => o[lang];
export const asLang = (v?: string): Lang => (langs as readonly string[]).includes(v || "") ? (v as Lang) : "ru";

export const ui: Record<string, L> = {
  guide: { ru: "Гид по остановке", en: "Stop guide", zh: "站点导览" },
  route: { ru: "Построить маршрут", en: "Get directions", zh: "导航前往" },
  couponTitle: { ru: "Скидка в магазине рядом", en: "Discount at the shop next door", zh: "附近商店优惠券" },
  couponText: { ru: "Получите купон, покажите его на кассе: продавец отсканирует QR или введёт код.", en: "Get a coupon and show it at the till. The seller scans the QR code or types the code.", zh: "领取优惠券，结账时出示。店员会扫描二维码或输入代码。" },
  getCoupon: { ru: "Получить купон", en: "Get coupon", zh: "领取优惠券" },
  yourCode: { ru: "Ваш код", en: "Your code", zh: "您的代码" },
  validUntil: { ru: "Действует до", en: "Valid until", zh: "有效期至" },
  discount: { ru: "Скидка", en: "Discount", zh: "折扣" },
  error: { ru: "Не получилось. Попробуйте позже.", en: "Something went wrong. Try again later.", zh: "出错了，请稍后再试。" },
  around: { ru: "Рядом", en: "Nearby", zh: "附近" },
  eat: { ru: "Где поесть", en: "Where to eat", zh: "吃饭" },
  stay: { ru: "Где остановиться", en: "Where to stay", zh: "住宿" },
  buy: { ru: "Где купить гжель", en: "Where to buy Gzhel", zh: "购买格热利陶瓷" },
  allStops: { ru: "Все остановки", en: "All stops", zh: "所有站点" },
};

export type Stop = {
  id: string; shopId: string; query: string;
  name: L; tagline: L; sections: { h: L; p: L }[];
};

export const stops: Stop[] = [
  {
    id: "uspenskaya-tserkov", shopId: "shop-uspenskaya", query: "Успенская церковь Гжель",
    name: { ru: "Церковь Успения в Гжели", en: "Church of the Assumption in Gzhel", zh: "格热利村圣母安息教堂" },
    tagline: {
      ru: "Старый храм, который пережил пожар и сейчас стоит на реставрации. Рядом магазин гжели.",
      en: "An old church that survived a fire and is now being restored. A Gzhel shop is next door.",
      zh: "这座古老的教堂曾经历火灾，如今正在修复。旁边就是格热利陶瓷店。",
    },
    sections: [
      {
        h: { ru: "История храма", en: "History of the church", zh: "教堂的历史" },
        p: {
          ru: "Первое упоминание об Успенской церкви в селе Гжель относится к 1631–1633 годам. В 1701 году на месте деревянной церкви построили каменную. В 1736 году храм сгорел, а в 1737 году вышел указ о его восстановлении. Ныне существующее здание возведено в 1859 году по проекту архитектора К. В. Гриневского.",
          en: "The first mention of the Assumption church in Gzhel dates to 1631–1633. In 1701 a stone church replaced the wooden one. It burned down in 1736 and a decree to rebuild it followed in 1737. The present building dates to 1859 and was designed by architect K. V. Grinevsky.",
          zh: "格热利村圣母安息教堂最早的记载出现在1631至1633年。1701年，石头教堂取代了原来的木制教堂。1736年教堂毁于大火，1737年下令重建。现存建筑建于1859年，由建筑师K·V·格里涅夫斯基设计。",
        },
      },
      {
        h: { ru: "Центр округи", en: "A hub for the area", zh: "周边村庄的中心" },
        p: {
          ru: "В первой половине XIX века церковь была центром небольшого благочиния. У неё было два прихода, в них входили Гжель, Обухово, Коширово, Григорово, Минино, Коняшино, Трошково, Фенино, Глебово. Это показывает, насколько большим был гжельский куст ещё до фарфора.",
          en: "In the first half of the 19th century the church was the centre of a small church district with two parishes. They covered Gzhel, Obukhovo, Koshirovo, Grigorovo, Minino, Konyashino, Troshkovo, Fenino and Glebovo. It shows how large the Gzhel cluster already was.",
          zh: "19世纪上半叶，这座教堂是一个小教区联合体的中心，下设两个教区，涵盖格热利、奥布霍沃、科希罗沃、格里戈罗沃等多个村庄。可见在瓷器出名之前，格热利一带已经相当繁荣。",
        },
      },
      {
        h: { ru: "Сейчас", en: "Today", zh: "现在" },
        p: {
          ru: "Храм сейчас на реставрации, вокруг могут стоять леса. Осматривайте снаружи и следуйте указателям на месте.",
          en: "The church is currently under restoration and scaffolding may be up. Look from the outside and follow the signs on site.",
          zh: "教堂目前正在修复，周围可能搭有脚手架。请从外部参观，并遵守现场指示。",
        },
      },
      {
        h: { ru: "Деталь, которую знают местные", en: "A detail locals know", zh: "当地人才知道的细节" },
        p: {
          ru: "Сюда едут «во Гжель», а не «в Гжель». Так говорят местные, и это сразу выдаёт знающего человека.",
          en: "In Russian you go “во Гжель”, not “в Гжель”. That is how locals say it, and it instantly marks you as someone in the know.",
          zh: "去格热利，俄语要说“во Гжель”，而不是“в Гжель”。这是当地人的说法，一说就显得很内行。",
        },
      },
      {
        h: { ru: "Как выбрать настоящую гжель", en: "How to spot real Gzhel", zh: "如何挑选真正的格热利", },
        p: {
          ru: "Перед обжигом кобальтовая краска почти чёрная и становится синей только в печи. У ручной работы мазки чуть отличаются, а у художника часто стоит подпись или клеймо мастерской. Печатный рисунок выглядит ровным и плоским.",
          en: "Before firing, the cobalt paint looks almost black and only turns blue in the kiln. Hand-painted pieces have slightly varied strokes and often carry the artist’s signature or a workshop mark. Printed designs look even and flat.",
          zh: "烧制前，钴料看起来接近黑色，入窑烧制后才变成蓝色。手绘作品的笔触会略有不同，常有画师签名或作坊印记；印刷图案则显得平整、呆板。",
        },
      },
    ],
  },
];
export const getStop = (id: string) => stops.find((s) => s.id === id);
