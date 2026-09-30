const fs = require('fs');
const readline = require('readline');

async function parseGuides() {
  // Read the transcript to get the user's last message
  const transcriptPath = 'C:/Users/User/.gemini/antigravity/brain/8d653b1f-f32d-4b45-9b2b-1ed7bbd55ae7/.system_generated/logs/transcript_full.jsonl';
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let lastUserMessage = '';
  for await (const line of rl) {
    const entry = JSON.parse(line);
    if (entry.type === 'USER_INPUT' && entry.content.includes('# PILLAR 01')) {
      lastUserMessage = entry.content;
    }
  }

  if (!lastUserMessage) {
    console.error('Could not find the user message with the pillars.');
    return;
  }

  // Parse the markdown
  const guides = {};
  const pillars = lastUserMessage.split(/# PILLAR \d+/).slice(1); // skip preamble

  pillars.forEach((pillarStr, idx) => {
    // Extract ID (e.g. guide-01, but we'll use slug or custom ID)
    // Actually, we can use the ID from the numbering: A01, A02 etc. based on the category.
    // The user provided slugs like: Slug: /guides/what-is-faith
    const slugMatch = pillarStr.match(/Slug:\s*\/guides\/([^\r\n]+)/);
    const id = slugMatch ? slugMatch[1].trim() : `guide-${idx+1}`;

    const titleMatch = pillarStr.match(/##\s*([^\r\n]+)/);
    const title = titleMatch ? titleMatch[1].trim() : `Guide ${idx+1}`;

    const category = getCategory(idx + 1);

    const descMatch = pillarStr.match(/\*\*Meta Description:\*\*\s*([^\r\n]+)/);
    const desc = descMatch ? descMatch[1].trim() : "";

    // Extract sections
    // A section is marked by ### Section Title
    const sections = [];
    let currentSection = null;
    
    const lines = pillarStr.split('\n');
    let intro = "";
    let isIntro = false;
    let faq = [];
    let isFaq = false;
    let sources = [];
    let nextStep = "";
    let takeaway = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('### ')) {
        const h3 = line.replace('###', '').trim();
        if (h3 === 'פתיחה') {
          isIntro = true;
          isFaq = false;
          currentSection = null;
        } else if (h3 === 'FAQ') {
          isFaq = true;
          isIntro = false;
          currentSection = null;
        } else if (h3 === 'מקורות') {
          isFaq = false;
          currentSection = null;
          // next lines are sources
          let j = i + 1;
          while (j < lines.length && !lines[j].startsWith('**CTA:**') && !lines[j].startsWith('#')) {
            if (lines[j].trim()) sources.push(lines[j].trim());
            j++;
          }
          i = j - 1;
        } else if (h3 === 'הצעד הבא' || h3 === 'הצעד הבא שלך') {
          isIntro = false;
          isFaq = false;
          currentSection = null;
          let j = i + 1;
          while (j < lines.length && !lines[j].startsWith('###') && !lines[j].startsWith('#')) {
            if (lines[j].trim()) nextStep += lines[j].trim() + " ";
            j++;
          }
          i = j - 1;
        } else if (h3 === 'מה לקחת מכאן') {
          isIntro = false;
          isFaq = false;
          currentSection = null;
          let j = i + 1;
          while (j < lines.length && !lines[j].startsWith('###') && !lines[j].startsWith('#')) {
            if (lines[j].trim()) takeaway += lines[j].trim() + " ";
            j++;
          }
          i = j - 1;
        } else {
          isIntro = false;
          isFaq = false;
          currentSection = { title: h3, content: "" };
          sections.push(currentSection);
        }
      } else if (line.startsWith('**') && isFaq) {
        // FAQ question
        const q = line.replace(/\*\*/g, '').trim();
        let j = i + 1;
        let a = "";
        while (j < lines.length && !lines[j].startsWith('**') && !lines[j].startsWith('###') && !lines[j].startsWith('#')) {
          if (lines[j].trim()) a += lines[j].trim() + " ";
          j++;
        }
        faq.push({ q, a: a.trim() });
        i = j - 1;
      } else if (line && !line.startsWith('**Meta') && !line.startsWith('**Slug') && !line.startsWith('Slug:')) {
        if (isIntro) {
          intro += line + "\n";
        } else if (currentSection) {
          currentSection.content += line + "\n";
        }
      }
    }

    guides[id] = {
      id,
      title,
      category,
      tags: [category],
      description: desc,
      intro: intro.trim(),
      sections: sections.map(s => ({ title: s.title, content: s.content.trim() })),
      takeaway: takeaway.trim(),
      nextStep: nextStep.trim(),
      faq,
      sources,
      relatedTracks: getRelatedTracks(category),
      relatedGuides: [] // Will map cross links below
    };
  });

  // Write TS file
  const tsCode = `import { Guide } from "./types";

export const GUIDES_DB: Record<string, Guide> = ${JSON.stringify(guides, null, 2)};
`;

  fs.writeFileSync('./src/data/guides.ts', tsCode, 'utf8');
  console.log('Successfully parsed and generated guides.ts!');
}

function getCategory(num) {
  if (num <= 4) return "אמונה";
  if (num <= 8) return "תפילה";
  if (num <= 12) return "שבת";
  if (num <= 16) return "התחזקות ביום־יום";
  if (num <= 18) return "תשובה והתחלה מחדש";
  if (num <= 21) return "מצוות ומעשים";
  if (num <= 23) return "זוגיות, משפחה וקשרים";
  return "קשיים, נפילות ומשברים";
}

function getRelatedTracks(cat) {
  if (cat === "אמונה") return ["track-02", "track-05"];
  if (cat === "תפילה") return ["track-06"];
  if (cat === "שבת") return ["track-shabbat"];
  if (cat === "התחזקות ביום־יום") return ["track-01", "track-03"];
  if (cat === "תשובה והתחלה מחדש") return ["track-04"];
  return ["track-01"];
}

parseGuides().catch(console.error);
