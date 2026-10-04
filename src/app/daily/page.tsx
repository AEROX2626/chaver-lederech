import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Sun, Heart, MessageCircleQuestion, Footprints, ArrowLeft } from "lucide-react";
import Link from "next/link";
import DailyActionBtn from "@/components/DailyActionBtn";

export const metadata = {
  title: "החיזוק היומי | מתחזקים",
  description: "צעד קטן, חיזוק קצר ושאלה אחת למחשבה להיום.",
};

export default function DailyPage() {
  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <Link href="/start" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-10">
            <ArrowLeft className="h-4 w-4" />
            חזרה
          </Link>

          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-4 py-1.5 text-sm font-semibold text-amber-800 mb-6">
              <Sun className="h-4 w-4" />
              היום שלך
            </div>
            <h1 className="t-display text-4xl text-slate-900 sm:text-5xl">קצת אור להיום.</h1>
            <p className="mt-4 text-lg text-slate-600">כל יום עוד צעד אחד. הנה מה שיכול לחזק אותך עכשיו.</p>
          </Reveal>

          <div className="space-y-8">
            {/* Daily Booster */}
            <Reveal delay={100}>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Heart className="h-40 w-40" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-5 w-5 text-rose-500" />
                    <h2 className="text-xl font-bold text-slate-900">חיזוק יומי</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-slate-700 font-medium">
                    "אמונה לא מתחילה כשהכל מסתדר. היא מתחילה דווקא בנקודה שבה השכל נעצר, ושם הלב פותח פתח."
                  </p>
                  <div className="mt-6">
                    <button className="text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1">
                      שמור חיזוק זה
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Daily Action */}
            <Reveal delay={200}>
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/30 p-8 sm:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Footprints className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-slate-900">הצעד שלך להיום</h2>
                </div>
                <h3 className="text-lg text-slate-800 mb-4">
                  עצור לחצי דקה ואמור תודה על משהו אחד.
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8 text-sm">
                  זה לא חייב להיות משהו גדול. אפשר להגיד תודה על הקפה של הבוקר, או על זה שקמנו בריאים. תודה פותחת את הלב.
                </p>
                <DailyActionBtn />
              </div>
            </Reveal>

            {/* Daily Question */}
            <Reveal delay={300}>
              <div className="rounded-3xl border border-sky-200 bg-sky-50/30 p-8 sm:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircleQuestion className="h-5 w-5 text-sky-600" />
                  <h2 className="text-xl font-bold text-slate-900">שאלה למחשבה</h2>
                </div>
                <p className="text-lg leading-relaxed text-slate-800 font-medium mb-6">
                  איפה אני מרגיש שהכי קשה לי לעצור את המרוץ היומיומי?
                </p>
                <Link href="/guides/guide-p01" className="inline-flex justify-center rounded-xl py-3 px-6 text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
                  למדריך קשור: לעצור הכל
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
