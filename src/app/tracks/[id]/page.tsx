import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight, BookOpen, MessageCircle, Footprints, CheckCircle } from "lucide-react";
import Link from "next/link";
import { TRACKS_DB } from "@/data/tracks";
import NextSteps from "@/components/NextSteps";
import { CTA } from "@/data/types";
import DailyActionBtn from "@/components/DailyActionBtn";

export async function generateStaticParams() {
  return Object.keys(TRACKS_DB).map((id) => ({
    id: id,
  }));
}

export default async function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const track = TRACKS_DB[id];

  if (!track) {
    return (
      <>
        <Header />
        <main className="py-24 bg-slate-50 min-h-screen text-center">
          <h1 className="t-display text-4xl text-slate-900">מסלול זה עדיין בבנייה</h1>
          <Link href="/tracks" className="text-sky-600 mt-4 inline-block">חזרה לכל המסלולים</Link>
        </main>
        <Footer />
      </>
    );
  }

  const defaultNextSteps: CTA[] = [
    { type: "ask", text: "יש לי שאלה על המסלול", link: "/ask" },
    { type: "help", text: "אני צריך תמיכה", link: "/help" }
  ];

  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/tracks" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-10">
            <ArrowRight className="h-4 w-4" />
            כל התהליכים
          </Link>

          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100/50 px-3 py-1 text-[12px] font-medium text-rose-700">
              מסלול של {track.durationDays} ימים
            </span>
            <h1 className="t-display mt-6 text-3xl text-slate-900 sm:text-5xl leading-tight">
              {track.title}
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
              {track.description}
            </p>
          </Reveal>

          <div className="mt-20 space-y-8 relative">
            <div className="absolute right-[27px] top-0 bottom-0 w-0.5 bg-slate-200"></div>

            {track.days.map((day, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className="relative flex items-start gap-6 group">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-slate-50 bg-rose-500 text-white shadow-lg transition-transform group-hover:scale-110">
                    <span className="font-bold">{day.dayNumber}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                      <h3 className="t-title text-2xl text-slate-900 mb-4">{day.title}</h3>
                      <p className="text-[15.5px] leading-relaxed text-slate-600 mb-8">{day.content}</p>
                      
                      <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 mb-6">
                        <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-2">הצעד להיום:</span>
                        <p className="text-slate-800 font-medium">{day.action}</p>
                      </div>

                      <div className="max-w-xs">
                        <DailyActionBtn />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <NextSteps steps={defaultNextSteps} />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
