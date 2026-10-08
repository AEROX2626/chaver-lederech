import { Metadata } from "next";
import { MessageCircle, ShieldCheck, Clock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "שאל את הרב | מתחזקים",
  description: "יש לך שאלה בהלכה, באמונה או בחיים? שלח הודעה ורב יענה לך בוואטסאפ.",
};

export default function AskRabbiPage() {
  // Replace this with the actual number provided by the user
  const whatsappNumber = "972737860860"; 
  const message = encodeURIComponent("שלום, הגעתי מאתר 'מתחזקים' ויש לי שאלה:");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center rounded-2xl bg-emerald-100 p-4 mb-6">
            <MessageCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="t-title text-4xl sm:text-5xl text-slate-900 mb-6">שאל את הרב</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            לפעמים גוגל או אינטרנט לא מספיקים. אם יש לך שאלה בהלכה, התלבטות אישית באמונה, 
            או שסתם אתה צריך עצה טובה - הרבנים שלנו כאן בשבילך.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-10">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">דיסקרטי לחלוטין</h3>
              <p className="text-sm text-slate-500">השיחה אישית מול הרב בלבד ואינה מפורסמת בשום מקום.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 mb-4">
                <MessageCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">כל נושא</h3>
              <p className="text-sm text-slate-500">הלכה, אמונה, זוגיות, מועדים, או אפילו קושי בחיים.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 mb-4">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">מענה מהיר</h3>
              <p className="text-sm text-slate-500">משתדלים לענות בהקדם האפשרי, ישירות לווטסאפ שלך.</p>
            </div>
          </div>

          <div className="text-center border-t border-slate-100 pt-10">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="h-6 w-6" />
              מעבר לשיחה בווטסאפ
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">
              הקישור יפתח את אפליקציית WhatsApp או WhatsApp Web
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
