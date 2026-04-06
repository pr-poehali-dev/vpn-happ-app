import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Tab, Country } from "@/pages/Index";

interface HomePageProps {
  isConnected: boolean;
  isConnecting: boolean;
  selectedCountry: Country;
  onConnect: () => void;
  onTabChange: (tab: Tab) => void;
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-1 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-white/40 font-body uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-display text-sm font-bold text-white/90">{value}</span>
    </div>
  );
}

export default function HomePage({
  isConnected,
  isConnecting,
  selectedCountry,
  onConnect,
  onTabChange,
}: HomePageProps) {
  const [timer, setTimer] = useState(0);
  const [traffic, setTraffic] = useState({ up: 0, down: 0 });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isConnected) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
        setTraffic((t) => ({
          up: t.up + Math.random() * 0.3,
          down: t.down + Math.random() * 1.2,
        }));
      }, 1000);
    } else {
      setTimer(0);
      setTraffic({ up: 0, down: 0 });
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const formatMB = (mb: number) => {
    if (mb > 1024) return `${(mb / 1024).toFixed(1)} ГБ`;
    return `${mb.toFixed(1)} МБ`;
  };

  return (
    <div className="flex flex-col min-h-screen px-5 pt-14 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 animate-fade-in-up">
        <div>
          <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-1">Статус</p>
          <h1 className="font-display text-xl font-bold text-white">
            {isConnecting ? "Подключение..." : isConnected ? "Защищён" : "Не защищён"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              isConnected
                ? "bg-[#00ff9d] shadow-[0_0_12px_#00ff9d]"
                : isConnecting
                ? "bg-yellow-400 shadow-[0_0_12px_theme(colors.yellow.400)] animate-pulse"
                : "bg-red-500"
            }`}
          />
          <div className="glass rounded-full p-2 cursor-pointer hover:bg-white/10 transition-colors">
            <Icon name="Bell" size={16} className="text-white/60" />
          </div>
        </div>
      </div>

      {/* Connection Button */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8">
        <div className="relative flex items-center justify-center">
          {isConnected && (
            <>
              <div className="absolute w-48 h-48 rounded-full border border-[#00ff9d]/20 animate-pulse-ring" />
              <div className="absolute w-48 h-48 rounded-full border border-[#00ff9d]/10 animate-pulse-ring-2" />
            </>
          )}

          <button
            onClick={onConnect}
            className={`relative w-44 h-44 rounded-full transition-all duration-500 flex flex-col items-center justify-center gap-2 group ${
              isConnected
                ? "neon-glow border-2 border-[#00ff9d]/50"
                : isConnecting
                ? "border-2 border-yellow-400/50 shadow-[0_0_40px_rgba(250,204,21,0.2)]"
                : "neon-glow-red border-2 border-red-500/40 hover:border-red-400/60"
            }`}
            style={{
              background: isConnected
                ? "radial-gradient(circle, rgba(0,255,157,0.12) 0%, rgba(0,255,157,0.04) 60%, rgba(8,13,20,0.9) 100%)"
                : isConnecting
                ? "radial-gradient(circle, rgba(250,204,21,0.1) 0%, rgba(8,13,20,0.9) 100%)"
                : "radial-gradient(circle, rgba(239,68,68,0.1) 0%, rgba(8,13,20,0.9) 100%)",
            }}
          >
            {isConnecting ? (
              <>
                <div className="w-10 h-10 border-2 border-yellow-400/60 border-t-yellow-400 rounded-full animate-spin" />
                <span className="font-display text-xs text-yellow-400 font-bold">ЖДИТЕ</span>
              </>
            ) : (
              <>
                <Icon
                  name={isConnected ? "ShieldCheck" : "ShieldOff"}
                  size={44}
                  className={`transition-all duration-300 ${
                    isConnected ? "text-[#00ff9d] drop-shadow-[0_0_12px_#00ff9d]" : "text-red-400"
                  }`}
                />
                <span
                  className={`font-display text-xs font-bold tracking-widest ${
                    isConnected ? "text-[#00ff9d]" : "text-red-400"
                  }`}
                >
                  {isConnected ? "ОТКЛЮЧИТЬ" : "ВКЛЮЧИТЬ"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Timer */}
        {isConnected && (
          <div className="font-display text-3xl font-bold neon-text animate-scale-in tracking-widest">
            {formatTime(timer)}
          </div>
        )}

        {/* Country Selector */}
        <button
          onClick={() => onTabChange("countries")}
          className="glass rounded-2xl px-6 py-4 flex items-center gap-4 w-full max-w-xs hover:bg-white/8 transition-all duration-200 group animate-fade-in-up"
        >
          <span className="text-3xl">{selectedCountry.flag}</span>
          <div className="flex-1 text-left">
            <p className="text-white/40 text-xs font-body mb-0.5">Сервер</p>
            <p className="font-display text-sm font-bold text-white">{selectedCountry.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[#00ff9d] text-xs font-body font-medium">{selectedCountry.ping} мс</p>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-sm transition-all ${
                      i <= Math.ceil((5 * (100 - selectedCountry.load)) / 100)
                        ? "bg-[#00ff9d]"
                        : "bg-white/15"
                    }`}
                    style={{ height: `${4 + i * 2}px` }}
                  />
                ))}
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
          </div>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <StatCard label="Загрузка" value={formatMB(traffic.down)} icon="⬇️" />
        <StatCard label="Отдача" value={formatMB(traffic.up)} icon="⬆️" />
        <StatCard label="Пинг" value={isConnected ? `${selectedCountry.ping} мс` : "—"} icon="📡" />
      </div>
    </div>
  );
}
