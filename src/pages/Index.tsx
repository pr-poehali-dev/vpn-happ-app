import { useState } from "react";
import HomePage from "@/components/vpn/HomePage";
import CountriesPage from "@/components/vpn/CountriesPage";
import SettingsPage from "@/components/vpn/SettingsPage";
import BottomNav from "@/components/vpn/BottomNav";

export type Tab = "home" | "countries" | "settings";

export interface Country {
  name: string;
  flag: string;
  ping: number;
  load: number;
  premium?: boolean;
}

export const COUNTRIES: Country[] = [
  { name: "Германия", flag: "🇩🇪", ping: 18, load: 42 },
  { name: "Нидерланды", flag: "🇳🇱", ping: 22, load: 31 },
  { name: "США", flag: "🇺🇸", ping: 89, load: 67, premium: true },
  { name: "Великобритания", flag: "🇬🇧", ping: 35, load: 55 },
  { name: "Финляндия", flag: "🇫🇮", ping: 12, load: 28 },
  { name: "Франция", flag: "🇫🇷", ping: 27, load: 49 },
  { name: "Япония", flag: "🇯🇵", ping: 143, load: 38, premium: true },
  { name: "Канада", flag: "🇨🇦", ping: 102, load: 44, premium: true },
  { name: "Швейцария", flag: "🇨🇭", ping: 31, load: 22 },
  { name: "Австрия", flag: "🇦🇹", ping: 25, load: 35 },
  { name: "Швеция", flag: "🇸🇪", ping: 19, load: 61 },
  { name: "Норвегия", flag: "🇳🇴", ping: 21, load: 18 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);

  const handleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      return;
    }
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2200);
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsConnected(false);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-mesh flex flex-col relative overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === "home" && (
          <HomePage
            isConnected={isConnected}
            isConnecting={isConnecting}
            selectedCountry={selectedCountry}
            onConnect={handleConnect}
            onTabChange={setActiveTab}
          />
        )}
        {activeTab === "countries" && (
          <CountriesPage
            countries={COUNTRIES}
            selectedCountry={selectedCountry}
            onSelect={handleSelectCountry}
          />
        )}
        {activeTab === "settings" && <SettingsPage />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
