export interface ProductSize {
  size: string;
  price: number;
  oldPrice?: number;
}

export interface Product {
  id: string;
  name: { ar: string; fr: string };
  category: "Men" | "Women";
  description: { ar: string; fr: string };
  notes: { ar: string[]; fr: string[] };
  images: string[];
  sizes: ProductSize[];
  isPromo?: boolean;
}

export const products: Product[] = [
  {
    id: "gucci-bamboo",
    name: { ar: "غوتشي بامبو", fr: "Gucci Bamboo" },
    category: "Women",
    description: {
      ar: "عطر أنيق ورقيق يتميز بمكونات زهرية وخشبية.",
      fr: "Un parfum délicat et élégant aux notes florales et boisées.",
    },
    notes: {
      ar: ["برغموت", "زنبق الدار البيضاء", "خشب الصندل"],
      fr: ["Bergamote", "Lys de Casablanca", "Bois de Santal"],
    },
    images: ["/images/femme gucci bambo.jpg", "/images/femme gucci bambo.jpeg"],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
    isPromo: true,
  },
  {
    id: "kayali-eden-sweet",
    name: { ar: "كيالي إيدن سويت أبل", fr: "Kayali Eden Sweet Apple" },
    category: "Women",
    description: {
      ar: "عطر مرح ونابض بالحياة برائحة الفواكه والزهور الحلوة.",
      fr: "Un parfum fruité-floral ludique, vibrant et doux.",
    },
    notes: {
      ar: ["تفاح أحمر", "توت بري", "فانيليا"],
      fr: ["Pomme Rouge", "Baies Sauvages", "Vanille"],
    },
    images: [
      "/images/femme kayali eden sweet (1).webp",
      "/images/femme kayali eden sweet (2).webp",
      "/images/femme kayali eden sweet (3).webp",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "la-vie-est-belle",
    name: { ar: "لا في إي بيل", fr: "La Vie Est Belle" },
    category: "Women",
    description: {
      ar: "أنوثة مبهجة يتم التعبير عنها من خلال باقة أزهار حلوة أيقونية.",
      fr: "Une féminité joyeuse exprimée à travers un bouquet floral doux et iconique.",
    },
    notes: {
      ar: ["سوسن", "باتشولي", "فانيليا"],
      fr: ["Iris", "Patchouli", "Vanille"],
    },
    images: [
      "/images/femme la vie est belle (1).jpeg",
      "/images/femme la vie est belle (2).jpeg",
      "/images/femme la vie est belle (3).jpeg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
    isPromo: true,
  },
  {
    id: "my-burberry",
    name: { ar: "ماي بربري", fr: "My Burberry" },
    category: "Women",
    description: {
      ar: "عطر زهري بريطاني معاصر يعكس رائحة حديقة لندنية.",
      fr: "Un grand floral britannique contemporain capturant le parfum d'un jardin londonien.",
    },
    notes: {
      ar: ["بازلاء حلوة", "فريزيا", "ورد دمشقي"],
      fr: ["Pois de Senteur", "Freesia", "Rose de Damas"],
    },
    images: [
      "/images/femme my burberry (1).jpeg",
      "/images/femme my burberry (2).jpeg",
      "/images/femme my burberry (3).jpeg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "ysl-libre",
    name: { ar: "إيف سان لوران ليبر", fr: "YSL Libre" },
    category: "Women",
    description: {
      ar: "عطر الحرية، يجمع بين خلاصة اللافندر وزهر البرتقال.",
      fr: "Le parfum de la liberté, associant l'essence de lavande à la fleur d'oranger.",
    },
    notes: {
      ar: ["لافندر", "زهر البرتقال", "مسك"],
      fr: ["Lavande", "Fleur d'Oranger", "Musc"],
    },
    images: [
      "/images/femme ysl libre (1).webp",
      "/images/femme ysl libre (2).webp",
      "/images/femme ysl libre (3).webp",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "ysl-myself",
    name: { ar: "إيف سان لوران ماي سيلف", fr: "YSL MYSLF" },
    category: "Men",
    description: {
      ar: "عطر رجالي عصري يتميز بمسار زهري وخشبي فريد.",
      fr: "Un parfum masculin moderne avec un sillage boisé floral unique.",
    },
    notes: {
      ar: ["برغموت", "زهر البرتقال", "باتشولي"],
      fr: ["Bergamote", "Fleur d'Oranger", "Patchouli"],
    },
    images: [
      "/images/homme YSL myself (1).jpeg",
      "/images/homme YSL myself (2).jpeg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
    isPromo: true,
  },
  {
    id: "acqua-di-gio",
    name: { ar: "أكوا دي جيو", fr: "Acqua Di Giò" },
    category: "Men",
    description: {
      ar: "عطر مائي منعش أيقوني، يلتقط الجوهر النقي للبحر.",
      fr: "Un parfum aquatique frais emblématique, capturant l'essence pure de la mer.",
    },
    notes: {
      ar: ["نفحات بحرية", "برغموت", "خشب الأرز"],
      fr: ["Notes Marines", "Bergamote", "Bois de Cèdre"],
    },
    images: [
      "/images/homme acqua di gio.jpg",
      "/images/homme acqua di gio.jpeg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "stronger-with-you",
    name: { ar: "سترونجر ويذ يو", fr: "Stronger With You" },
    category: "Men",
    description: {
      ar: "عطر رجالي دافئ وحسي ذو جاذبية فريدة من نوعها.",
      fr: "Un parfum masculin chaud, sensuel et unique en son genre.",
    },
    notes: {
      ar: ["هيل", "مريمية", "فانيليا"],
      fr: ["Cardamome", "Sauge", "Vanille"],
    },
    images: [
      "/images/homme stronger with you (1).jpg",
      "/images/homme stronger with you (2).jpeg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "terre-dhermes",
    name: { ar: "تير ديرميس", fr: "Terre d'Hermès" },
    category: "Men",
    description: {
      ar: "سرد رمزي حول المواد الخام وتحولاتها.",
      fr: "Un récit symbolique autour de la matière première et de sa métamorphose.",
    },
    notes: {
      ar: ["جريب فروت", "فلفل", "نجيل الهند"],
      fr: ["Pamplemousse", "Poivre", "Vétiver"],
    },
    images: [
      "/images/homme terre d'hermes (1).jpg",
      "/images/homme terre d'hermes (2).jpeg",
      "/images/homme terre d'hermes (3).jpeg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "ysl-lhomme",
    name: { ar: "إيف سان لوران لوم", fr: "YSL L'Homme" },
    category: "Men",
    description: {
      ar: "قوة جاذبية الرجل ذو الأسلوب الفريد والكاريزما.",
      fr: "La force d'attraction d'un homme au style unique et charismatique.",
    },
    notes: {
      ar: ["زنجبيل", "ريحان", "خشب الأرز"],
      fr: ["Gingembre", "Basilic", "Bois de Cèdre"],
    },
    images: [
      "/images/homme ysl l'homme (1).jpg",
      "/images/homme ysl l'homme (2).jpg",
      "/images/homme ysl l'homme (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
    isPromo: true,
  },
];
