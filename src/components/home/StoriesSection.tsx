import { Quote } from "lucide-react";
import Reveal from "../Reveal";

const STORIES = [
  {
    quote: "שנים חשבתי שאם אני לא עושה הכל אז אין טעם. כאן הבנתי שגם להניח תפילין פעם בשבוע זה 100% יותר מכלום. זה שינה לי את כל התפיסה.",
    name: "יובל, 28",
  },
  {
    quote: "השאלות הקשות שלי תמיד נשארו בבטן כי פחדתי לשאול. כשהתחלתי לקרוא פה את התשובות, הבנתי שאני לא היחידה שמתמודדת עם הספקות האלה.",
    name: "נועה, 34",
  },
  {
    quote: "הייתי בטוח שאצטרך לשנות את כל החיים שלי ביום אחד. המסלול של הצעדים הקטנים נתן לי אוויר לנשימה. אני אותו אדם, רק קרוב יותר.",
    name: "איתי, 41",
  }
];

export default function StoriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="t-display text-3xl text-slate-900 sm:text-4xl">
            גם אחרים התחילו מצעד אחד
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            אני לא היחיד שעובר את זה. סיפורים אמיתיים מהשטח.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {STORIES.map((story, idx) => (
            <Reveal key={idx} delay={idx * 150} className="h-full">
              <div className="flex h-full flex-col rounded-3xl bg-slate-50 p-8 border border-slate-100">
                <Quote className="h-8 w-8 text-sky-200 mb-4" />
                <p className="text-[15px] leading-relaxed text-slate-700 italic">
                  "{story.quote}"
                </p>
                <div className="mt-auto pt-6">
                  <p className="text-[14px] font-semibold text-slate-900">— {story.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={400} className="mt-12 text-center">
          <a href="/stories" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
            קרא עוד סיפורים אישיים &larr;
          </a>
        </Reveal>
      </div>
    </section>
  );
}
