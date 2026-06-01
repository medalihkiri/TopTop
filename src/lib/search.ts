import { Product } from "@/data/products";

// ─────────────────────────────────────────────────────────────────────────────
// 1. TEXT NORMALISATION
//    Strip accents, unify Arabic alef forms, lowercase.
//    So "été" === "ete", "أناناس" === "اناناس", etc.
// ─────────────────────────────────────────────────────────────────────────────
function normalize(text: string): string {
  return text
    .toLowerCase()
    // Remove Latin diacritics: é→e  â→a  ô→o  ü→u  etc.
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Unify Arabic alef variants → ا
    .replace(/[أإآ]/g, "ا")
    // Remove Arabic diacritics (tashkeel)
    .replace(/[\u064B-\u065F]/g, "")
    .trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SYNONYM MAP  (English + French + Arabic aliases)
//    Each entry maps an input term → list of equivalent search terms.
//    This is what makes "strawberry" find "fraise"/"فراولة", etc.
// ─────────────────────────────────────────────────────────────────────────────
const SYNONYMS: Record<string, string[]> = {
  // ── English → French / Arabic ─────────────────────────────────────────────
  strawberry: ["fraise", "فراولة"],
  vanilla: ["vanille", "فانيليا"],
  oud: ["عود", "oud", "bois"],
  rose: ["rose", "ورد"],
  jasmine: ["jasmin", "ياسمين"],
  musk: ["musc", "مسك"],
  wood: ["boise", "bois", "خشبي", "خشب"],
  woody: ["boise", "bois", "خشبي"],
  floral: ["floral", "زهري"],
  sweet: ["sucre", "حلو", "gourmand"],
  fresh: ["frais", "منعش"],
  citrus: ["agrumes", "حمضيات"],
  summer: ["ete", "صيفي"],
  winter: ["hiver", "شتوي"],
  spring: ["printemps", "ربيعي"],
  night: ["nuit", "soiree", "سهرات", "ليلي"],
  evening: ["soiree", "nuit", "سهرات"],
  office: ["bureau", "عمل"],
  work: ["bureau", "عمل"],
  wedding: ["mariage", "أعراس"],
  strong: ["fort", "قوي"],
  intense: ["fort", "قوي", "intense"],
  light: ["doux", "leger", "خفيف", "ناعم"],
  soft: ["doux", "ناعم"],
  sexy: ["seduisant", "جذاب", "sensuel"],
  party: ["fete", "حفلات", "club", "boite de nuit"],
  club: ["boite de nuit", "club", "nuit", "fete"],
  caramel: ["caramel", "كراميل"],
  chocolate: ["chocolat", "شوكولاتة"],
  coffee: ["cafe", "قهوة"],
  honey: ["miel", "عسل"],
  coconut: ["coco", "جوز الهند"],
  beach: ["plage", "بحر"],
  sport: ["sport", "رياضي", "gym"],
  romantic: ["romantique", "رومانسي", "amour"],
  date: ["rendez-vous", "موعد", "romantique"],
  pineapple: ["ananas", "أناناس"],
  apple: ["pomme", "تفاح"],
  pear: ["poire", "كمثرى"],
  lemon: ["citron", "ليمون"],
  orange: ["orange", "برتقال"],
  lavender: ["lavande", "خزامى"],
  amber: ["ambre", "عنبر"],
  leather: ["cuir", "جلد"],
  tobacco: ["tabac", "تبغ"],
  spicy: ["epice", "توابل", "fort"],
  powder: ["poudre", "بودر"],
  luxury: ["luxe", "فخم"],
  classic: ["classique", "كلاسيكي"],
  elegant: ["elegant", "أنيق"],
  masculine: ["masculin", "ذكوري"],
  feminine: ["femme", "féminin", "أنثوي"],
  unisex: ["unisexe", "للجنسين"],
  daily: ["quotidien", "يومي"],
  long: ["longue tenue", "ثابت"],
  lasting: ["longue tenue", "ثابت"],
  tropical: ["tropical", "استوائي"],
  marine: ["marin", "aquatique", "بحري"],
  aquatic: ["aquatique", "مائي", "bحري"],
  oriental: ["oriental", "شرقي"],
  ward: ["rose", "ورد"],
  yasmine: ["jasmin", "ياسمين"],
  misk: ["musc", "مسك"],
  // ── French shortcuts ───────────────────────────────────────────────────────
  ete: ["صيفي", "été", "plage", "soleil"],
  nuit: ["سهرات", "ليلي", "soiree"],
  soiree: ["سهرات", "nuit"],
  homme: ["masculin", "ذكوري", "رجالي"],
  femme: ["أنثوي", "نسائي"],
  fleur: ["floral", "زهري", "flower"],
  bois: ["خشبي", "woody"],
  frais: ["منعش", "fresh"],
  doux: ["ناعم", "ناعم", "soft"],
  fort: ["قوي", "strong"],
  sucre: ["حلو", "sweet"],
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. FIELD WEIGHTS
//    Name matches are more valuable than keyword matches.
// ─────────────────────────────────────────────────────────────────────────────
const WEIGHTS = {
  name: 10,
  keyword: 6,
  note: 4,
  description: 2,
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. BUILD INDEXED PRODUCT (pre-compute normalised field strings once)
// ─────────────────────────────────────────────────────────────────────────────
interface IndexedProduct {
  product: Product;
  nameText: string;
  keywordText: string;
  noteText: string;
  descText: string;
}

function buildIndex(products: Product[]): IndexedProduct[] {
  return products.map((p) => ({
    product: p,
    nameText: normalize(`${p.name.ar} ${p.name.fr}`),
    keywordText: normalize(
      [
        ...(p.keywords?.ar || []),
        ...(p.keywords?.fr || []),
        p.category,
      ].join(" ")
    ),
    noteText: normalize([...p.notes.ar, ...p.notes.fr].join(" ")),
    descText: normalize(`${p.description.ar} ${p.description.fr}`),
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPAND QUERY TOKENS
//    "strawberry vanilla" → ["strawberry", "fraise", "فراولة", "vanilla", "vanille", "فانيليا"]
// ─────────────────────────────────────────────────────────────────────────────
function expandTokens(raw: string): string[] {
  const tokens = normalize(raw)
    .split(/\s+/)
    .filter(Boolean);

  const expanded = new Set<string>();
  for (const token of tokens) {
    expanded.add(token);
    const syns = SYNONYMS[token];
    if (syns) syns.map(normalize).forEach((s) => expanded.add(s));
  }
  return Array.from(expanded);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. SCORE A SINGLE PRODUCT AGAINST A TOKEN
//    Uses partial matching so "van" matches "vanille".
// ─────────────────────────────────────────────────────────────────────────────
function scoreToken(indexed: IndexedProduct, token: string): number {
  let score = 0;
  if (indexed.nameText.includes(token)) score += WEIGHTS.name;
  if (indexed.keywordText.includes(token)) score += WEIGHTS.keyword;
  if (indexed.noteText.includes(token)) score += WEIGHTS.note;
  if (indexed.descText.includes(token)) score += WEIGHTS.description;
  return score;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. PUBLIC SEARCH FUNCTION
// ─────────────────────────────────────────────────────────────────────────────
export interface SearchResult {
  product: Product;
  score: number;
}

let cachedIndex: IndexedProduct[] | null = null;

export function searchProducts(
  products: Product[],
  query: string
): SearchResult[] {
  if (!query.trim()) return [];

  // Build index once and cache it
  if (!cachedIndex || cachedIndex.length !== products.length) {
    cachedIndex = buildIndex(products);
  }

  const tokens = expandTokens(query);
  if (!tokens.length) return [];

  const results: SearchResult[] = [];

  for (const indexed of cachedIndex) {
    // Sum score across ALL expanded tokens
    let totalScore = 0;
    let matchedOriginalTokens = 0;

    // Group by original (non-expanded) tokens so we can count how many
    // of the user's actual words matched
    const rawTokens = normalize(query).split(/\s+/).filter(Boolean);

    for (const rawToken of rawTokens) {
      const group = [rawToken, ...(SYNONYMS[rawToken]?.map(normalize) || [])];
      const groupScore = group.reduce(
        (s, t) => s + scoreToken(indexed, t),
        0
      );
      if (groupScore > 0) {
        matchedOriginalTokens++;
        totalScore += groupScore;
      }
    }

    if (matchedOriginalTokens === 0) continue;

    // Bonus: all original words matched
    if (matchedOriginalTokens === rawTokens.length) {
      totalScore += 5;
    }

    results.push({ product: indexed.product, score: totalScore });
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
