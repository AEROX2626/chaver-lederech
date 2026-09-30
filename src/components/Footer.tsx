import { Sun, MessageCircle, Mail, Lock, Shield, Trash2 } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white pt-16">
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900">
                <Sun className="h-4 w-4 text-white" />
              </span>
              <span className="text-base font-bold tracking-tight text-slate-900">
                מתחזקים
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-slate-500">
              מיזם דיגיטלי להנגשת היהדות לציבור החילוני, בגובה העיניים. צעד קטן
              אחד בכל פעם — בקצב שלך, בלי לחץ ובלי שיפוטיות.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://wa.me/972500000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="וואטסאפ"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="אינסטגרם"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="מייל"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              ניווט
            </h3>
            <ul className="mt-5 space-y-3 text-[13.5px]">
              <li><a href="/about" className="text-slate-600 transition hover:text-slate-900">אודות מתחזקים</a></li>
              <li><a href="/contact" className="text-slate-600 transition hover:text-slate-900">צור קשר</a></li>
              <li><a href="/ask" className="text-slate-600 transition hover:text-slate-900">שאל שאלה</a></li>
              <li><a href="/qa" className="text-slate-600 transition hover:text-slate-900">שאלות ותשובות</a></li>
              <li><a href="/tracks" className="text-slate-600 transition hover:text-slate-900">מסלולים</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              משפטי
            </h3>
            <ul className="mt-5 space-y-3 text-[13.5px]">
              <li><a href="/privacy" className="text-slate-600 transition hover:text-slate-900">פרטיות</a></li>
              <li><a href="/accessibility" className="text-slate-600 transition hover:text-slate-900">נגישות</a></li>
              <li><a href="/terms" className="text-slate-600 transition hover:text-slate-900">תנאי שימוש</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-[12px] text-slate-400">
            © {year} מתחזקים. כל הזכויות שמורות.
          </p>
          <p className="text-center text-[12px] font-medium text-slate-500 sm:text-start">
            מתחזקים — כל יום עוד צעד אחד.
          </p>
        </div>
      </div>
    </footer>
  );
}
