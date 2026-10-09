import { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';

interface City {
  id: string;
  name: string;
}

interface CitySelectorProps {
  selectedCity: City;
  onChange: (id: string, name: string) => void;
}

export function CitySelector({ selectedCity, onChange }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setResults([]);
      return;
    }

    if (search.trim().length === 0) {
      setResults([
        { id: "281184", name: "ירושלים" },
        { id: "293397", name: "תל אביב" },
        { id: "294801", name: "חיפה" },
        { id: "295530", name: "באר שבע" },
        { id: "282926", name: "מודיעין" },
        { id: "294071", name: "נתניה" },
        { id: "293703", name: "ראשון לציון" },
        { id: "295224", name: "בית שמש" },
        { id: "295277", name: "אילת" }
      ]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://www.hebcal.com/complete?q=${encodeURIComponent(search)}`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const israelCities = data.filter(d => d.cc === 'IL').map(d => ({
            id: String(d.id),
            name: d.name || d.asciiname || d.value.split(',')[0]
          }));
          setResults(israelCities);
        } else {
          setResults([]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, isOpen]);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button 
        onClick={() => { setIsOpen(!isOpen); setSearch(""); }}
        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-medium cursor-pointer"
      >
        <MapPin className="h-3.5 w-3.5" />
        <span className="min-w-[60px] text-right">{selectedCity.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transform origin-top-right">
          <div className="p-2 border-b border-slate-100 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text" 
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חפש ישוב או עיר..."
              className="w-full text-sm bg-slate-50 rounded-lg py-1.5 pr-8 pl-3 outline-none text-slate-700"
            />
            {isLoading && <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sky-500 animate-spin" />}
          </div>
          <div className="max-h-48 overflow-y-auto p-1 relative">
            {results.length > 0 ? (
              results.map(city => (
                <button
                  key={city.id}
                  onClick={() => {
                    onChange(city.id, city.name);
                    setIsOpen(false);
                  }}
                  className={`w-full text-right px-3 py-2 text-sm rounded-lg transition-colors ${city.id === selectedCity.id ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {city.name}
                </button>
              ))
            ) : (
              !isLoading && (
                <div className="px-3 py-4 text-center text-sm text-slate-500">
                  לא נמצא יישוב כזה
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
