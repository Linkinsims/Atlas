import { useAppStore } from "../stores/appStore";
import { Entity } from "../types";

interface SidebarProps {
  onViewChange: (view: string) => void;
  entities: Entity[];
}

const Sidebar = ({ onViewChange, entities }: SidebarProps) => {
  const { alertCount } = useAppStore();

  const sections = [
    {
      label: "Overview",
      items: [
        { key: "command-center", label: "Command Center" },
        { key: "portfolio-health", label: "Portfolio Health" },
        { key: "consolidated-pl", label: "Consolidated P&L" },
        { key: "group-alerts", label: "Group Alerts", badge: alertCount },
      ],
    },
    {
      label: "Management",
      items: [
        { key: "entity-manager", label: "Entity Manager" },
        { key: "headcount", label: "Headcount" },
        { key: "capex-tracker", label: "Capex Tracker" },
        { key: "risk-register", label: "Risk Register" },
      ],
    },
    {
      label: "Intelligence",
      items: [
        { key: "board-reports", label: "Board Reports" },
        { key: "benchmark-analysis", label: "Benchmark Analysis" },
        { key: "audit-trail", label: "Audit Trail" },
        { key: "settings", label: "Settings" },
      ],
    },
  ];

  return (
    <div className="fixed left-0 top-13 bottom-0 w-52 bg-bg-surface border-r border-border-subtle overflow-y-auto py-5">
      {sections.map((section) => (
        <div key={section.label} className="mb-6">
          <div className="text-[10px] text-text-muted uppercase tracking-wider px-5 mb-2">
            {section.label}
          </div>
          {section.items.map((item) => (
            <button
              key={item.key}
              onClick={() => onViewChange(item.key)}
              className="w-full text-left px-5 py-2 hover:bg-bg-elevated transition-colors text-sm"
            >
              {item.label}
              {item.badge && (
                <span className="ml-2 bg-negative text-text-primary text-[10px] px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
      <div className="border-t border-border-subtle mt-6 pt-4">
        <div className="text-[10px] text-text-muted uppercase tracking-wider px-5 mb-2">
          Entities
        </div>
        <div className="px-5 space-y-1.5">
          {entities.map((entity) => (
            <button
              key={entity.id}
              onClick={() => onViewChange(`entity-${entity.id}`)}
              className="flex items-center gap-2 w-full text-left py-1.5 text-xs hover:bg-bg-elevated transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: entity.color }}
              ></span>
              {entity.shortName}
              <span
                className={`w-1.5 h-1.5 rounded-full ml-auto ${
                  entity.status === "On Track"
                    ? "bg-positive"
                    : entity.status === "At Risk"
                      ? "bg-warning"
                      : "bg-negative"
                }`}
              ></span>
            </button>
          ))}
        </div>
        <button className="w-full mt-4 mx-5 py-2.5 bg-transparent border border-border-default text-text-secondary hover:border-border-emphasis hover:text-text-primary rounded text-xs transition-colors">
          + Add Entity
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
