export interface ProductSize {
  size: string;
  price: number;
  oldPrice?: number;
}

export interface Product {
  id: string;
  name: { ar: string; fr: string };
  category: "Men" | "Women" | "Unisex";
  description: { ar: string; fr: string };
  keywords?: { ar: string[]; fr: string[] };
  notes: { ar: string[]; fr: string[] };
  images: string[];
  sizes: ProductSize[];
  isPromo?: boolean;
}

export const products: Product[] = [
  {
    id: "gucci-bamboo",
    keywords: { ar: ["منعش","زهري","حمضيات","يومي","ناعم","عمل","ربيعي","أنيق","زنبق","برغموت"], fr: ["frais","floral","agrumes","quotidien","doux","bureau","printemps","élégant","lys","bergamote"] },
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
    keywords: { ar: ["تفاح","فراولة","فاكهي","حلو","شبابي","غورماند","لذيذ","ربيعي","عصير"], fr: ["pomme","fraise","fruité","sucré","gourmand","jeune","printemps","pomme rouge","délicieux","jus"] },
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
    keywords: { ar: ["حلو","زهر البرتقال","فانيليا","أنيق","سهرات","برالين","باتشولي","كلاسيكي","ثابت","أعراس","حفلات"], fr: ["sucré","fleur d'oranger","vanille","élégant","soirée","praline","patchouli","classique","longue tenue","mariage","fête"] },
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
    keywords: { ar: ["زهري","منعش","أنيق","ورد","يومي","مطر","لندن","عمل","شيك","ناعم"], fr: ["floral","frais","élégant","rose","quotidien","pluie","londres","pois de senteur","bureau","chic"] },
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
    keywords: { ar: ["فانيليا","خزامى","قوي","جريء","شتوي","ثابت","مستقل","سهرات","أنيق","مدير"], fr: ["vanille","lavande","fort","audacieux","hiver","longue tenue","indépendant","boss","soirée","élégant"] },
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
      "/images/ysl libre femme.jpg",
      "/images/ysl libre femme1.jpg",
      "/images/ysl libre femme2.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "prada-paradoxe",
    keywords: { ar: ["حلو","زهر البرتقال","فانيليا","عصري","قوي","ثابت","عنبر","ياسمين","شبابي","سهرات"], fr: ["sucré","fleur d'oranger","vanille","moderne","fort","longue tenue","ambre","jasmin","jeune","soirée"] },
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
      "/images/prada paradox (1).jpg",
      "/images/prada paradox (2).jpg",
      "/images/prada paradox (3).jpg",
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
    keywords: { ar: ["زهر البرتقال","مسك الروم","زهري","حلو","سفر","مشرق","ربيعي","مفرح","ياسمين"], fr: ["fleur d'oranger","tubéreuse","floral","sucré","voyage","lumineux","printemps","joyeux","jasmin"] },
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
    keywords: { ar: ["فانيليا","جوز الهند","صيفي","بحر","حلو","عطلة","شمس","غورماند","استوائي"], fr: ["vanille","coco","noix de coco","plage","été","sucré","vacances","solaire","gourmand","tropical"] },
    name: { ar: "مانسيرا كوكو فانيليا", fr: "Mancera Coco Vanille" },
    category: "Unisex",
    description: {
      ar: "رائحة صيفية لذيذة تشبه حلوى جوز الهند والفانيليا.",
      fr: "Une délicieuse odeur estivale qui ressemble à un dessert à la noix de coco et à la vanille.",
    },
    notes: {
      ar: ["جوز الهند", "خوخ", "فانيليا"],
      fr: ["Noix de Coco", "Pêche", "Vanille"],
    },
    images: [
      "/images/coco vanbille femme (1).jpg",
      "/images/coco vanbille femme (2).jpg",
      "/images/cocovanille femm 1.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "ysl-myself",
    keywords: { ar: ["منعش","زهر البرتقال","خشب","نظيف","عصري","يومي","عمل","متعدد الاستخدامات","ناعم","برغموت"], fr: ["frais","fleur d'oranger","bois","propre","moderne","quotidien","bureau","polyvalent","doux","bergamote"] },
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
    keywords: { ar: ["منعش","بحري","مائي","بحر","صيفي","رياضي","كلاسيكي","حمضيات","عمل","نادي","كاجوال"], fr: ["frais","marin","aquatique","mer","été","sport","classique","agrumes","bureau","gym","décontracté"] },
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
    keywords: { ar: ["حلو","دافئ","توابل","شتوي","سهرات","فانيليا","كستناء","ثابت","موعد","جذاب"], fr: ["sucré","chaud","épicé","hiver","nuit","vanille","châtaigne","longue tenue","rendez-vous","séduisant"] },
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
    keywords: { ar: ["خشبي","ترابي","حمضيات","برتقال","كلاسيكي","ناضج","نجيل الهند","عمل","فلفل","أنيق","قوي"], fr: ["boisé","terre","agrumes","orange","classique","mature","vétiver","bureau","poivre","élégant","fort"] },
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
    keywords: { ar: ["منعش","زنجبيل","توابل","ناعم","يومي","عمل","أنيق","خفيف","كلاسيكي","ربيعي"], fr: ["frais","gingembre","épicé","doux","quotidien","bureau","élégant","subtil","classique","printemps"] },
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
    keywords: { ar: ["حلو","كراميل","فانيليا","قوي","شتوي","سهرات","توفي","ثابت","غورماند","جذاب","نادي"], fr: ["sucré","caramel","vanille","fort","hiver","nuit","toffee","longue tenue","gourmand","séduisant","club"] },
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
    keywords: { ar: ["حلو","كمثرى","فانيليا","حفلات","قوي","سهرات","ثابت","جذاب","شبابي","صاخب"], fr: ["sucré","poire","vanille","boîte de nuit","fête","fort","longue tenue","séduisant","jeune","bruyant"] },
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
    keywords: { ar: ["منعش","فلفل","قوي","يومي","ذكوري","جذاب","ثابت","متعدد الاستخدامات","برغموت","حفلات","مشهور"], fr: ["frais","poivre","ambroxan","fort","quotidien","masculin","longue tenue","polyvalent","bergamote","club","populaire"] },
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
    keywords: { ar: ["منعش","رياضي","نظيف","أبيض","صيفي","يومي","نادي","حمضيات","كاجوال","شبابي"], fr: ["frais","sport","propre","blanc","été","quotidien","gym","agrumes","décontracté","jeune"] },
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

  // ─── WOMEN ───────────────────────────────────────────────────────────────────

  {
    id: "good-girl-blanche",
    keywords: { ar: ["زهري","ناعم","أنيق","أبيض","نظيف","أعراس","مسك الروم","مشرق","يومي","شيك"], fr: ["floral","doux","élégant","blanc","propre","mariage","tubéreuse","lumineux","journée","chic"] },
    name: { ar: "غود غيرل بلانش", fr: "Good Girl Blanche" },
    category: "Women",
    description: {
      ar: "عطر أنثوي ناعم وخفيف برائحة الزهور البيضاء والمسك النظيف.",
      fr: "Un parfum féminin doux et léger avec une odeur de fleurs blanches et de musc propre.",
    },
    notes: {
      ar: ["ياسمين أبيض", "مسك الروم", "فول التونكا"],
      fr: ["Jasmin Blanc", "Tubéreuse", "Fève Tonka"],
    },
    images: [
      "/images/Good girl blanche (1).jpg",
      "/images/Good girl blanche (2).jpg",
      "/images/cf2f2b7fe8888ed63cd6317b470bc35d.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "gucci-bloom",
    keywords: { ar: ["زهري","ياسمين","مسك الروم","أبيض","حديقة","ناعم","ربيعي","طبيعي","أنثوي","كلاسيكي"], fr: ["floral","jasmin","tubéreuse","blanc","jardin","doux","printemps","naturel","féminin","vintage"] },
    name: { ar: "غوتشي بلوم", fr: "Gucci Bloom" },
    category: "Women",
    description: {
      ar: "باقة من الزهور البيضاء الجميلة برائحة طبيعية تشبه حديقة مزهرة في الربيع.",
      fr: "Un bouquet de belles fleurs blanches avec une odeur naturelle rappelant un jardin fleuri au printemps.",
    },
    notes: {
      ar: ["ياسمين", "مسك الروم", "زهر العسل"],
      fr: ["Jasmin", "Tubéreuse", "Chèvrefeuille"],
    },
    images: [
      "/images/Gucci bloom (1).jpg",
      "/images/Gucci bloom (2).jpg",
      "/images/Gucci bloom (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "gucci-oud",
    keywords: { ar: ["عود","قوي","شرقي","جلد","سهرات","شتوي","فخم","توابل","زعفران","للجنسين","أعراس"], fr: ["oud","fort","oriental","cuir","nuit","hiver","luxe","épicé","safran","unisexe","mariage"] },
    name: { ar: "غوتشي عود", fr: "Gucci Oud" },
    category: "Unisex",
    description: {
      ar: "عطر شرقي فاخر يجمع بين رائحة التوت الحلو والورد وخشب العود الدافئ.",
      fr: "Un parfum oriental luxueux qui mêle la framboise sucrée, la rose et le bois de oud chaud.",
    },
    notes: {
      ar: ["توت العليق", "ورد", "عود"],
      fr: ["Framboise", "Rose", "Oud"],
    },
    images: [
      "/images/Gucci oud (2).jpg",
      "/images/Gucci oud (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "lancome-idole",
    keywords: { ar: ["ورد","منعش","مسك","نظيف","يومي","كمثرى","عصري","عمل","زهري","مشرق"], fr: ["rose","frais","musc","propre","quotidien","poire","moderne","bureau","floral","lumineux"] },
    name: { ar: "لانكوم إيدول إكسترا", fr: "Lancôme Idôle" },
    category: "Women",
    description: {
      ar: "عطر زهري ناعم يمنحك إحساساً بالنقاء والأناقة طوال اليوم.",
      fr: "Un parfum floral doux qui vous donne une sensation de pureté et d'élégance toute la journée.",
    },
    notes: {
      ar: ["كمثرى", "ورد جوري", "مسك أبيض"],
      fr: ["Poire", "Rose", "Musc Blanc"],
    },
    images: [
      "/images/Idole extra (1).jpg",
      "/images/Idole extra (2).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "kayali-vanilla-28",
    keywords: { ar: ["فانيليا","سكر","دافئ","غورماند","شتوي","حلو","سكر بني","ناعم","مريح","موعد"], fr: ["vanille","sucre","chaud","gourmand","hiver","layering","cassonade","doux","réconfortant","rendez-vous"] },
    name: { ar: "كيالي فانيليا 28", fr: "Kayali Vanilla 28" },
    category: "Women",
    description: {
      ar: "عطر دافئ ولذيذ مثل قطعة حلوى، تفوح منه رائحة الفانيليا الحلوة الكريمية.",
      fr: "Un parfum chaud et gourmand comme une confiserie, avec l'odeur de vanille douce et crémeuse.",
    },
    notes: {
      ar: ["فانيليا", "سكر بني", "خشب الصندل"],
      fr: ["Vanille", "Cassonade", "Bois de Santal"],
    },
    images: [
      "/images/Kayali vanilla (1).jpg",
      "/images/Kayali vanilla (2).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "linterdit-rouge",
    keywords: { ar: ["توابل","مسك الروم","قوي","دافئ","سهرات","شتوي","برتقال أحمر","جذاب","ثابت","جريء"], fr: ["épicé","tubéreuse","fort","chaud","soirée","hiver","orange sanguine","séduisant","longue tenue","audacieux"] },
    name: { ar: "لانتيردي روج", fr: "Givenchy L'Interdit Rouge" },
    category: "Women",
    description: {
      ar: "عطر زهري جريء وساحر، يجمع بين الزهور البيضاء ولمسة حارة مثيرة.",
      fr: "Un parfum floral audacieux et envoûtant, alliant des fleurs blanches à une touche épicée et sensuelle.",
    },
    notes: {
      ar: ["زهر البرتقال", "مسك الروم", "باتشولي"],
      fr: ["Fleur d'Oranger", "Tubéreuse", "Patchouli"],
    },
    images: [
      "/images/L'interdit rouge (1).jpg",
      "/images/L'interdit rouge (2).jpg",
      "/images/L'interdit rouge (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "la-bomba",
    keywords: { ar: ["زهري","حلو","فراولة","فاكهي","سهرات","غورماند","حفلات","ثابت","شبابي"], fr: ["floral","sucré","fraise","fruit","nuit","gourmand","fête","longue tenue","jeune"] },
    name: { ar: "لا بومبا", fr: "Carolina Herrera La Bomba" },
    category: "Women",
    description: {
      ar: "عطر فاكهي زهري منعش ومبهج تفوح منه رائحة الفواكه الحلوة والزهور الطازجة.",
      fr: "Un parfum fruité floral frais et joyeux avec l'odeur de fruits sucrés et de fleurs fraîches.",
    },
    notes: {
      ar: ["بطيخ", "زهرة الساعة", "مسك"],
      fr: ["Pastèque", "Passiflore", "Musc"],
    },
    images: [
      "/images/La bomba (1).jpg",
      "/images/La bomba (2).jpg",
      "/images/La bomba (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "la-nuit-tresor-fleur",
    keywords: { ar: ["قهوة","ورد","سهرات","قوي","حلو","ماكياتو","شتوي","حفلات","مثير"], fr: ["café","rose","nuit","fort","sucré","macchiato","hiver","soirée","sensuel"] },
    name: { ar: "لا نوي تريزور فلور دي نوي", fr: "La Nuit Trésor Fleur de Nuit" },
    category: "Women",
    description: {
      ar: "عطر ليلي رومانسي ودافئ يمزج بين رائحة الورد والقهوة الحلوة الناعمة.",
      fr: "Un parfum de nuit romantique et chaud qui mêle l'odeur de rose et de café doux et crémeux.",
    },
    notes: {
      ar: ["ورد دمشقي", "مسك الروم", "قهوة ماكياتو"],
      fr: ["Rose de Damas", "Tubéreuse", "Café Macchiato"],
    },
    images: [
      "/images/La nuit tresor fleur de nuit.jpg",
      "/images/La nuit tresor fleur de nuit1.png",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "narciso-amber",
    keywords: { ar: ["عنبر","مسك","دافئ","شمس","صيفي","غريب","بحر","زهري","ناعم","استوائي"], fr: ["ambre","musc","chaud","soleil","été","exotique","plage","floral","doux","tropical"] },
    name: { ar: "نارسيسو أمبريه", fr: "Narciso Rodriguez Ambree" },
    category: "Women",
    description: {
      ar: "عطر أنثوي دافئ وناعم جداً، برائحة المسك والعنبر الحلو الذي يبقى طويلاً على جلدك.",
      fr: "Un parfum féminin très doux et chaud, avec l'odeur du musc et de l'ambre sucré qui reste longtemps sur votre peau.",
    },
    notes: {
      ar: ["زهر الفرانجيباني", "مسك", "عنبر"],
      fr: ["Frangipanier", "Musc", "Ambre"],
    },
    images: [
      "/images/Narciso amber (1).jpg",
      "/images/Narciso amber (2).jpg",
      "/images/Narciso amber (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "narciso-poudree",
    keywords: { ar: ["بودر","مسك","ناعم","مكياج","نظيف","أنيق","عمل","شتوي","مريح","كلاسيكي"], fr: ["poudré","musc","doux","maquillage","propre","élégant","bureau","hiver","réconfortant","classique"] },
    name: { ar: "نارسيسو بودريه", fr: "Narciso Rodriguez Poudrée" },
    category: "Women",
    description: {
      ar: "عطر ناعم كالبودرة، أنيق جداً برائحة الورد والمسك الخفيف الذي يشعرك بالنظافة.",
      fr: "Un parfum doux comme de la poudre, très élégant avec l'odeur de rose et de musc léger qui donne une sensation de propreté.",
    },
    notes: {
      ar: ["ورد جوري", "سوسن", "مسك"],
      fr: ["Rose", "Iris", "Musc"],
    },
    images: [
      "/images/Narciso poudree (1).jpg",
      "/images/Narciso poudree (2).jpg",
      "/images/Narciso poudree (3).jpg",
      "/images/Narciso poudree (4).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "tom-ford-black-orchid",
    keywords: { ar: ["شوكولاتة","كمأة","غامض","سهرات","قوي","فخم","شتوي","للجنسين","توابل","ثابت","غامض"], fr: ["chocolat","truffe","sombre","nuit","fort","luxe","hiver","unisexe","épicé","longue tenue","mystérieux"] },
    name: { ar: "توم فورد بلاك أوركيد", fr: "Tom Ford Black Orchid" },
    category: "Unisex",
    description: {
      ar: "عطر غامض وفاخر جداً برائحة الأوركيد الداكن والشوكولاتة، مثالي للسهرات.",
      fr: "Un parfum très mystérieux et luxueux avec l'odeur d'orchidée sombre et de chocolat, parfait pour les soirées.",
    },
    notes: {
      ar: ["برقوق أسود", "شوكولاتة", "باتشولي"],
      fr: ["Prune Noire", "Chocolat", "Patchouli"],
    },
    images: [
      "/images/Tom ford black orchid (1).jpg",
      "/images/Tom ford black orchid (2).jpg",
      "/images/Tom ford black orchid (3).jpg",
      "/images/61379574cb5f4bb408941ad8792a83a8.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "vert-malachite",
    keywords: { ar: ["زهري","أبيض","أخضر","فخم","منعش","ياسمين","زنبق","للجنسين","ربيعي","أنيق","أعراس"], fr: ["floral","blanc","vert","luxe","frais","jasmin","lys","unisexe","printemps","élégant","mariage"] },
    name: { ar: "فير مالاكيت", fr: "Armani Privé Vert Malachite" },
    category: "Unisex",
    description: {
      ar: "عطر راقي ومنعش يحمل رائحة الأعشاب الخضراء الطازجة مع لمسة زهرية أنيقة.",
      fr: "Un parfum raffiné et frais qui porte l'odeur d'herbes vertes fraîches avec une touche florale élégante.",
    },
    notes: {
      ar: ["بازلاء خضراء", "سرخس", "مسك أبيض"],
      fr: ["Pois Vert", "Fougère", "Musc Blanc"],
    },
    images: [
      "/images/Vert malachitte (1).jpg",
      "/images/Vert malachitte (2).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "rouge-malachite",
    keywords: { ar: ["مسك الروم","دافئ","فخم","عنبر","قوي","توابل","سهرات","شتوي","للجنسين","ثابت","شرقي"], fr: ["tubéreuse","chaud","luxe","ambre","fort","épicé","soirée","hiver","unisexe","longue tenue","oriental"] },
    name: { ar: "روج مالاكيت", fr: "Armani Privé Rouge Malachite" },
    category: "Unisex",
    description: {
      ar: "عطر شرقي فاخر يجمع بين المسك الروم الحار والتوابل الدافئة، يدوم طويلاً ويجذب الانتباه.",
      fr: "Un parfum oriental luxueux alliant la tubéreuse chaude et les épices douces, longue durée et très remarqué.",
    },
    notes: {
      ar: ["مسك الروم", "زعفران", "كهرمان"],
      fr: ["Tubéreuse", "Safran", "Ambre"],
    },
    images: [
      "/images/rouge malachitte (1).jpg",
      "/images/rouge malachitte (2).jpg",
      "/images/rouge malachitte (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "burberry-her",
    keywords: { ar: ["فراولة","فواكه حمراء","حلو","شبابي","ربيعي","غورماند","ناعم","يومي","مفرح","توت"], fr: ["fraise","fruits rouges","sucré","jeune","printemps","gourmand","doux","quotidien","joyeux","baies"] },
    name: { ar: "بربري هير", fr: "Burberry Her" },
    category: "Women",
    description: {
      ar: "عطر فاكهي شبابي ومبهج، تفوح منه رائحة التوت الأحمر الحلو والليمون المنعش.",
      fr: "Un parfum fruité, jeune et joyeux, avec l'odeur de baies rouges sucrées et de citron frais.",
    },
    notes: {
      ar: ["توت أحمر", "كرز", "مسك"],
      fr: ["Baies Rouges", "Cerise", "Musc"],
    },
    images: [
      "/images/burberry her extra (1).jpg",
      "/images/burberry her extra (2).jpg",
      "/images/burberry her extra (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "dior-jadore",
    keywords: { ar: ["زهري","ياسمين","منعش","كلاسيكي","أنثوي","ذهب","فخم","أعراس","ربيعي","أنيق","صابون","نظيف"], fr: ["floral","jasmin","frais","classique","femme","or","luxe","mariage","printemps","élégant","savon","propre"] },
    name: { ar: "ديور جادور", fr: "Dior J'Adore" },
    category: "Women",
    description: {
      ar: "عطر زهري كلاسيكي أنيق، من أشهر العطور النسائية في العالم، يشعرك بالفخامة والأنوثة.",
      fr: "Un parfum floral classique et élégant, l'un des parfums féminins les plus célèbres au monde, avec une sensation de luxe et de féminité.",
    },
    notes: {
      ar: ["يلانغ يلانغ", "ورد دمشقي", "ياسمين"],
      fr: ["Ylang-Ylang", "Rose de Damas", "Jasmin"],
    },
    images: [
      "/images/dior j'ador.jpg",
      "/images/dior j'ador1.jpg",
      "/images/dior j'ador2.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "miss-dior",
    keywords: { ar: ["ورد","باتشولي","رومانسي","ربيعي","ناعم","زهري","حب","موعد","شيك","شبابي"], fr: ["rose","patchouli","romantique","printemps","doux","floral","amour","rendez-vous","chic","jeune"] },
    name: { ar: "ميس ديور", fr: "Miss Dior" },
    category: "Women",
    description: {
      ar: "عطر زهري رومانسي يجمع بين الورد الطازج والمسك الناعم، رائحة نظيفة وأنيقة تناسب كل الأوقات.",
      fr: "Un parfum floral romantique alliant la rose fraîche et le musc doux, une odeur propre et élégante pour toutes les occasions.",
    },
    notes: {
      ar: ["ورد جوري", "زنبق الوادي", "مسك أبيض"],
      fr: ["Rose", "Muguet", "Musc Blanc"],
    },
    images: [
      "/images/miss dior (1).jpg",
      "/images/miss dior (2).jpg",
      "/images/miss dior (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "escada-miami",
    keywords: { ar: ["أناناس","فراولة","بحر","صيفي","كوكتيل","فاكهي","عطلة","حلو","شبابي","شمس","استوائي"], fr: ["ananas","fraise","plage","été","cocktail","fruité","vacances","sucré","jeune","soleil","tropical"] },
    name: { ar: "إسكادا ميامي بلوسوم", fr: "Escada Miami Blossom" },
    category: "Women",
    description: {
      ar: "عطر صيفي مرح ومنعش، تفوح منه رائحة الأناناس والفاكهة الاستوائية الحلوة.",
      fr: "Un parfum estival joyeux et frais, avec l'odeur d'ananas et de fruits tropicaux sucrés.",
    },
    notes: {
      ar: ["أناناس", "بطيخ", "ياسمين"],
      fr: ["Ananas", "Pastèque", "Jasmin"],
    },
    images: [
      "/images/Escada miami (1).jpg",
      "/images/Escada miami (2).jpg",
      "/images/Escada miami (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "ysl-libre-intense",
    keywords: { ar: ["فانيليا","خزامى","قوي","دافئ","شتوي","سهرات","ثابت","جريء","تونكا","عسل"], fr: ["vanille","lavande","fort","chaud","hiver","soirée","longue tenue","audacieux","fève tonka","miel"] },
    name: { ar: "إيف سان لوران ليبر لو بارفيوم", fr: "YSL Libre Le Parfum" },
    category: "Women",
    description: {
      ar: "نسخة أقوى وأكثر دفئاً من ليبر، برائحة اللافندر والفانيليا الكثيفة الجميلة، تدوم طوال اليوم.",
      fr: "Une version plus intense et chaude de Libre, avec l'odeur de lavande et de vanille chaude et enveloppante, toute la journée.",
    },
    notes: {
      ar: ["لافندر", "زهر البرتقال", "فانيليا مدغشقر"],
      fr: ["Lavande", "Fleur d'Oranger", "Vanille de Madagascar"],
    },
    images: [
      "/images/ysl libre intense femme.jpg",
      "/images/ysl libre intns femme.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },

  // ─── MEN ─────────────────────────────────────────────────────────────────────

  {
    id: "212-vip-men",
    keywords: { ar: ["حفلات","سهرات","فودكا","فاكهة الحب","ليلي","شبابي","حلو","نادي","نعناع","توابل"], fr: ["fête","boîte de nuit","vodka","fruit de la passion","nuit","jeune","sucré","club","menthe","épicé"] },
    name: { ar: "212 في آي بي للرجال", fr: "212 VIP Men" },
    category: "Men",
    description: {
      ar: "عطر رجالي منعش وحيوي برائحة الحمضيات والخشب، مثالي للاستخدام اليومي.",
      fr: "Un parfum masculin frais et dynamique avec l'odeur d'agrumes et de bois, parfait pour une utilisation quotidienne.",
    },
    notes: {
      ar: ["برغموت", "زعتر", "خشب الصندل"],
      fr: ["Bergamote", "Thym", "Bois de Santal"],
    },
    images: [
      "/images/212 vip (1).jpg",
      "/images/212 vip (1).png",
      "/images/212 vip (2).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "armani-code",
    keywords: { ar: ["جلد","تونكا","أنيق","سهرات","كلاسيكي","شتوي","ليلي","بدلة","عمل","غامض","يانسون"], fr: ["cuir","tonka","élégant","nuit","classique","hiver","soirée","costume","bureau","mystérieux","anis"] },
    name: { ar: "أرماني كود", fr: "Armani Code" },
    category: "Men",
    description: {
      ar: "عطر رجالي غامض وأنيق يجمع بين الحمضيات والأخشاب، يشعرك بالثقة والجاذبية.",
      fr: "Un parfum masculin mystérieux et élégant alliant agrumes et bois, qui vous donne confiance et charme.",
    },
    notes: {
      ar: ["برغموت", "يانسون", "خشب الغاياك"],
      fr: ["Bergamote", "Anis Étoilé", "Bois de Gaïac"],
    },
    images: [
      "/images/Armani code (1).jpg",
      "/images/Armani code (2).jpg",
      "/images/Armani code (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "azzaro-the-most-wanted",
    keywords: { ar: ["توفي","كراميل","قوي","سهرات","شتوي","حلو","غورماند","ثابت","حفلات","جذاب"], fr: ["toffee","caramel","fort","nuit","hiver","sucré","gourmand","longue tenue","boîte de nuit","séduisant"] },
    name: { ar: "أزارو ذا موست وانتد", fr: "Azzaro The Most Wanted" },
    category: "Men",
    description: {
      ar: "عطر رجالي قوي ودافئ برائحة الهيل والتوفي الحلو، مثالي للسهرات الشتوية.",
      fr: "Un parfum masculin puissant et chaud avec l'odeur de cardamome et de toffee sucré, parfait pour les soirées d'hiver.",
    },
    notes: {
      ar: ["هيل", "توفي", "خشب العنبر"],
      fr: ["Cardamome", "Toffee", "Bois d'Ambre"],
    },
    images: [
      "/images/Azzaor the most wanted (1).jpg",
      "/images/Azzaor the most wanted (2).jpg",
      "/images/Azzaor the most wanted (3).jpg",
      "/images/296d024623227f9df23b8ca783645c14.jpg",
      "/images/b7018b760935efd0824743615bd2deaa.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "azzaro-wanted",
    keywords: { ar: ["ليمون","منعش","توابل","ربيعي","يومي","صيفي","رياضي","شبابي","زنجبيل","تفاح"], fr: ["citron","frais","épicé","printemps","quotidien","été","sport","jeune","gingembre","pomme"] },
    name: { ar: "أزارو وانتد", fr: "Azzaro Wanted" },
    category: "Men",
    description: {
      ar: "عطر رجالي منعش وجذاب يجمع بين الليمون الحار والهيل، يناسب الاستخدام اليومي والمناسبات.",
      fr: "Un parfum masculin frais et attrayant alliant citron épicé et cardamome, idéal pour tous les jours et les occasions.",
    },
    notes: {
      ar: ["ليمون حار", "هيل", "نجيل الهند"],
      fr: ["Citron Épicé", "Cardamome", "Vétiver"],
    },
    images: [
      "/images/Azzaro wanted extra (1).jpg",
      "/images/Azzaro wanted extra (2).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "bleu-de-chanel",
    keywords: { ar: ["منعش","خشبي","بخور","أزرق","يومي","أنيق","حمضيات","عمل","كلاسيكي","متعدد الاستخدامات","جريب فروت"], fr: ["frais","boisé","encens","bleu","quotidien","élégant","agrumes","bureau","classique","polyvalent","pamplemousse"] },
    name: { ar: "بلو دي شانيل", fr: "Bleu de Chanel" },
    category: "Men",
    description: {
      ar: "من أشهر العطور الرجالية في العالم، رائحة خشبية منعشة تشعرك بالحرية والأناقة في آنٍ واحد.",
      fr: "L'un des parfums masculins les plus célèbres au monde, une odeur boisée et fraîche qui vous fait sentir libre et élégant.",
    },
    notes: {
      ar: ["جريب فروت", "زنجبيل", "خشب الصندل"],
      fr: ["Pamplemousse", "Gingembre", "Bois de Santal"],
    },
    images: [
      "/images/Blue de chanel (1).jpg",
      "/images/Blue de chanel (2).jpg",
      "/images/Blue de chanel (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
    isPromo: true,
  },
  {
    id: "dior-homme-intense",
    keywords: { ar: ["سوسن","بودر","خشب","سهرات","شتوي","أنيق","بدلة","أعراس","فخم","كاكاو","ثابت"], fr: ["iris","poudré","bois","nuit","hiver","élégant","costume","mariage","luxe","cacao","longue tenue"] },
    name: { ar: "ديور هوم إنتنس", fr: "Dior Homme Intense" },
    category: "Men",
    description: {
      ar: "عطر راقي ومميز برائحة السوسن الناعمة والأخشاب، يشعرك بالتفرد والأناقة الحقيقية.",
      fr: "Un parfum raffiné et distinctif avec l'odeur douce d'iris et de bois, qui vous fait sentir unique et vraiment élégant.",
    },
    notes: {
      ar: ["سوسن", "لافندر", "خشب الأرز"],
      fr: ["Iris", "Lavande", "Bois de Cèdre"],
    },
    images: [
      "/images/Dior homme intese (1).jpg",
      "/images/Dior homme intese (2).jpg",
      "/images/Dior homme intese (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "dior-fahrenheit",
    keywords: { ar: ["جلد","بنفسج","بنزين","قوي","ذكوري","كلاسيكي","شتوي","سهرات","فريد","نار"], fr: ["cuir","violette","essence","fort","masculin","classique","hiver","nuit","unique","feu"] },
    name: { ar: "ديور فهرنهايت", fr: "Dior Fahrenheit" },
    category: "Men",
    description: {
      ar: "عطر رجالي كلاسيكي جريء ومختلف عن الجميع، برائحة الجلد الدافئ والأخشاب الحارة.",
      fr: "Un parfum masculin classique, audacieux et unique, avec l'odeur du cuir chaud et des bois épicés.",
    },
    notes: {
      ar: ["بنفسج", "جلد", "نجيل الهند"],
      fr: ["Violette", "Cuir", "Vétiver"],
    },
    images: [
      "/images/Fahrenheit (1).jpg",
      "/images/Fahrenheit (2).jpg",
      "/images/Fahrenheit (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "la-nuit-de-lhomme",
    keywords: { ar: ["هيل","توابل","ناعم","سهرات","رومانسي","موعد","خزامى","أنيق","خفيف","جذاب"], fr: ["cardamome","épicé","doux","nuit","romantique","rendez-vous","lavande","élégant","subtil","séduisant"] },
    name: { ar: "لا نوي دي لوم", fr: "YSL La Nuit de L'Homme" },
    category: "Men",
    description: {
      ar: "عطر ليلي ساحر برائحة الهيل والأخشاب الناعمة، مثالي للسهرات والمناسبات الرومانسية.",
      fr: "Un parfum de nuit séduisant avec l'odeur de cardamome et de bois doux, parfait pour les soirées et les occasions romantiques.",
    },
    notes: {
      ar: ["هيل", "لافندر", "خشب الأرز"],
      fr: ["Cardamome", "Lavande", "Bois de Cèdre"],
    },
    images: [
      "/images/La nuit de l'homme (1).jpg",
      "/images/La nuit de l'homme (2).jpg",
      "/images/La nuit de l'homme (3).jpg",
      "/images/d2bb5e79c50826d4221fa8ef50de011a.jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
    isPromo: true,
  },
  {
    id: "lacoste-bleu",
    keywords: { ar: ["نعناع","جريب فروت","منعش","صيفي","رياضي","مائي","نادي","يومي","شبابي","نظيف"], fr: ["menthe","pamplemousse","frais","été","sport","aquatique","gym","quotidien","jeune","propre"] },
    name: { ar: "لاكوست بلو", fr: "Lacoste L.12.12 Bleu" },
    category: "Men",
    description: {
      ar: "عطر رياضي منعش وحيوي برائحة الفواكه الخضراء والشاي الأخضر، مثالي لكل يوم.",
      fr: "Un parfum sportif, frais et dynamique avec l'odeur de fruits verts et de thé vert, parfait pour tous les jours.",
    },
    notes: {
      ar: ["جريب فروت", "شاي أخضر", "خشب الأرز"],
      fr: ["Pamplemousse", "Thé Vert", "Bois de Cèdre"],
    },
    images: [
      "/images/Lacoste bleu (1).jpg",
      "/images/Lacoste bleu (2).jpg",
      "/images/Lacoste bleu (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "le-male-elixir",
    keywords: { ar: ["عسل","تبغ","خزامى","حلو","قوي","سهرات","شتوي","ثابت","غورماند","حفلات","جذاب"], fr: ["miel","tabac","lavande","sucré","fort","nuit","hiver","longue tenue","gourmand","boîte de nuit","séduisant"] },
    name: { ar: "لو مال إليكسير", fr: "JPG Le Male Elixir" },
    category: "Men",
    description: {
      ar: "عطر رجالي قوي وفاخر جداً برائحة اللافندر والفانيليا والتبغ الدافئ، يدوم طوال الليل.",
      fr: "Un parfum masculin très puissant et luxueux avec l'odeur de lavande, de vanille et de tabac chaud, qui dure toute la nuit.",
    },
    notes: {
      ar: ["لافندر", "فانيليا", "تبغ"],
      fr: ["Lavande", "Vanille", "Tabac"],
    },
    images: [
      "/images/Le male elixir (1).jpg",
      "/images/Le male elixir (2).jpg",
      "/images/Le male elixir (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
  {
    id: "one-million-elixir",
    keywords: { ar: ["تفاح","ورد","فانيليا","حلو","قوي","سهرات","شتوي","ثابت","حفلات","شبابي","نادي"], fr: ["pomme","rose","vanille","sucré","fort","nuit","hiver","longue tenue","fête","jeune","club"] },
    name: { ar: "ون مليون إليكسير", fr: "One Million Elixir" },
    category: "Men",
    description: {
      ar: "نسخة أقوى من ون مليون الشهير، برائحة التفاح والورد والفانيليا الكثيفة، عطر يجذب الجميع.",
      fr: "Une version plus intense du célèbre One Million, avec l'odeur de pomme, de rose et de vanille chaude, un parfum qui attire tout le monde.",
    },
    notes: {
      ar: ["تفاح", "ورد دمشقي", "فانيليا"],
      fr: ["Pomme", "Rose de Damas", "Vanille"],
    },
    images: [
      "/images/One million elixir (1).jpg",
      "/images/One million elixir (2).jpg",
      "/images/One million elixir (3).jpg",
    ],
    sizes: [
      { size: "30ml", price: 15 },
      { size: "50ml", price: 20, oldPrice: 25 },
      { size: "100ml", price: 35, oldPrice: 50 },
    ],
  },
];
