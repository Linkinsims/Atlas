import { useAppStore } from "../stores/appStore";

interface TopNavProps {
  onViewChange: (view: string) => void;
}

const TopNav = ({ onViewChange }: TopNavProps) => {
  const { currentPeriod, setPeriod } = useAppStore();

  const navTabs = [
    { key: "command-center", label: "Command Center" },
    { key: "entities", label: "Entities" },
    { key: "financials", label: "Financials" },
    { key: "operations", label: "Operations" },
    { key: "reports", label: "Reports" },
  ];

  const periods = [
    { key: "mtd", label: "MTD" },
    { key: "qtd", label: "QTD" },
    { key: "ytd", label: "YTD" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-13 bg-bg-surface border-b border-border-subtle flex items-center justify-between px-7 z-50">
      <div className="flex items-center gap-3">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" fill="white" />
          <rect x="8" y="8" width="8" height="8" rx="1" fill="#0a0b0e" />
        </svg>
        <div>
          <div className="text-base font-semibold">Atlas</div>
          <div className="text-[9px] uppercase text-text-muted leading-none">
            Enterprise OS
          </div>
        </div>
      </div>
      <div className="flex gap-0">
        {navTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onViewChange(tab.key)}
            className="px-4 py-3 text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors text-xs"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-0">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => setPeriod(period.key as any)}
              className={`px-3 py-1 text-[11px] ${
                currentPeriod === period.key
                  ? "bg-text-primary text-bg-primary border-text-primary"
                  : "bg-bg-elevated text-text-secondary border-border-default hover:bg-bg-card hover:text-text-primary"
              } border-r-0 first:rounded-l last:rounded-r last:border-r border transition-colors`}
            >
              {period.label}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-border-subtle"></div>
        <div className="flex items-center gap-2 text-text-secondary text-[11px]">
          <span>12 Entities Active</span>
          <span className="w-1.5 h-1.5 bg-positive rounded-full"></span>
        </div>
        <div className="w-8 h-8 bg-bg-elevated rounded-full flex items-center justify-center text-xs font-medium">
          GC
        </div>
      </div>
    </div>
  );
};

export default TopNav;
