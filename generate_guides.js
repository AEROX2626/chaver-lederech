import fs from 'fs';

const guidesList = [
  // A - Emuna
  { id: "guide-a01", cat: "אמונה", title: "מהי אמונה?", tags: ["אמונה", "יסודות"], related: ["track-a"] },
  { id: "guide-a02", cat: "אמונה", title: "איך מתמודדים עם ספקות באמונה?", tags: ["ספקות", "אמונה"], related: ["track-a"] },
  { id: "guide-a03", cat: "אמונה", title: "אמונה בתקופות קשות", tags: ["קושי", "אמונה"], related: ["track-a"] },
  { id: "guide-a04", cat: "אמונה", title: "למה יש בעולם סבל?", tags: ["סבל", "אמונה"], related: ["track-a"] },
  { id: "guide-a05", cat: "אמונה", title: "בחירה חופשית", tags: ["בחירה", "אמונה"], related: ["track-a"] },
  { id: "guide-a06", cat: "אמונה", title: "השגחה פרטית", tags: ["השגחה", "אמונה"], related: ["track-a"] },
  { id: "guide-a07", cat: "אמונה", title: "משמעות החיים", tags: ["משמעות"], related: ["track-a"] },
  { id: "guide-a08", cat: "אמונה", title: "אמונה, מוסר וטוב", tags: ["מוסר"], related: ["track-a"] },
  
  // P - Tefila
  { id: "guide-p01", cat: "תפילה", title: "מהי תפילה ולמה מתפללים?", tags: ["תפילה", "יסודות"], related: ["track-06"] },
  { id: "guide-p02", cat: "תפילה", title: "תפילה למתחילים — המדריך המלא", tags: ["תפילה", "מתחילים"], related: ["track-06"] },
  { id: "guide-p03", cat: "תפילה", title: "איך מתפללים בכוונה?", tags: ["תפילה", "כוונה"], related: ["track-06"] },
  { id: "guide-p04", cat: "תפילה", title: "תפילה כשהחיים קשים", tags: ["תפילה", "קושי"], related: ["track-06"] },
  { id: "guide-p05", cat: "תפילה", title: "איך מדברים עם ה׳ במילים שלך?", tags: ["תפילה אישית"], related: ["track-06"] },
  { id: "guide-p06", cat: "תפילה", title: "מדריך בסיסי לסידור", tags: ["סידור", "תפילה"], related: ["track-06"] },

  // S - Shabbat
  { id: "guide-s01", cat: "שבת", title: "מהי שבת ולמה היא כל כך מרכזית?", tags: ["שבת", "יסודות"], related: ["track-shabbat"] },
  { id: "guide-s02", cat: "שבת", title: "שבת למתחילים — מאפס", tags: ["שבת", "מתחילים"], related: ["track-shabbat"] },
  { id: "guide-s03", cat: "שבת", title: "איך נכנסים לשבת?", tags: ["שבת", "הכנות"], related: ["track-shabbat"] },
  { id: "guide-s04", cat: "שבת", title: "קידוש למתחילים", tags: ["קידוש", "שבת"], related: ["track-shabbat"] },
  { id: "guide-s05", cat: "שבת", title: "מה מותר ומה אסור בשבת?", tags: ["הלכה", "שבת"], related: ["track-shabbat"] },
  { id: "guide-s06", cat: "שבת", title: "מה עושים כשקשה לשמור שבת?", tags: ["קושי", "שבת"], related: ["track-shabbat"] },
  { id: "guide-s07", cat: "שבת", title: "מוצאי שבת והבדלה", tags: ["הבדלה", "שבת"], related: ["track-shabbat"] },
  { id: "guide-s08", cat: "שבת", title: "מדריך לשבת בבית", tags: ["שבת", "משפחה"], related: ["track-shabbat"] },

  // C - Hithazkut
  { id: "guide-c01", cat: "התחזקות ביום־יום", title: "המדריך למי שרוצה להתחזק ולא יודע מאיפה להתחיל", tags: ["התחזקות", "מתחילים"], related: ["track-01", "track-02"] },
  { id: "guide-c02", cat: "התחזקות ביום־יום", title: "איך בונים הרגל רוחני שנשאר?", tags: ["הרגלים"], related: ["track-01"] },
  { id: "guide-c03", cat: "התחזקות ביום־יום", title: "אל תשווה את הדרך שלך לאחרים", tags: ["התחזקות", "השוואות"], related: ["track-01"] },
  { id: "guide-c04", cat: "התחזקות ביום־יום", title: "מה עושים כשהסביבה לא מבינה אותך?", tags: ["סביבה", "התחזקות"], related: ["track-01"] },
  { id: "guide-c05", cat: "התחזקות ביום־יום", title: "איך מוצאים קהילה תומכת?", tags: ["קהילה"], related: ["track-01"] },
  { id: "guide-c06", cat: "התחזקות ביום־יום", title: "איך מתחילים מחדש אחרי שנפלנו?", tags: ["נפילות", "התחזקות"], related: ["track-01"] },
  { id: "guide-c07", cat: "התחזקות ביום־יום", title: "איך מתחזקים בלי להישרף?", tags: ["איזון", "התחזקות"], related: ["track-01"] },

  // T - Teshuva
  { id: "guide-t01", cat: "תשובה והתחלה מחדש", title: "מהי תשובה?", tags: ["תשובה", "יסודות"], related: ["track-04"] },
  { id: "guide-t02", cat: "תשובה והתחלה מחדש", title: "איך מתחילים מחדש?", tags: ["התחלה מחדש"], related: ["track-04"] },
  { id: "guide-t03", cat: "תשובה והתחלה מחדש", title: "בושה, אשמה וחרטה", tags: ["רגשות", "תשובה"], related: ["track-04"] },
  { id: "guide-t04", cat: "תשובה והתחלה מחדש", title: "מה עושים כשנופלים שוב?", tags: ["נפילות", "תשובה"], related: ["track-04"] },
  { id: "guide-t05", cat: "תשובה והתחלה מחדש", title: "איך עושים תשובה?", tags: ["תשובה", "מעשי"], related: ["track-04"] },
  { id: "guide-t06", cat: "תשובה והתחלה מחדש", title: "תשובה מול אדם שפגענו בו", tags: ["בין אדם לחברו", "תשובה"], related: ["track-04"] },

  // M - Mitzvot
  { id: "guide-m01", cat: "מצוות ומעשים", title: "למה מצוות?", tags: ["מצוות", "יסודות"], related: ["track-02"] },
  { id: "guide-m02", cat: "מצוות ומעשים", title: "בין אדם למקום ובין אדם לחברו", tags: ["מצוות", "בין אדם לחברו"], related: ["track-02"] },
  { id: "guide-m03", cat: "מצוות ומעשים", title: "המדריך לברכות למתחילים", tags: ["ברכות", "מתחילים"], related: ["track-02"] },
  { id: "guide-m04", cat: "מצוות ומעשים", title: "צדקה, חסד ונתינה", tags: ["צדקה", "חסד"], related: ["track-02"] },
  { id: "guide-m05", cat: "מצוות ומעשים", title: "כיבוד הורים", tags: ["כיבוד הורים", "מצוות"], related: ["track-02"] },
  { id: "guide-m06", cat: "מצוות ומעשים", title: "שמירת הלשון", tags: ["שמירת הלשון", "מצוות"], related: ["track-02"] },
  { id: "guide-m07", cat: "מצוות ומעשים", title: "עבודת המידות", tags: ["מידות"], related: ["track-02"] },
  { id: "guide-m08", cat: "מצוות ומעשים", title: "איך מצווה קטנה יוצרת שינוי גדול?", tags: ["התמדה", "מצוות"], related: ["track-02"] },

  // F - Family
  { id: "guide-f01", cat: "זוגיות, משפחה וקשרים", title: "התחזקות בתוך זוגיות", tags: ["זוגיות"], related: ["track-01"] },
  { id: "guide-f02", cat: "זוגיות, משפחה וקשרים", title: "פערים דתיים בזוגיות", tags: ["זוגיות", "פערים"], related: ["track-01"] },
  { id: "guide-f03", cat: "זוגיות, משפחה וקשרים", title: "התחזקות מול המשפחה", tags: ["משפחה"], related: ["track-01"] },
  { id: "guide-f04", cat: "זוגיות, משפחה וקשרים", title: "מה חשוב לברר לפני חתונה?", tags: ["זוגיות", "רווקות"], related: ["track-01"] },
  { id: "guide-f05", cat: "זוגיות, משפחה וקשרים", title: "חברים, סביבה ושינוי", tags: ["חברים", "סביבה"], related: ["track-01"] },
  { id: "guide-f06", cat: "זוגיות, משפחה וקשרים", title: "איך להתמודד עם לחץ חברתי?", tags: ["לחץ חברתי"], related: ["track-01"] },
  { id: "guide-f07", cat: "זוגיות, משפחה וקשרים", title: "איך לא להרגיש לבד בדרך?", tags: ["בדידות"], related: ["track-01"] },

  // H - Hardships
  { id: "guide-h01", cat: "קשיים, נפילות ומשברים", title: "כשמרגישים רחוקים מה׳", tags: ["ריחוק", "קושי"], related: ["track-04"] },
  { id: "guide-h02", cat: "קשיים, נפילות ומשברים", title: "נפילות — איך קמים?", tags: ["נפילות"], related: ["track-04"] },
  { id: "guide-h03", cat: "קשיים, נפילות ומשברים", title: "מותר לכעוס על ה׳?", tags: ["כעס", "קושי"], related: ["track-04"] },
  { id: "guide-h04", cat: "קשיים, נפילות ומשברים", title: "מה עושים כשאין תשובה ל'למה?'", tags: ["סבל", "שאלות"], related: ["track-04"] },
  { id: "guide-h05", cat: "קשיים, נפילות ומשברים", title: "אמונה ואובדן", tags: ["אובדן", "אמונה"], related: ["track-04"] },
  { id: "guide-h06", cat: "קשיים, נפילות ומשברים", title: "אשמה, פחד ותחושת כישלון", tags: ["אשמה", "פחד"], related: ["track-04"] }
];

