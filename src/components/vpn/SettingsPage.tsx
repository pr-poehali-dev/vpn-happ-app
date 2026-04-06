import { useState } from "react";
import Icon from "@/components/ui/icon";

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        enabled ? "bg-[#00ff9d]" : "bg-white/15"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
          enabled ? "left-6" : "left-0.5"
        }`}
      />
    </button>
  );
}

function SettingRow({
  icon,
  label,
  description,
  right,
}: {
  icon: string;
  label: string;
  description?: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5">
      <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-base shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-white text-sm">{label}</p>
        {description && <p className="text-xs text-white/40 font-body mt-0.5">{description}</p>}
      </div>
      {right}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 animate-fade-in-up">
      <p className="text-white/40 text-xs font-display uppercase tracking-widest px-1 mb-2">{title}</p>
      <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
        {children}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [killSwitch, setKillSwitch] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [splitTunnel, setSplitTunnel] = useState(false);
  const [dns, setDns] = useState(true);
  const [protocol, setProtocol] = useState("WireGuard");

  return (
    <div className="flex flex-col min-h-screen px-5 pt-14">
      <div className="mb-6 animate-fade-in-up">
        <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-1">Конфигурация</p>
        <h1 className="font-display text-2xl font-bold text-white">Настройки</h1>
      </div>

      {/* Profile Card */}
      <div className="glass-strong rounded-3xl p-5 mb-6 flex items-center gap-4 animate-fade-in-up delay-100"
        style={{ border: "1px solid rgba(0,255,157,0.15)" }}>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00ff9d]/30 to-[#a855f7]/30 flex items-center justify-center text-2xl">
          🚀
        </div>
        <div className="flex-1">
          <p className="font-display text-base font-bold text-white">Пользователь</p>
          <p className="text-white/40 text-xs font-body mt-0.5">Бесплатный план · 3 устройства</p>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-gradient-to-r from-[#00ff9d] to-[#a855f7] rounded-full" />
            </div>
            <span className="text-[10px] text-white/40 font-body">40%</span>
          </div>
        </div>
        <button className="glass rounded-xl px-3 py-2 hover:bg-white/10 transition-colors">
          <span className="text-xs font-display font-bold text-[#a855f7]">PRO</span>
        </button>
      </div>

      <Section title="Безопасность">
        <SettingRow
          icon="🔒"
          label="Kill Switch"
          description="Блокировать трафик при отключении"
          right={<Toggle enabled={killSwitch} onChange={() => setKillSwitch(!killSwitch)} />}
        />
        <SettingRow
          icon="🛡️"
          label="DNS защита"
          description="Блокировка утечек DNS"
          right={<Toggle enabled={dns} onChange={() => setDns(!dns)} />}
        />
        <SettingRow
          icon="🔀"
          label="Протокол"
          description={protocol}
          right={
            <button
              onClick={() => setProtocol(p => p === "WireGuard" ? "OpenVPN" : p === "OpenVPN" ? "IKEv2" : "WireGuard")}
              className="glass rounded-xl px-3 py-1.5 hover:bg-white/10 transition-colors"
            >
              <Icon name="ChevronRight" size={14} className="text-white/40" />
            </button>
          }
        />
      </Section>

      <Section title="Подключение">
        <SettingRow
          icon="⚡"
          label="Авто-подключение"
          description="При запуске приложения"
          right={<Toggle enabled={autoConnect} onChange={() => setAutoConnect(!autoConnect)} />}
        />
        <SettingRow
          icon="🔪"
          label="Раздельное туннелирование"
          description="Выбрать приложения для VPN"
          right={<Toggle enabled={splitTunnel} onChange={() => setSplitTunnel(!splitTunnel)} />}
        />
      </Section>

      <Section title="Приложение">
        <SettingRow
          icon="🔔"
          label="Уведомления"
          description="Статус подключения"
          right={<Toggle enabled={notifications} onChange={() => setNotifications(!notifications)} />}
        />
        <SettingRow
          icon="🌍"
          label="Язык"
          description="Русский"
          right={<Icon name="ChevronRight" size={14} className="text-white/30" />}
        />
        <SettingRow
          icon="ℹ️"
          label="Версия"
          description="1.0.0"
          right={<span className="text-xs text-white/25 font-body">актуальная</span>}
        />
      </Section>

      <button className="glass rounded-2xl py-4 flex items-center justify-center gap-2 mb-6 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-200 border border-transparent animate-fade-in-up">
        <Icon name="LogOut" size={16} className="text-red-400" />
        <span className="font-display text-sm font-bold text-red-400">Выйти из аккаунта</span>
      </button>
    </div>
  );
}
