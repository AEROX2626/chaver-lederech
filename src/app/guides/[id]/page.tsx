import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight, BookOpen, MessageCircle, Footprints, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { GUIDES_DB } from "@/data/guides";
import { TRACKS_DB } from "@/data/tracks";
import NextSteps from "@/components/NextSteps";
import { CTA } from "@/data/types";

export async function generateStaticParams() {
  return Object.keys(GUIDES_DB).map((id) => ({
    id: id,
  }));
}

export default async function GuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let id = resolvedParams.id;
  
  if (!GUIDES_DB[id] && GUIDES_DB[`guide-${id}`]) {
    id = `guide-${id}`;
  }

  const guide = GUIDES_DB[id];

  if (!guide) {
    return (
      <>
        <Header />
        <main className="py-24 bg-slate-50 min-h-screen text-center">
          <h1 className="t-display text-4xl text-slate-900">מדריך זה עדיין בעבודה</h1>
          <Link href="/start" className="text-sky-600 mt-4 inline-block">חזרה להתחלה</Link>
        </main>
        <Footer />
      </>
    );
  }

  const relatedTracks = guide.relatedTracks.map(tid => TRACKS_DB[tid]).filter(Boolean);
  
  const defaultNextSteps: CTA[] = [];
  
  if (guide.relatedGuides && guide.relatedGuides.length > 0) {
    const nextGuide = GUIDES_DB[guide.relatedGuides[0]];
    if (nextGuide) {
      defaultNextSteps.push({ type: 'learn', title: 'רוצה להבין יותר?', text: nextGuide.title, link: '/guides/' + nextGuide.id });
    }
  }

  if (relatedTracks.length > 0) {
    defaultNextSteps.push({ type: 'start', title: 'רוצה להתחיל?', text: relatedTracks[0].title, link: '/tracks/' + relatedTracks[0].id });
  }

  defaultNextSteps.push({ type: 'help', title: 'רוצה לדבר?', text: 'עזרה אישית', link: '/help' });
  defaultNextSteps.push({ type: 'ask', title: 'יש לך שאלה אחרת?', text: 'שאל שאלה', link: '/ask' });

  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/start" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-10">
            <ArrowRight className="h-4 w-4" />
            כל המדריכים
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100/50 px-3 py-1 text-[12px] font-medium text-indigo-700">
                  {guide.category}
                </span>
                <h1 className="t-display mt-6 text-3xl text-slate-900 sm:text-5xl leading-tight">
                  {guide.title}
                </h1>
                <p className="mt-6 text-xl text-slate-600 font-medium">
                  {guide.intro}
                </p>
              </Reveal>

              <div className="mt-16 space-y-12">
                {guide.sections.map((section, idx) => (
                  <Reveal key={idx} delay={idx * 50}>
                    <div className="prose prose-slate prose-lg max-w-none">
                      <h2 className="t-title text-2xl text-slate-900">{section.title}</h2>
                      <p className="whitespace-pre-line text-slate-700 leading-loose mt-4">
                        {section.content}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={200}>
                <div className="sticky top-24 space-y-6">
                  {relatedTracks.length > 0 && (
                    <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
                      <h3 className="t-title text-lg text-emerald-900 flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        מסלול מומלץ להמשך
                      </h3>
                      <ul className="space-y-3">
                        {relatedTracks.map(track => (
                          <li key={track.id}>
                            <Link href={`/tracks/${track.id}`} className="block group">
                              <span className="block text-[14.5px] font-medium text-emerald-800 group-hover:text-emerald-600 transition">
                                {track.title}
                              </span>
                              <span className="block text-[13px] text-emerald-600/80 mt-1 font-medium bg-emerald-100/50 inline-block px-2 py-0.5 rounded-md">
                                תהליך של {track.durationDays} ימים
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
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
