"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Sunset, Flame } from "lucide-react";

export default function DailyZmanim() {
  const [hebrewDate, setHebrewDate] = useState<string>("טוען...");
  const [parasha, setParasha] = useState<string>("");
  const [sunset, setSunset] = useState<string>("");
  const [candles, setCandles] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchZmanim() {
      try {
        // Fetch Hebrew Events for Israel
        const hebEventsRes = await fetch("https://www.hebcal.com/converter?cfg=json&date=now&g=on&m=50&lg=h");
        const hebEventsData = await hebEventsRes.json();
        
        if (hebEventsData.hebrew) {
          setHebrewDate(hebEventsData.hebrew);
        }

        if (hebEventsData.events) {
          const hebParasha = hebEventsData.events.find((e: string) => e.includes("פרשת") || e.includes("חג"));
          if (hebParasha) setParasha(hebParasha);
        }

        // Fetch general Zmanim for Jerusalem
        const zmanimRes = await fetch("https://www.hebcal.com/zmanim?cfg=json&geonameid=281184");
        const zmanimData = await zmanimRes.json();
        
        if (zmanimData.times && zmanimData.times.sunset) {
          const dateObj = new Date(zmanimData.times.sunset);
          setSunset(dateObj.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }));
        }

        // If today is Thursday or Friday, fetch Shabbat times
        const dayOfWeek = new Date().getDay();
        if (dayOfWeek === 4 || dayOfWeek === 5) { // 4 = Thursday, 5 = Friday
          const shabbatRes = await fetch("https://www.hebcal.com/shabbat?cfg=json&geonameid=281184&M=on&lg=h");
          const shabbatData = await shabbatRes.json();
          
          if (shabbatData.items) {
            const candleItem = shabbatData.items.find((item: any) => item.category === "candles");
            if (candleItem && candleItem.date) {
              const candleDate = new Date(candleItem.date);
              setCandles(candleDate.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }));
            }
          }
        }

        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to fetch Zmanim", err);
      }
    }
    fetchZmanim();
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="mx-auto max-w-fit mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-full border border-slate-200/60 bg-white/50 px-5 py-2 shadow-sm backdrop-blur-md">
        
        <div className="flex items-center gap-2 text-[13px] sm:text-sm font-medium text-slate-700">
          <CalendarIcon className="h-4 w-4 text-sky-600" />
          <span>{hebrewDate}</span>
          {parasha && <span className="text-slate-300 hidden sm:inline">•</span>}
          {parasha && <span className="font-bold text-sky-800">{parasha}</span>}
        </div>
        
        {sunset && !candles && (
          <>
            <div className="hidden sm:block h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-[13px] sm:text-sm font-medium text-slate-700">
              <Sunset className="h-4 w-4 text-orange-500" />
              <span>שקיעה: {sunset}</span>
            </div>
          </>
        )}

        {candles && (
          <>
            <div className="hidden sm:block h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-[13px] sm:text-sm font-bold text-slate-800">
              <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>כניסת שבת: {candles}</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
