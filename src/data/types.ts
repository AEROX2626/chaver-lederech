import React from "react";

export type Category = 
  | "אמונה"
  | "תפילה"
  | "שבת"
  | "התחזקות ביום־יום"
  | "תשובה והתחלה מחדש"
  | "מצוות ומעשים"
  | "זוגיות, משפחה וקשרים"
  | "קשיים, נפילות ומשברים";

export type CTAType = "deepen" | "learn" | "start" | "help" | "ask" | "read";

export interface CTA {
  type: CTAType;
  title?: string;
  text: string;
  link: string;
}

// System Enums
export type UserStage = "NEW" | "CURIOUS" | "BEGINNER" | "EXPLORING" | "GROWING" | "RETURNING" | "STRUGGLING" | "DEEP_LEARNING" | "SEEKING_HELP";
export type Intent = "START" | "QUESTION" | "DOUBT" | "FAITH" | "PRAYER" | "SHABBAT" | "MITZVOT" | "TESHUVA" | "GROWTH" | "FALL" | "GUILT" | "MEANING" | "RELATIONSHIP" | "FAMILY" | "COMMUNITY" | "LONELINESS" | "GRIEF" | "GUIDANCE" | "HELP" | "LEARNING" | "ACTION" | "TRACK";
export type Mood = "CURIOUS" | "HOPEFUL" | "CONFUSED" | "FRUSTRATED" | "GUILTY" | "SAD" | "LONELY" | "ANGRY" | "OVERWHELMED" | "NEUTRAL";
export type ReviewStatus = "DRAFT" | "AI_DRAFT" | "EDITOR_REVIEW" | "RABBI_REVIEW" | "PROFESSIONAL_REVIEW" | "APPROVED" | "PUBLISHED" | "ARCHIVED";

// Base Content Node Interface
export interface ContentBase {
  id: string;
  title: string;
  slug?: string;
  category: Category;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  reviewStatus?: ReviewStatus;
  reviewer?: string;
  publishedAt?: string;
  updatedAt?: string;
}

// 5. Content Node — Question
export interface Question extends ContentBase {
  question?: string;
  shortAnswer: string;
  fullAnswer: React.ReactNode;
  practicalStep?: string;
  subcategory?: string;
  intentTypes?: Intent[];
  audienceTypes?: UserStage[];
  difficulty?: number | string;
  readingTime?: number;
  sources?: string[];
  relatedQuestions?: string[];
  relatedGuides?: string[];
  relatedTracks?: string[];
  relatedStories?: string[];
  relatedBoosters?: string[];
  helpResources?: string[];
}

// 6. Content Node — Guide
export interface Guide extends ContentBase {
  heroTitle?: string;
  heroDescription?: string;
  description: string;
  intro: string;
  sections: { title: string; content: string }[];
  takeaway?: string;
  practicalAction?: string;
  nextStep?: string; // Kept for backwards compatibility
  faq?: { q: string; a: string }[];
  sources?: string[];
  relatedQuestions?: string[];
  relatedTracks: string[];
  relatedGuides?: string[];
  relatedStories?: string[];
  relatedBoosters?: string[];
  difficulty?: string;
  readingTime?: number;
  audience?: UserStage[];
}

// 8. Track Day
export interface TrackDay {
  trackId?: string;
  dayNumber: number;
  title: string;
  intro?: string;
  content: string;
  action: string;
  reflection?: string;
  microGoal?: string;
  estimatedMinutes?: number;
  relatedQuestion?: string;
  relatedGuide?: string;
  relatedBooster?: string;
  completionMessage?: string;
}

// 7. Content Node — Track
export interface Track extends ContentBase {
  description: string;
  goal?: string;
  targetAudience?: UserStage[];
  durationDays: number;
  difficulty?: string;
  coverImage?: string;
  days: TrackDay[];
  completionMessage?: string;
  nextTrack?: string;
  relatedGuides?: string[];
  relatedQuestions?: string[];
}

// 9. Booster
export interface Booster extends ContentBase {
  content: string;
  action: string;
  mood?: Mood;
  readingTime?: number;
  relatedGuides?: string[];
  relatedTracks?: string[];
}

// 10. Story
export interface Story extends ContentBase {
  excerpt: string;
  content: string; // Used for "story" body
  stage?: UserStage;
  topic?: string;
  relatedQuestion?: string;
  relatedGuide?: string;
  relatedTrack?: string;
  author?: string;
}

// 11. Source
export interface Source {
  id: string;
  type: string;
  author?: string;
  book?: string;
  chapter?: string;
  section?: string;
  quote?: string;
  url?: string;
  verified: boolean;
  verifiedBy?: string;
  reviewStatus?: ReviewStatus;
  notes?: string;
}

// 12. Help Resource
export interface HelpResource {
  id: string;
  name: string;
  type: string;
  description: string;
  topics: string[];
  availability: string;
  contactMethod: string;
  language: string;
  location?: string;
  professionalType?: string;
  verified: boolean;
  active: boolean;
  reviewStatus?: ReviewStatus;
}

// 13. User Journey State
export interface UserJourneyState {
  userId: string;
  currentStage: UserStage;
  interests: string[];
  topics: string[];
  recentQueries: string[];
  completedGuides: string[];
  completedTracks: string[];
  completedDays: string[];
  savedContent: string[];
  likedContent: string[];
  dismissedContent: string[];
  currentTrack?: string;
  currentTrackDay?: number;
  lastActivity: string;
  returningUser: boolean;
  preferredContentLength?: string;
  preferredLearningStyle?: string;
}