const guidesObj = {};
guidesList.forEach(g => {
  guidesObj[g.id] = {
    id: g.id,
    title: g.title,
    category: g.cat,
    tags: g.tags,
    description: "מאמר עומק בנושא " + g.title,
    intro: "כאן תמצא את כל מה שצריך לדעת כדי להבין לעומק את הנושא של " + g.title + ". אנחנו עושים סדר בדברים שלב אחרי שלב.",
    sections: [
      {
        title: "קצת רקע",
        content: "כשמתחילים ללמוד על " + g.title + ", חשוב קודם כל להבין את הבסיס. היהדות לא דורשת מאיתנו לדעת הכל מיד, אלא מזמינה אותנו לשאול ולברר. בפרק זה נבין את השורש של הדברים."
      },
      {
        title: "איך זה פוגש אותנו ביום־יום?",
        content: "האמונה וההלכה לא נועדו להישאר בספרים, אלא לרדת לחיים עצמם. כאשר אנחנו מבינים את המשמעות הפנימית, קל יותר למצוא את החיבור האישי שלנו."
      },
      {
        title: "נקודה למחשבה",
        content: "לא צריך להיות מושלם כדי להתקדם. גם אם יש ספקות או קשיים, עצם הרצון ללמוד ולחפש הוא כבר צעד ענק בדרך למעלה."
      }
    ],
    relatedTracks: g.related,
    relatedQuestions: [] // Could be mapped later
  };
});

const tsCode = `import { Guide } from "./types";

export const GUIDES_DB: Record<string, Guide> = ${JSON.stringify(guidesObj, null, 2)};
`;

fs.writeFileSync('./src/data/guides.ts', tsCode);
console.log('Generated all guides!');
