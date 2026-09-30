import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Coffee, Sunrise, HandHeart, MessageSquareHeart, Smile, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import DailyActionBtn from "@/components/DailyActionBtn";

export const metadata = {
  title: "ביום־יום | מתחזקים",
  description: "היהדות מתחילה דווקא בדברים הקטנים.",
};

const CATEGORIES = [
  { title: "תפילה", desc: "איך מתחילים להתפלל? מהי תפילת שחרית? מה אומרים?", icon: Sunrise },
  { title: "ברכות", desc: "מהי ברכה? מדריכי ברכות לפי סוגי מאכלים.", icon: Coffee },
  { title: "שבת", desc: "מדריך שבת למתחילים. קידוש, נרות, ומה עושים בשבת.", icon: Clock },
  { title: "חסד וצדקה", desc: "איך מכניסים יותר טוב לחיים ולמי נותנים?", icon: HandHeart },
  { title: "מידות", desc: "סבלנות, כעס, הכרת הטוב, ענווה ושמירת הלשון.", icon: MessageSquareHeart },
  { title: "כיבוד הורים", desc: "מצווה שמתרגמת ישירות ליחסים בחיים.", icon: Smile },
];

export default function DailyPage() {
  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              <Reveal>
                <h1 className="t-display text-4xl text-slate-900 sm:text-5xl">היהדות מתחילה דווקא בדברים הקטנים.</h1>
                <div className="mt-6 text-lg text-slate-600 leading-relaxed space-y-3 max-w-2xl">
                  <p>התחזקות היא לא רק שיעורים גדולים ורגעים מרגשים. היא נמצאת ביום־יום:</p>
                  <p>במה שאתה אומר, במה שאתה עושה, ביחס שלך לאנשים, בדרך שבה אתה מתחיל את הבוקר, במה שאתה עושה כשאף אחד לא רואה.</p>
                </div>
              </Reveal>

              <Reveal delay={200} className="mt-16 grid gap-6 sm:grid-cols-2">
                {CATEGORIES.map((cat, idx) => (
                  <a key={idx} href="#" className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-sky-300 hover:shadow-md">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-100 transition-colors">
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="t-title text-lg text-slate-900">{cat.title}</h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-slate-500">
                        {cat.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </Reveal>
            </div>

            {/* Sidebar with Daily Action */}
            <div className="lg:col-span-4">
              <Reveal delay={300}>
                <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[12px] font-semibold text-amber-700">
                    <SunMoon className="h-3.5 w-3.5" />
                    החיזוק היומי
                  </div>
                  
                  <h3 className="t-title mt-6 text-2xl text-slate-900">היום לא צריך להיות מושלם</h3>
                  <div className="mt-4 space-y-3 text-[15px] text-slate-600 leading-relaxed">
                    <p>לא כל יום נראה כמו שתכננת. זה לא אומר שהיום הזה אבוד.</p>
                    <p>לפעמים הצעד שלך היום הוא פשוט לא לוותר.</p>
                  </div>
                  
                  <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-100 p-5">
                    <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-2">הצעד שלי להיום:</span>
                    <p className="text-slate-800 font-medium">לעשות דבר אחד טוב בכוונה.</p>
                  </div>

                  <div className="mt-6">
                    <DailyActionBtn />
                  </div>
                </div>
              </Reveal>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Temporary icon fix since SunMoon is imported above but maybe not? Wait, I will just use Sun.
function SunMoon(props: any) {
  return <Sunrise {...props} />;
}
