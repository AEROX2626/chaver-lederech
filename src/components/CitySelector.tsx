import { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, Search } from 'lucide-react';

const CITIES = [
  { id: "281184", name: "ירושלים" },
  { id: "293397", name: "תל אביב" },
  { id: "294801", name: "חיפה" },
  { id: "295530", name: "באר שבע" },
  { id: "294071", name: "נתניה" },
  { id: "293337", name: "צפת" },
  { id: "295277", name: "אילת" },
  { id: "282926", name: "מודיעין" },
  { id: "293703", name: "ראשון לציון" },
  { id: "294904", name: "חולון" },
  { id: "293807", name: "פתח תקווה" },
  { id: "295629", name: "אשדוד" },
  { id: "295632", name: "אשקלון" },
  { id: "294328", name: "כפר סבא" },
  { id: "294890", name: "הרצליה" },
  { id: "295224", name: "בית שמש" },
  { id: "293503", name: "רחובות" },
  { id: "294776", name: "חדרה" },
  { id: "293374", name: "טבריה" },
  { id: "294514", name: "כרמיאל" },
  { id: "294824", name: "גבעתיים" },
  { id: "293623", name: "רעננה" },
  { id: "293721", name: "רמת גן" }
];

interface CitySelectorProps {
  selectedId: string;
  onChange: (id: string) => void;
}

export function CitySelector({ selectedId, onChange }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCity = CITIES.find(c => c.id === selectedId) || CITIES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return CITIES;
    return CITIES.filter(c => c.name.includes(search));
  }, [search]);

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
              placeholder="חפש עיר..."
              className="w-full text-sm bg-slate-50 rounded-lg py-1.5 pr-8 pl-3 outline-none text-slate-700"
            />
          </div>
          <div className="max-h-48 overflow-y-auto p-1">
            {filtered.length > 0 ? (
              filtered.map(city => (
                <button
                  key={city.id}
                  onClick={() => {
                    onChange(city.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-right px-3 py-2 text-sm rounded-lg transition-colors ${city.id === selectedId ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {city.name}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm text-slate-500">
                לא נמצאו ערים
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
