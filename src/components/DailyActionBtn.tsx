"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function DailyActionBtn() {
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={() => setDone(true)}
      disabled={done}
      className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all ${
        done
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default"
          : "bg-sky-600 text-white hover:bg-sky-700 shadow-md"
      }`}
    >
      <Check className={`h-4 w-4 ${done ? "text-emerald-500" : ""}`} />
      {done ? "מעולה! עשיתי את זה להיום" : "עשיתי את זה ✓"}
    </button>
  );
}
