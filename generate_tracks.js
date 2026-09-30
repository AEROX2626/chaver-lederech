import fs from 'fs';

const tracksList = [
  {
    id: "track-01",
    title: "7 ימים של התחזקות",
    cat: "התחזקות ביום־יום",
    duration: 7,
    desc: "7 ימים. 7 צעדים. בלי מהפכות. תהליך שנועד לתת טעימה ראשונה מהדרך."
  },
  {
    id: "track-02",
    title: "מתחילים מאפס",
    cat: "אמונה",
    duration: 10,
    desc: "מסלול המיועד למי שמעולם לא למד יהדות בצורה מסודרת ורוצה להכיר את המושגים מהיסוד."
  },
  {
    id: "track-03",
    title: "30 יום של התקרבות",
    cat: "התחזקות ביום־יום",
    duration: 30,
    desc: "מסע של חודש שלם. כל יום: תוכן קצר + פעולה קטנה."
  },
  {
    id: "track-04",
    title: "חוזרים לעצמנו",
    cat: "תשובה והתחלה מחדש",
    duration: 14,
    desc: "למי שהתרחק ורוצה למצוא מחדש נקודת חיבור, בלי שפה של אשמה."
  },
  {
    id: "track-05",
    title: "מתחזקים באמונה",
    cat: "אמונה",
    duration: 14,
    desc: "תהליך עמוק סביב בורא עולם, משמעות והשגחה."
  },
  {
    id: "track-06",
    title: "תפילה מהלב",
    cat: "תפילה",
    duration: 7,
    desc: "איך מתחילים לדבר עם ה׳? שבוע של תפילה במילים שלך."
  },
  {
    id: "track-shabbat",
    title: "השבת הראשונה שלי",
    cat: "שבת",
    duration: 7,
    desc: "הכנה מעשית לשבת, יום אחרי יום, עד שמגיעים מוכנים."
  }
];

const tracksObj = {};

tracksList.forEach(t => {
  const days = [];
  for(let i=1; i<=t.duration; i++) {
    days.push({
      dayNumber: i,
      title: `היום ה-${i}: צעד אחד קדימה`,
      content: "כל יום מביא איתו הזדמנות חדשה. אל תנסה לעשות הכל בבת אחת. קח רגע אחד לעצמך, תנשום, ותזכור שהדרך מורכבת מצעדים קטנים.",
      action: "הקדש 2 דקות למחשבה חיובית או לפעולה קטנה שקשורה לנושא המסלול."
    });
  }

  tracksObj[t.id] = {
    id: t.id,
    title: t.title,
    category: t.cat,
    tags: ["מסלול", t.cat.split(' ')[0]],
    description: t.desc,
    durationDays: t.duration,
    days: days
  };
});

const tsCode = `import { Track } from "./types";

export const TRACKS_DB: Record<string, Track> = ${JSON.stringify(tracksObj, null, 2)};
`;

fs.writeFileSync('./src/data/tracks.ts', tsCode);
console.log('Generated all tracks!');
