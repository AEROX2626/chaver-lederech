import fs from 'fs';

const tsCode = fs.readFileSync('./src/data/guides.ts', 'utf8');

// Parse the existing object
const objStr = tsCode.replace('import { Guide } from "./types";\n\nexport const GUIDES_DB: Record<string, Guide> = ', '').trim().replace(/;$/, '');
const guides = JSON.parse(objStr);

const ID_MAP = {
  "A01": "what-is-faith",
  "A02": "questions-and-doubts",
  "A03": "faith-in-hard-times",
  "A04": "meaning-of-life",
  "P01": "what-is-prayer",
  "P02": "prayer-for-beginners",
  "P03": "prayer-with-intention",
  "P04": "prayer-in-hard-times",
  "S01": "what-is-shabbat",
  "S02": "shabbat-for-beginners",
  "S03": "entering-shabbat",
  "S04": "kiddush-and-havdalah",
  "C01": "how-to-get-stronger",
  "C02": "building-spiritual-habits",
  "C03": "grow-without-burning-out",
  "C04": "getting-back-up",
  "T01": "what-is-teshuvah",
  "T02": "starting-again",
  "T03": "starting-again", // Faux
  "M01": "why-mitzvot",
  "M02": "brachot-for-beginners",
  "M03": "character-traits",
  "F01": "growth-and-relationships",
  "F02": "family-and-social-circle",
  "H01": "feeling-far-from-god"
};

const mappings = {
  "A01": ["A02", "A03", "A04"],
  "A02": ["A01", "A03", "A04"],
  "A03": ["P04", "T02", "H01"],
  "A04": ["A01", "M01", "C01"],
  "P01": ["P02", "P03", "P04"],
  "P02": ["P03", "P01"],
  "P03": ["P04"],
  "P04": ["H01", "A03"],
  "S01": ["S02", "S03", "S04"],
  "S02": ["S03", "S04"],
  "S03": ["S04"],
  "C01": ["C02", "C03", "C04"],
  "C02": ["C03", "C04"],
  "C03": ["C04"],
  "C04": ["T01", "T02", "H01"],
  "T01": ["T02"],
  "T02": ["C04", "H01"],
  "M01": ["M02", "M03"],
  "F01": ["F02", "H01"],
  "F02": ["H01"],
  "H01": ["A03", "P04", "C04", "T02"]
};

for (const [key, value] of Object.entries(mappings)) {
  const sourceId = ID_MAP[key];
  if (sourceId && guides[sourceId]) {
    guides[sourceId].relatedGuides = value.map(v => ID_MAP[v]).filter(Boolean);
  }
}

const finalCode = `import { Guide } from "./types";\n\nexport const GUIDES_DB: Record<string, Guide> = ${JSON.stringify(guides, null, 2)};\n`;
fs.writeFileSync('./src/data/guides.ts', finalCode, 'utf8');
console.log('Successfully linked guides!');
