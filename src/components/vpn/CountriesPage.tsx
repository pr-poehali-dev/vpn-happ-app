import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Country } from "@/pages/Index";

interface CountriesPageProps {
  countries: Country[];
  selectedCountry: Country;
  onSelect: (country: Country) => void;
}

function PingBars({ load }: { load: number }) {
  const bars = 5;
  const filled = Math.ceil((bars * (100 - load)) / 100);
  return (
    <div className="flex items-end gap-0.5">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm transition-all ${i < filled ? "bg-[#00ff9d]" : "bg-white/15"}`}
          style={{ height: `${4 + i * 2}px` }}
        />
      ))}
    </div>
  );
}

export default function CountriesPage({ countries, selectedCountry, onSelect }: CountriesPageProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "fast" | "free">("all");

  const filtered = countries.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "fast" && c.ping < 50) ||
      (filter === "free" && !c.premium);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col min-h-screen px-5 pt-14">
      <div className="mb-6 animate-fade-in-up">
        <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-1">Выбор сервера</p>
        <h1 className="font-display text-2xl font-bold text-white">Страны</h1>
      </div>

      {/* Search */}
      <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3 mb-4 animate-fade-in-up delay-100">
        <Icon name="Search" size={16} className="text-white/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск страны..."
          className="flex-1 bg-transparent text-white text-sm font-body placeholder:text-white/25 outline-none"
        />
        {search && (
          <button onClick={() => setSearch("")}>
            <Icon name="X" size={14} className="text-white/40 hover:text-white/70 transition-colors" />
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-5 animate-fade-in-up delay-200">
        {(["all", "fast", "free"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-display font-bold transition-all duration-200 ${
              filter === f
                ? "bg-[#00ff9d] text-[#080d14]"
                : "glass text-white/50 hover:text-white/80"
            }`}
          >
            {f === "all" ? "Все" : f === "fast" ? "Быстрые" : "Бесплатные"}
          </button>
        ))}
      </div>

      {/* Country List */}
      <div className="flex flex-col gap-2 pb-4">
        {filtered.map((country, i) => {
          const isSelected = country.name === selectedCountry.name;
          return (
            <button
              key={country.name}
              onClick={() => onSelect(country)}
              className={`country-row glass rounded-2xl flex items-center gap-4 px-4 py-3.5 transition-all duration-200 text-left border animate-fade-in-up ${
                isSelected
                  ? "border-[#00ff9d]/40 bg-[rgba(0,255,157,0.06)] neon-glow"
                  : "border-transparent"
              }`}
              style={{ animationDelay: `${i * 0.04}s`, opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="text-2xl leading-none">{country.flag}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-body font-semibold text-white text-sm">{country.name}</span>
                  {country.premium && (
                    <span className="text-[9px] font-display font-bold px-1.5 py-0.5 rounded-full bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30">
                      PRO
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-white/40 font-body">Нагрузка {country.load}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`text-xs font-bold font-body ${country.ping < 50 ? "text-[#00ff9d]" : country.ping < 100 ? "text-yellow-400" : "text-red-400"}`}>
                    {country.ping} мс
                  </p>
                  <div className="flex justify-end mt-1">
                    <PingBars load={country.load} />
                  </div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#00ff9d] flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-[#080d14]" />
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-white/40 font-body text-sm">Страна не найдена</p>
          </div>
        )}
      </div>
    </div>
  );
}
