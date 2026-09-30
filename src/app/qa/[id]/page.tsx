import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight, BookOpen, MessageCircle, Footprints } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Hardcoded QA data based on PRD
const QA_DB: Record<string, { title: string, cat: string, parts: { type: string, title?: string, content: string | React.ReactNode }[] }> = {
  "why-bad-things-happen": {
    title: "אם ה׳ טוב, למה קורים דברים רעים?",
    cat: "סבל וקושי",
    parts: [
      {
        type: "text",
        content: "זו אחת השאלות הגדולות והכואבות ביותר באמונה.\nכאשר אדם חווה כאב, אובדן, מחלה, אכזבה או עוול, השאלה \"למה?\" היא טבעית.\nאין תשובה אחת פשוטה שמתאימה לכל סיפור."
      },
      {
        type: "text",
        content: "המסורת היהודית עצמה אינה מתעלמת מהשאלה הזאת. ספר איוב, תהילים וספרי הנביאים מלאים בזעקה, בשאלות ובחיפוש.\n\nחשוב להבדיל בין שני דברים:\n\n**לא לדעת למה משהו קרה**\nלבין\n**להחליט שאין משמעות לחיים או שאין מקום לאמונה.**\n\nאמונה אינה מחייבת אדם להעמיד פנים שהוא מבין כל דבר שקורה לו."
      },
      {
        type: "section",
        title: "ומה אפשר לעשות עם השאלה?",
        content: "לא חייבים לפתור אותה ביום אחד.\nאפשר ללמוד. אפשר לשאול. אפשר לדבר. אפשר להתפלל גם מתוך כאב. ואפשר להמשיך לחפש משמעות גם כאשר עדיין אין תשובה מלאה."
      }
    ]
  },
  "unanswered-prayers": {
    title: "למה התפילה שלי לא נענית?",
    cat: "תפילה",
    parts: [
      {
        type: "text",
        content: "כמעט כל אדם שהתפלל באמת שאל את עצמו את זה בשלב מסוים.\nאנחנו מתפללים למשהו שאנחנו רוצים מאוד — ואז המציאות לא משתנה.\nהתגובה הטבעית היא: אז למה להתפלל?"
      },
      {
        type: "text",
        content: "היהדות מציגה תפילה לא רק כבקשה לקבל משהו, אלא גם כקשר. רגע שבו אדם עוצר, מדבר, מבקש, מודה, משתף ומכוון את הלב.\nתפילה אינה הבטחה שכל דבר שנבקש יקרה בדיוק כפי שרצינו. אבל זה לא הופך אותה לחסרת משמעות."
      },
      {
        type: "section",
        title: "מה אפשר לעשות?",
        content: "במקום להתפלל רק \"תן לי\", אפשר גם: להודות, לשתף, לבקש כוח, לבקש הכוונה, לבקש שהדרך תהיה טובה."
      },
      {
        type: "action",
        title: "צעד קטן",
        content: "בחר היום דקה אחת. שב בשקט. ודבר עם ה׳ במילים שלך."
      }
    ]
  },
  "starting-over": {
    title: "נפלתי שוב. איך מתחילים מחדש?",
    cat: "התמודדות ונפילות",
    parts: [
      {
        type: "text",
        content: "התחזקות שלא מאפשרת נפילות היא לא התחזקות אמיתית.\nהאדם נופל. הוא מתבלבל. הוא חוזר להרגלים ישנים."
      },
      {
        type: "text",
        content: "השאלה החשובה היא לא:\n\"נפלתי?\"\n\nאלא:\n**\"מה אני עושה עכשיו?\"**"
      },
      {
        type: "text",
        content: "אל תחכה ליום ראשון. אל תחכה לראש השנה. אל תחכה שתהיה לך מוטיבציה.\nאפשר להתחיל מחדש עכשיו."
      },
      {
        type: "section",
        title: "כלל פשוט:",
        content: "**לא מתחילים מחדש כי לא הצלחנו. מתחילים מחדש בדיוק בגלל שלא הצלחנו.**"
      }
    ]
  }
};

export default async function QADetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // Try to find the question, otherwise default to a generic one
  const qa = QA_DB[id] || {
    title: "איך מתחילים לעשות צעד קטן?",
    cat: "כללי",
    parts: [{ type: "text", content: "התוכן לעמוד זה יעלה בקרוב. בינתיים, אתה מוזמן לבחון את שאר התכנים באתר." }]
  };

  return (
    <>
      <Header />
      <main className="py-24 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/qa" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-10">
            <ArrowRight className="h-4 w-4" />
            חזרה לכל השאלות
          </Link>

          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100/50 px-3 py-1 text-[12px] font-medium text-sky-700">
              {qa.cat}
            </span>
            <h1 className="t-display mt-6 text-3xl text-slate-900 sm:text-5xl leading-tight">
              {qa.title}
            </h1>
          </Reveal>

          <div className="mt-12 space-y-8">
            {qa.parts.map((part, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                {part.type === "section" && (
                  <div className="mt-10 mb-4">
                    <h2 className="t-title text-2xl text-slate-900">{part.title}</h2>
                  </div>
                )}
                {part.type === "action" && (
                  <div className="mt-10 rounded-2xl bg-sky-50 border border-sky-100 p-6 sm:p-8">
                    <h3 className="t-title text-xl text-sky-900 mb-3">{part.title}</h3>
                    <p className="text-[15px] leading-relaxed text-sky-800 whitespace-pre-line">{part.content}</p>
                  </div>
                )}
                {(part.type === "text" || part.type === "section") && part.content && (
                  <div className="prose prose-slate prose-lg">
                    {/* Super simple markdown parser for bolding */}
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

          <Reveal delay={400} className="mt-20 border-t border-slate-200 pt-16">
            <h2 className="t-title text-2xl text-slate-900 text-center">לאן ממשיכים מכאן?</h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <Link href="/qa" className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-lg transition">
                <BookOpen className="h-6 w-6 text-sky-500 mb-3" />
                <h3 className="font-semibold text-slate-900">אני רוצה להבין יותר</h3>
                <p className="mt-1 text-[13px] text-slate-500">קרא עוד שאלות</p>
              </Link>
              <Link href="/tracks" className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-lg transition">
                <Footprints className="h-6 w-6 text-emerald-500 mb-3" />
                <h3 className="font-semibold text-slate-900">אני רוצה להתחיל לעשות</h3>
                <p className="mt-1 text-[13px] text-slate-500">בחר מסלול התחזקות</p>
              </Link>
              <Link href="/help" className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-lg transition">
                <MessageCircle className="h-6 w-6 text-indigo-500 mb-3" />
                <h3 className="font-semibold text-slate-900">אני רוצה לדבר עם מישהו</h3>
                <p className="mt-1 text-[13px] text-slate-500">עזרה אישית ודיסקרטית</p>
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
