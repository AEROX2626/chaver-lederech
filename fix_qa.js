import fs from 'fs';

const tsCode = fs.readFileSync('./src/data/qa.ts', 'utf8');
const objStr = tsCode.replace('import { Question } from "./types";\n\nexport const QA_DB: Record<string, Question> = ', '').trim().replace(/;$/, '');
const qaDb = JSON.parse(objStr);

const REVERSE_MAP = {
  "guide-a01": "guide-1",
  "guide-a02": "guide-2",
  "guide-a03": "guide-3",
  "guide-a04": "guide-4",
  "guide-p01": "guide-5",
  "guide-p02": "guide-6",
  "guide-p03": "guide-7",
  "guide-p04": "guide-8",
  "guide-s01": "guide-9",
  "guide-s02": "guide-10",
  "guide-s03": "guide-11",
  "guide-s04": "guide-12",
  "guide-c01": "guide-13",
  "guide-c02": "guide-14",
  "guide-c03": "guide-15",
  "guide-c04": "guide-16",
  "guide-t01": "guide-17",
  "guide-t02": "guide-18",
  "guide-m01": "guide-19",
  "guide-m02": "guide-20",
  "guide-m03": "guide-21",
  "guide-f01": "guide-22",
  "guide-f02": "guide-23",
  "guide-h01": "guide-24"
};

for (const q of Object.values(qaDb)) {
  if (q.relatedGuides) {
    q.relatedGuides = q.relatedGuides.map(g => REVERSE_MAP[g] || g);
  }
}

const finalCode = `import { Question } from "./types";\n\nexport const QA_DB: Record<string, Question> = ${JSON.stringify(qaDb, null, 2)};\n`;
fs.writeFileSync('./src/data/qa.ts', finalCode, 'utf8');
console.log('Successfully updated QA_DB related guides!');
