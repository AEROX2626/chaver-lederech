import fs from 'fs';

const tsCode = fs.readFileSync('./src/data/guides.ts', 'utf8');

const objStr = tsCode.replace('import { Guide } from "./types";\n\nexport const GUIDES_DB: Record<string, Guide> = ', '').trim().replace(/;$/, '');
const guides = JSON.parse(objStr);

const ID_MAP = {
  "A01": "guide-1",
  "A02": "guide-2",
  "A03": "guide-3",
  "A04": "guide-4",
  "P01": "guide-5",
  "P02": "guide-6",
  "P03": "guide-7",
  "P04": "guide-8",
  "S01": "guide-9",
  "S02": "guide-10",
  "S03": "guide-11",
  "S04": "guide-12",
  "C01": "guide-13",
  "C02": "guide-14",
  "C03": "guide-15",
  "C04": "guide-16",
  "T01": "guide-17",
  "T02": "guide-18",
  "M01": "guide-19",
  "M02": "guide-20",
  "M03": "guide-21",
  "F01": "guide-22",
  "F02": "guide-23",
  "H01": "guide-24"
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
