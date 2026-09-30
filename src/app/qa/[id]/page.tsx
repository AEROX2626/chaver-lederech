import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight, BookOpen, MessageCircle, Footprints, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { QA_DB } from "@/data/qa";
import { GUIDES_DB } from "@/data/guides";
import { TRACKS_DB } from "@/data/tracks";
import NextSteps from "@/components/NextSteps";
import { CTA } from "@/data/types";

export async function generateStaticParams() {
  return Object.keys(QA_DB).map((id) => ({
    id: id,
  }));
}

export default async function QADetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let id = resolvedParams.id;
  
  // If the user navigated to /qa/5 instead of /qa/q-5
  if (!QA_DB[id] && QA_DB[`q-${id}`]) {
    id = `q-${id}`;
  }

  // Try to find the question, otherwise default to a generic one
  const qa = QA_DB[id] || {
    title: "התוכן לא נמצא",
    cat: "כללי",
    parts: [{ type: "text", content: "התוכן לעמוד זה יעלה בקרוב. בינתיים, אתה מוזמן לבחון את שאר התכנים באתר." }]
  };

  // Mock connecting the graph for demo purposes:
  const isEmuna = qa.cat.includes("אמונה") || qa.cat.includes("סבל");
  const isShabbat = qa.cat.includes("שבת");
  const isTefila = qa.cat.includes("תפילה");

  const relatedGuides = isEmuna ? [GUIDES_DB["guide-a01"]] : isShabbat ? [GUIDES_DB["guide-s02"]] : isTefila ? [GUIDES_DB["guide-p02"]] : [GUIDES_DB["guide-c01"]];
  const relatedTracks = isEmuna ? [] : isShabbat ? [TRACKS_DB["track-shabbat"]] : [TRACKS_DB["track-01"], TRACKS_DB["track-02"]];

  const defaultNextSteps: CTA[] = [
    { type: "deepen", text: relatedGuides[0]?.title || "קרא עוד בנושא", link: `/guides/${relatedGuides[0]?.id || ""}` },
    { type: "start", text: relatedTracks[0]?.title || "בחר צעד קטן", link: `/tracks/${relatedTracks[0]?.id || ""}` },
    { type: "ask", text: "לא מצאת תשובה?", link: "/ask" }
  ];

  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/qa" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-10">
            <ArrowRight className="h-4 w-4" />
            חזרה לכל השאלות
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-sky-100/50 px-3 py-1 text-[12px] font-medium text-sky-700">
                  {qa.cat}
                </span>
                <h1 className="t-display mt-6 text-3xl text-slate-900 sm:text-4xl leading-tight">
                  {qa.title}
                </h1>
              </Reveal>

              <div className="mt-12 space-y-8">
                {qa.parts.map((part, idx) => (
                  <Reveal key={idx} delay={idx * 50}>
                    {part.type === "section" && (
                      <div className="mt-10 mb-4">
                        <h2 className="t-title text-2xl text-slate-900">{part.title}</h2>
                      </div>
                    )}
                    {part.type === "action" && (
                      <div className="mt-10 rounded-3xl bg-sky-50 border border-sky-100 p-8">
                        <h3 className="t-title text-xl text-sky-900 mb-3">{part.title}</h3>
                        <p className="text-[16px] leading-relaxed text-sky-800 whitespace-pre-line">{part.content}</p>
                      </div>
                    )}
                    {(part.type === "text" || part.type === "section") && part.content && (
                      <div className="prose prose-slate prose-lg max-w-none">
                        <p className="whitespace-pre-line text-slate-700 leading-loose">
                          {typeof part.content === "string" 
                            ? part.content.split("**").map((text, i) => i % 2 === 1 ? <strong key={i}>{text}</strong> : text)
                            : part.content}
                        </p>
                      </div>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Sidebar content graph */}
            <div className="lg:col-span-4">
              <Reveal delay={200}>
                <div className="sticky top-24 space-y-6">
                  
                  {relatedGuides.filter(Boolean).length > 0 && (
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <h3 className="t-title text-lg text-slate-900 flex items-center gap-2 mb-4">
                        <BookOpen className="h-5 w-5 text-sky-500" />
                        מדריכים מומלצים
                      </h3>
                      <ul className="space-y-3">
                        {relatedGuides.filter(Boolean).map(guide => (
                          <li key={guide.id}>
                            <Link href={`/guides/${guide.id}`} className="block group">
                              <span className="block text-[14.5px] font-medium text-slate-700 group-hover:text-sky-600 transition">
                                {guide.title}
                              </span>
                              <span className="block text-[13px] text-slate-500 line-clamp-1 mt-0.5">
                                {guide.description}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {relatedTracks.filter(Boolean).length > 0 && (
                    <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
                      <h3 className="t-title text-lg text-emerald-900 flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        מסלול מתאים
                      </h3>
                      <ul className="space-y-3">
                        {relatedTracks.filter(Boolean).map(track => (
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
