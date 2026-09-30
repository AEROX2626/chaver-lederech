import fs from 'fs';

let code = fs.readFileSync('src/app/guides/[id]/page.tsx', 'utf8');

const replacement = `const defaultNextSteps: CTA[] = [];
  
  if (guide.relatedGuides && guide.relatedGuides.length > 0) {
    const nextGuide = GUIDES_DB[guide.relatedGuides[0]];
    if (nextGuide) {
      defaultNextSteps.push({ type: 'learn', title: 'רוצה להבין יותר?', text: nextGuide.title, link: '/guides/' + nextGuide.id });
    }
  }

  if (relatedTracks.length > 0) {
    defaultNextSteps.push({ type: 'start', title: 'רוצה להתחיל?', text: relatedTracks[0].title, link: '/tracks/' + relatedTracks[0].id });
  }

  defaultNextSteps.push({ type: 'help', title: 'רוצה לדבר?', text: 'עזרה אישית', link: '/help' });
  defaultNextSteps.push({ type: 'ask', title: 'יש לך שאלה אחרת?', text: 'שאל שאלה', link: '/ask' });`;

code = code.replace(/const defaultNextSteps: CTA\[\] = \[([\s\S]*?)\];/, replacement);

fs.writeFileSync('src/app/guides/[id]/page.tsx', code, 'utf8');
console.log('Replaced CTAs in Guide Detail Page');
