export type Category = 
  | "אמונה"
  | "תפילה"
  | "שבת"
  | "התחזקות ביום־יום"
  | "תשובה והתחלה מחדש"
  | "מצוות ומעשים"
  | "זוגיות, משפחה וקשרים"
  | "קשיים, נפילות ומשברים";

export type CTAType = "deepen" | "start" | "help" | "ask" | "read";

export interface CTA {
  type: CTAType;
  text: string;
  link: string;
}

export interface ContentBase {
  id: string;
  title: string;
  category: Category;
  tags: string[];
}

export interface Question extends ContentBase {
  shortAnswer: string;
  fullAnswer: React.ReactNode;
  practicalStep?: string;
  relatedGuides: string[]; // array of Guide IDs
  relatedTracks: string[]; // array of Track IDs
  relatedQuestions: string[]; // array of Question IDs
}

export interface Guide extends ContentBase {
  description: string;
  intro: string;
  sections: { title: string; content: string }[];
  relatedTracks: string[];
  relatedQuestions: string[];
}

export interface TrackDay {
  dayNumber: number;
  title: string;
  content: string;
  action: string;
}

export interface Track extends ContentBase {
  description: string;
  durationDays: number;
  days: TrackDay[];
}

export interface Story extends ContentBase {
  excerpt: string;
  content: string;
  author?: string;
}

export interface Booster extends ContentBase {
  content: string;
  action: string;
}
