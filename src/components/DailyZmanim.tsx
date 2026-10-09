"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Sunset, Flame } from "lucide-react";
import { CitySelector } from "./CitySelector";

// Removed CITIES array from here as it's now in CitySelector

export default function DailyZmanim() {
  const [hebrewDate, setHebrewDate] = useState<string>("טוען...");
  const [parasha, setParasha] = useState<string>("");
  const [sunset, setSunset] = useState<string>("");
  const [candles, setCandles] = useState<string>("");
  
  // We now store both ID and Name
  const [selectedCity, setSelectedCity] = useState({ id: "281184", name: "ירושלים" });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved city from local storage
  useEffect(() => {
    const saved = localStorage.getItem("zmanim-city-obj");
    if (saved) {
      try {
        setSelectedCity(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  const handleCityChange = (cityId: string, cityName: string) => {
    const newCity = { id: cityId, name: cityName };
    setSelectedCity(newCity);
    localStorage.setItem("zmanim-city-obj", JSON.stringify(newCity));
  };

  useEffect(() => {
    async function fetchZmanim() {
      try {
        const today = new Date();
        const ymd = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

        // Fetch Hebrew Date
        const hebEventsRes = await fetch(`https://www.hebcal.com/converter?cfg=json&date=${ymd}&g=on&lg=h`);
        const hebEventsData = await hebEventsRes.json();
        
        if (hebEventsData.hebrew) {
          setHebrewDate(hebEventsData.hebrew);
        }

        if (hebEventsData.events) {
          const hebParasha = hebEventsData.events.find((e: string) => e.includes("פרשת") || e.includes("חג") || e.includes("שבת"));
          if (hebParasha) setParasha(hebParasha);
        }

        // Fetch general Zmanim
        const zmanimRes = await fetch(`https://www.hebcal.com/zmanim?cfg=json&geonameid=${selectedCity.id}&date=${ymd}`);
        const zmanimData = await zmanimRes.json();
        
        if (zmanimData.times && zmanimData.times.sunset) {
          const dateObj = new Date(zmanimData.times.sunset);
          setSunset(dateObj.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }));
        }

        // If today is Thursday or Friday, fetch Shabbat times
        const dayOfWeek = today.getDay();
        if (dayOfWeek === 4 || dayOfWeek === 5) { 
          const shabbatRes = await fetch(`https://www.hebcal.com/shabbat?cfg=json&geonameid=${selectedCity.id}&M=on&lg=h`);
          const shabbatData = await shabbatRes.json();
          
          if (shabbatData.items) {
            const candleItem = shabbatData.items.find((item: any) => item.category === "candles");
            if (candleItem && candleItem.date) {
              const candleDate = new Date(candleItem.date);
              setCandles(candleDate.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }));
            }
          }
        } else {
          setCandles(""); // Clear if it's not Thu/Fri (e.g. if city changed on another day)
        }

        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to fetch Zmanim", err);
      }
    }
    fetchZmanim();
  }, [selectedCity]); // Re-fetch if city changes

  // Always render something to prevent hydration mismatch layout shifts, 
  // but keep it transparent until loaded
  return (
    <div className={`relative z-50 mx-auto max-w-fit mb-8 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-3xl sm:rounded-full border border-slate-200/60 bg-white/60 px-5 py-2.5 shadow-sm backdrop-blur-md">
        
        <div className="flex items-center gap-2 text-[13.5px] font-medium text-slate-700">
          <CalendarIcon className="h-4 w-4 text-sky-600" />
          <span>{hebrewDate}</span>
          {parasha && <span className="text-slate-300 hidden sm:inline">•</span>}
          {parasha && <span className="font-bold text-sky-800">{parasha}</span>}
        </div>
        
        <div className="hidden sm:block h-4 w-px bg-slate-200"></div>
        
        <div className="flex items-center gap-4 text-[13.5px] font-medium text-slate-700 bg-slate-100/50 rounded-full px-2 py-1">
          <CitySelector selectedCity={selectedCity} onChange={handleCityChange} />

          <div className="h-3 w-px bg-slate-300"></div>

          {candles ? (
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>כניסת שבת: {candles}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Sunset className="h-4 w-4 text-orange-500" />
              <span>שקיעה: {sunset}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
