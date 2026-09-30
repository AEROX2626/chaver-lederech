import { Track } from "./types";

export const TRACKS_DB: Record<string, Track> = {
  "track-01": {
    id: "track-01",
    title: "7 ימים של התחזקות",
    category: "התחזקות ביום־יום",
    tags: ["התחזקות", "קצר", "מתחילים"],
    description: "לתת טעימה ראשונה מהדרך, צעד אחד בכל יום.",
    durationDays: 7,
    days: [
      { dayNumber: 1, title: "איפה אני נמצא?", content: "לדעת מאיפה מתחילים.", action: "לכתוב למה הגעתי לכאן." },
      { dayNumber: 2, title: "מותר להתחיל קטן", content: "אין צורך לעשות הכל היום.", action: "לבחור הרגל אחד." }
    ]
  },
  "track-02": {
    id: "track-02",
    title: "מתחילים מאפס",
    category: "התחזקות ביום־יום",
    tags: ["מתחילים", "יסודות"],
    description: "אדם שאין לו רקע מתחיל מכאן.",
    durationDays: 10,
    days: [
      { dayNumber: 1, title: "מי זה ה׳?", content: "היכרות בסיסית.", action: "לדבר עם ה׳ דקה אחת." }
    ]
  },
  "track-shabbat": {
    id: "track-shabbat",
    title: "השבת הראשונה שלי",
    category: "שבת",
    tags: ["שבת", "מעשי"],
    description: "לאפשר למשתמש לחוות שבת ולא רק לקרוא עליה.",
    durationDays: 7,
    days: [
      { dayNumber: 1, title: "מהי שבת?", content: "הבנת השבת.", action: "לתכנן מה עושים בשבת הקרובה." }
    ]
  }
};
