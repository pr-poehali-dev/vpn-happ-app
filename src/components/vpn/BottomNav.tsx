import Icon from "@/components/ui/icon";
import { Tab } from "@/pages/Index";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "countries", label: "Страны", icon: "Globe" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-4 mb-5">
        <div
          className="glass-strong rounded-3xl px-2 py-3 flex items-center justify-around"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center gap-1.5 px-6 py-1.5 rounded-2xl transition-all duration-200 relative group"
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-[#00ff9d]/10" />
                )}
                <Icon
                  name={tab.icon}
                  size={20}
                  className={`transition-all duration-200 relative z-10 ${
                    isActive
                      ? "text-[#00ff9d] drop-shadow-[0_0_8px_#00ff9d]"
                      : "text-white/35 group-hover:text-white/60"
                  }`}
                />
                <span
                  className={`text-[10px] font-display font-bold tracking-wide relative z-10 transition-all duration-200 ${
                    isActive ? "text-[#00ff9d]" : "text-white/30 group-hover:text-white/50"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
