import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Quote, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "סיפורים | מתחזקים",
  description: "לפעמים צריך לראות אדם אחר שהיה מבולבל, חזר, נפל, והצליח להמשיך.",
};

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h1 className="t-display text-4xl text-slate-900 sm:text-5xl">גם אחרים היו בדיוק במקום הזה.</h1>
            <div className="mt-6 text-lg text-slate-600 leading-relaxed space-y-3">
              <p>לפעמים מאמר לא מספיק.</p>
              <p>לפעמים אתה צריך לראות אדם אחר שהיה מבולבל, שאל שאלות, התרחק, חזר, נפל, התחיל שוב — והצליח להמשיך.</p>
            </div>
          </Reveal>

          <div className="mt-20 max-w-3xl mx-auto">
            <Reveal delay={200}>
              <article className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 relative overflow-hidden">
                <Quote className="absolute -top-4 -left-4 h-24 w-24 text-slate-50 rotate-180" />
                
                <div className="relative z-10">
                  <h2 className="t-title text-2xl text-slate-900 leading-tight">
                    "חשבתי שאני צריך לשנות את כל החיים שלי. בסוף התחלתי מחמש דקות."
                  </h2>
                  
                  <div className="mt-8 prose prose-slate prose-lg">
                    <p className="text-slate-600 leading-loose">
                      תמיד חשבתי שחזרה בתשובה או התחזקות זה תהליך של "הכל או כלום". ראיתי אנשים סביבי שביום אחד החליפו מלתחה, הפסיקו לצאת בימי שישי, התחילו לדבר בשפה אחרת לגמרי. זה הפחיד אותי.
                    </p>
                    <p className="text-slate-600 leading-loose">
                      הרגשתי שיש לי חלל פנימי שדורש התייחסות, אבל לא רציתי למחוק את מי שהייתי עד עכשיו. היו לי שאלות, אבל לא העזתי לשאול אותן כי פחדתי מהתשובות שדורשות שינוי דרסטי.
                    </p>
                    <p className="text-slate-600 leading-loose">
                      הרגע ששינה משהו היה כשמישהו פשוט אמר לי: "אתה לא צריך לעשות כלום מחר בבוקר. רק תלמד חמש דקות ביום. זהו."
                    </p>
                    <p className="text-slate-600 leading-loose font-medium text-slate-800">
                      היום, אני נמצא במקום הרבה יותר שלם. הבנתי שהאמונה היא מסע הדרגתי, לא קפיצת ראש לבריכה ריקה.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={300} className="mt-16 text-center">
              <h3 className="t-title text-xl text-slate-900">גם אתה עובר משהו דומה?</h3>
              <p className="mt-2 text-slate-500">נשמח להקשיב ולעזור למצוא את הצעד שמתאים לך.</p>
              <div className="mt-6">
                <Link href="/ask" className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[15px] font-semibold">
                  <MessageCircle className="h-4 w-4" />
                  שאל שאלה
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
