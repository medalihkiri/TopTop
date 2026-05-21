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
      ar: "عطر زهري منعش وحلو يجعلك تشعرين بالأناقة.",
      fr: "Un parfum floral frais et doux qui vous fait sentir élégante.",
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
      ar: "عطر مرح ولذيذ برائحة التفاح الحلو والتوت.",
      fr: "Un parfum ludique et délicieux à l'odeur de pomme douce et de baies.",
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
      ar: "عطر دافئ وأنثوي برائحة الفانيليا والزهور الحلوة جداً.",
      fr: "Un parfum chaud et féminin avec une odeur de vanille et de fleurs très douces.",
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
      ar: "رائحة ناعمة تشبه حديقة زهور منعشة بعد سقوط المطر.",
      fr: "Une odeur douce qui ressemble à un jardin de fleurs frais après la pluie.",
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
      ar: "عطر قوي وجريء يمزج بين رائحة اللافندر والبرتقال الحلو.",
      fr: "Un parfum fort et audacieux qui mélange la lavande et l'orange douce.",
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
    id: "prada-paradoxe",
    name: { ar: "برادا بارادوكس", fr: "Prada Paradoxe" },
    category: "Women",
    description: {
      ar: "عطر زهري وحلو يمنحك شعوراً بالدفء والراحة.",
      fr: "Un parfum floral et doux qui vous donne une sensation de chaleur et de confort.",
    },
    notes: {
      ar: ["برغموت", "زهر البرتقال", "فانيليا"],
      fr: ["Bergamote", "Fleur d'Oranger", "Vanille"],
    },
    images: [
      "/images/prada_paradoxe_1.jpg",
      "/images/prada_paradoxe_2.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
    isPromo: true,
  },
  {
    id: "armani-my-way",
    name: { ar: "جورجيو أرماني ماي واي", fr: "Giorgio Armani My Way" },
    category: "Women",
    description: {
      ar: "عطر مشرق برائحة الزهور البيضاء الحلوة والمنعشة.",
      fr: "Un parfum lumineux à l'odeur de fleurs blanches douces et fraîches.",
    },
    notes: {
      ar: ["زهر البرتقال", "مسك الروم", "فانيليا"],
      fr: ["Fleur d'Oranger", "Tubéreuse", "Vanille"],
    },
    images: [
      "/images/armani_my_way_1.jpg",
      "/images/armani_my_way_2.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "mancera-coco-vanille",
    name: { ar: "مانسيرا كوكو فانيليا", fr: "Mancera Coco Vanille" },
    category: "Women",
    description: {
      ar: "رائحة صيفية لذيذة تشبه حلوى جوز الهند والفانيليا.",
      fr: "Une délicieuse odeur estivale qui ressemble à un dessert à la noix de coco et à la vanille.",
    },
    notes: {
      ar: ["جوز الهند", "خوخ", "فانيليا"],
      fr: ["Noix de Coco", "Pêche", "Vanille"],
    },
    images: [
      "/images/mancera_coco_vanille_1.jpg",
      "/images/mancera_coco_vanille_2.jpg",
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
      ar: "عطر رجالي نظيف ومنعش ذو طابع خشبي جميل.",
      fr: "Un parfum masculin propre et frais avec un beau caractère boisé.",
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
      ar: "عطر خفيف يعطيك إحساساً بالانتعاش مثل مياه البحر الباردة والليمون.",
      fr: "Un parfum léger qui vous donne une sensation de fraîcheur comme l'eau de mer froide et le citron.",
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
      ar: "عطر شتوي دافئ ومريح برائحة حلوة وحارة قليلاً.",
      fr: "Un parfum d'hiver chaud et réconfortant avec une odeur douce et légèrement épicée.",
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
      ar: "عطر رجالي راقي يجمع بين رائحة الأخشاب والتراب ولمسة من البرتقال.",
      fr: "Un parfum masculin raffiné qui combine l'odeur du bois, de la terre et une touche d'orange.",
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
      ar: "عطر ناعم وأنيق للاستخدام اليومي ذو رائحة جذابة.",
      fr: "Un parfum doux et élégant pour un usage quotidien avec une odeur attrayante.",
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
  {
    id: "armani-stronger-intensely",
    name: { ar: "سترونجر ويذ يو إنتنسلي", fr: "Stronger With You Intensely" },
    category: "Men",
    description: {
      ar: "عطر قوي جداً ودافئ برائحة الكراميل والفانيليا الحلوة.",
      fr: "Un parfum très fort et chaud à l'odeur de caramel et de vanille douce.",
    },
    notes: {
      ar: ["فلفل وردي", "كراميل", "فانيليا"],
      fr: ["Poivre Rose", "Caramel", "Vanille"],
    },
    images: [
      "/images/armani_stronger_intensely_1.jpg",
      "/images/armani_stronger_intensely_2.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "jpg-ultra-male",
    name: { ar: "جان بول غوتييه ألترا مال", fr: "JPG Ultra Male" },
    category: "Men",
    description: {
      ar: "عطر شبابي وجذاب جداً تفوح منه رائحة الكمثرى الحلوة، مثالي للسهرات.",
      fr: "Un parfum très jeune et attrayant qui sent la poire douce, parfait pour les soirées.",
    },
    notes: {
      ar: ["كمثرى", "قرفة", "فانيليا"],
      fr: ["Poire", "Cannelle", "Vanille"],
    },
    images: [
      "/images/jpg_ultra_male_1.jpg",
      "/images/jpg_ultra_male_2.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
    isPromo: true,
  },
  {
    id: "dior-sauvage",
    name: { ar: "ديور سوفاج", fr: "Dior Sauvage" },
    category: "Men",
    description: {
      ar: "عطر رجولي قوي يعطيك إحساساً بالنظافة الفائقة والانتعاش الحار.",
      fr: "Un parfum très masculin qui vous donne une sensation de propreté extrême et de fraîcheur épicée.",
    },
    notes: {
      ar: ["برغموت", "فلفل", "أمبروكسان"],
      fr: ["Bergamote", "Poivre", "Ambroxan"],
    },
    images: [
      "/images/dior_sauvage_1.jpg",
      "/images/dior_sauvage_2.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "lacoste-blanc",
    name: { ar: "لاكوست بلانك", fr: "Lacoste L.12.12 Blanc" },
    category: "Men",
    description: {
      ar: "رائحة رياضية خفيفة ومنعشة تذكرك بقميص أبيض نظيف.",
      fr: "Une odeur sportive légère et fraîche qui vous rappelle un t-shirt blanc propre.",
    },
    notes: {
      ar: ["جريب فروت", "إيلنغ", "خشب الأرز"],
      fr: ["Pamplemousse", "Ylang-Ylang", "Bois de Cèdre"],
    },
    images: [
      "/images/lacoste_blanc_1.jpg",
      "/images/lacoste_blanc_2.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
];
