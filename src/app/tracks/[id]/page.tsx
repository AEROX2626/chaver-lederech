import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TRACKS_DB } from "@/data/tracks";
import NextSteps from "@/components/NextSteps";
import { CTA } from "@/data/types";
import TrackViewer from "@/components/TrackViewer";

export async function generateStaticParams() {
  return Object.keys(TRACKS_DB).map((id) => ({
    id: id,
  }));
}

export default async function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let id = resolvedParams.id;
  
  if (!TRACKS_DB[id] && TRACKS_DB[`track-${id}`]) {
    id = `track-${id}`;
  }

  const track = TRACKS_DB[id];

  if (!track) {
    return (
      <>
        <Header />
        <main className="py-24 bg-slate-50 min-h-screen text-center">
          <h1 className="t-display text-4xl text-slate-900">המסלול בבנייה</h1>
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
            כל המסלולים
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

          <div className="mt-16">
            <TrackViewer track={track as any} />
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
