import { Guide } from "./types";

export const GUIDES_DB: Record<string, Guide> = {
  "guide-a01": {
    id: "guide-a01",
    title: "מהי אמונה?",
    category: "אמונה",
    tags: ["אמונה", "מתחילים", "יסודות"],
    description: "מדריך בסיסי להבנת המושג אמונה ביהדות.",
    intro: "אמונה היא לא רק החלטה 'להאמין', אלא תהליך של חיפוש ומחשבה.",
    sections: [
      { title: "מה משמעות המילה אמונה?", content: "אמונה קשורה לאמון. לא רק לדעת עובדה, אלא לבטוח." },
      { title: "אמונה ושאלות", content: "היהדות מזמינה לשאול שאלות ולא לפחד מהן." }
    ],
    relatedTracks: ["track-a"],
    relatedQuestions: ["q-0", "q-1", "q-7"]
  },
  "guide-p02": {
    id: "guide-p02",
    title: "תפילה למתחילים — המדריך המלא",
    category: "תפילה",
    tags: ["תפילה", "מתחילים", "מעשי"],
    description: "איך מתחילים להתפלל מאפס.",
    intro: "למתחיל, סידור התפילה יכול להיראות כמו ספר חידות. כאן נעשה סדר.",
    sections: [
      { title: "מהי תפילה?", content: "תפילה היא זמן לעצור ולדבר עם ה׳." },
      { title: "מבנה הסידור", content: "שחרית, מנחה וערבית." }
    ],
    relatedTracks: ["track-06"],
    relatedQuestions: ["q-9", "q-10"]
  },
  "guide-s02": {
    id: "guide-s02",
    title: "שבת למתחילים — מאפס",
    category: "שבת",
    tags: ["שבת", "מתחילים", "מעשי"],
    description: "כל מה שצריך לדעת כדי לחוות את השבת הראשונה שלך.",
    intro: "השבת היא זמן עצירה. הנה איך מתחילים.",
    sections: [
      { title: "הכנות", content: "מה עושים לפני שבת?" },
      { title: "כניסת שבת", content: "הדלקת נרות וקבלת שבת." }
    ],
    relatedTracks: ["track-shabbat"],
    relatedQuestions: ["q-17", "q-20"]
  },
  "guide-c01": {
    id: "guide-c01",
    title: "המדריך למי שרוצה להתחזק ולא יודע מאיפה להתחיל",
    category: "התחזקות ביום־יום",
    tags: ["התחזקות", "מתחילים"],
    description: "הצעד הראשון בדרך שלך.",
    intro: "יש כל כך הרבה מה לעשות, מאיפה מתחילים?",
    sections: [
      { title: "לבחור צעד קטן", content: "אל תשנה הכל ביום אחד." },
      { title: "להתמיד", content: "הסוד הוא ברצף, לא בעוצמה." }
    ],
    relatedTracks: ["track-01", "track-02"],
    relatedQuestions: ["q-24", "q-27"]
  }
};
