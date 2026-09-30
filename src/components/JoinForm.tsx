"use client";

import { useState } from "react";
import { HeartHandshake, Check, Handshake } from "lucide-react";
import Reveal from "./Reveal";

export default function JoinForm() {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fname = formData.get("fname") as string;
    const phone = formData.get("phone") as string;
    const interest = formData.get("interest") as string;

    if (!fname || !phone || !interest) {
      setStatus("error");
      setMsg("רק עוד רגע — נשאר למלא את כל השדות 🙂");
      return;
    }

    if (!/^[0-9+\-\s()]{7,}$/.test(phone)) {
      setStatus("error");
      setMsg("מספר הטלפון לא נראה תקין — אפשר לבדוק שוב?");
      return;
    }

    setStatus("success");
    setMsg(`תודה ${fname}! קיבלנו את הפרטים ונחזור אליך בוואטסאפ בהקדם 🤝`);
    e.currentTarget.reset();
  };

  return (
    <section id="join" className="scroll-mt-24 pb-24 pt-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-14">
          {/* decorative grid + orbs */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(255 255 255 / 1) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          ></div>
          <div
            className="orb -right-32 -top-32 h-[400px] w-[400px] bg-sky-500/40"
            style={{ opacity: 0.4 }}
          ></div>
          <div
            className="orb -bottom-20 -left-20 h-[300px] w-[300px] bg-indigo-500/30"
            style={{ opacity: 0.4 }}
          ></div>

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11.5px] font-medium text-white/80 backdrop-blur">
                <HeartHandshake className="h-3 w-3" />
                מתחזקים
              </span>

              <h2 className="t-display mt-6 text-3xl text-white sm:text-5xl">
                לא חייבים
                <span className="mt-1 block bg-gradient-to-l from-sky-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent">
                  לצעוד לבד.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65 sm:text-base">
                נשמח להתאים לכם מלווה אישי — מישהו בגובה העיניים, בסבלנות ובכבוד,
                שיענה לשאלות וילך איתכם בקצב שלכם.
              </p>

              <ul className="mt-8 space-y-3 text-[14px] text-white/80">
                <li className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-sky-500/20 text-sky-300">
                    <Check className="h-3 w-3" />
                  </span>
                  שיחה ראשונה ללא התחייבות
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-sky-500/20 text-sky-300">
                    <Check className="h-3 w-3" />
                  </span>
                  דיסקרטיות מלאה — אתם בוחרים מה לספר
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-sky-500/20 text-sky-300">
                    <Check className="h-3 w-3" />
                  </span>
                  זמינות בוואטסאפ, בשעות שנוחות לכם
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
              <h3 className="t-title text-lg text-slate-900">
                מלאו פרטים ונחזור אליכם
              </h3>
              <p className="mt-1 text-[13px] text-slate-500">לוקח פחות מדקה.</p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="fname"
                    className="mb-1.5 block text-[12.5px] font-semibold text-slate-700"
                  >
                    שם פרטי
                  </label>
                  <input
                    id="fname"
                    name="fname"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="איך לקרוא לך?"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-[12.5px] font-semibold text-slate-700"
                  >
                    טלפון (לוואטסאפ)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="050-0000000"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="interest"
                    className="mb-1.5 block text-[12.5px] font-semibold text-slate-700"
                  >
                    תחום עניין
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  >
                    <option value="">בחרו תחום...</option>
                    <option value="shabbat">השקט של השבת</option>
                    <option value="mitzvot">מצוות מעשיות</option>
                    <option value="philosophy">פילוסופיה ומחשבה</option>
                    <option value="family">בית ומשפחה</option>
                    <option value="general">עדיין לא בטוח — סקרנות כללית</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-accent mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
                >
                  <Handshake className="h-4 w-4" />
                  שלח פרטים
                </button>

                {status !== "idle" && (
                  <p
                    className={`mt-3 rounded-xl px-4 py-3 text-center text-[13px] font-medium ${
                      status === "error"
                        ? "bg-rose-50 text-rose-600"
                        : "bg-sky-50 text-sky-700"
                    }`}
                  >
                    {msg}
                  </p>
                )}

                <p className="pt-1 text-center text-[11px] leading-relaxed text-slate-400">
                  הפרטים נשמרים בהצפנה ומשמשים ליצירת קשר בלבד.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
