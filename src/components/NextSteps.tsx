import Link from "next/link";
import { BookOpen, Footprints, MessageCircle, HelpCircle } from "lucide-react";
import { CTA } from "@/data/types";

export default function NextSteps({ steps }: { steps: CTA[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-20 border-t border-slate-200 pt-16">
      <h2 className="t-title text-2xl text-slate-900 text-center">לאן ממשיכים מכאן?</h2>
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => {
          let Icon = BookOpen;
          let title = step.title || "להעמיק יותר";
          let color = "text-sky-500";
          let borderHover = "hover:border-sky-300";

          if (step.type === "start") {
            Icon = Footprints;
            title = step.title || "להתחיל לעשות";
            color = "text-emerald-500";
            borderHover = "hover:border-emerald-300";
          } else if (step.type === "help") {
            Icon = MessageCircle;
            title = step.title || "לקבל עזרה";
            color = "text-indigo-500";
            borderHover = "hover:border-indigo-300";
          } else if (step.type === "ask") {
            Icon = HelpCircle;
            title = step.title || "לשאול שאלה";
            color = "text-rose-500";
            borderHover = "hover:border-rose-300";
          }

          return (
            <Link 
              key={idx} 
              href={step.link} 
              className={`flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 bg-white transition ${borderHover} hover:shadow-lg`}
            >
              <Icon className={`h-6 w-6 mb-3 ${color}`} />
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-[13px] text-slate-500">{step.text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
