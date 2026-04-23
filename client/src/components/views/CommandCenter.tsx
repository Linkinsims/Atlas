import { useState, useEffect } from "react";
import { useAppStore } from "../../stores/appStore";
import { api } from "../../lib/api";
import { Entity, GroupTotals, Alert, Activity } from "../../types";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const CommandCenter = () => {
  const { currentPeriod } = useAppStore();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [totals, setTotals] = useState<GroupTotals | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [entitiesData, totalsData, alertsData, activityData] =
        await Promise.all([
          api.getEntities(),
          api.getGroupTotals(),
          api.getAlerts(),
          api.getActivity(),
        ]);
      setEntities(entitiesData);
      setTotals(totalsData);
      setAlerts(alertsData);
      setActivity(activityData);
    };
    loadData();
  }, []);

  const formatCurrency = (value: number | null | undefined) => {
    // Debug logging
    console.log("formatCurrency called with:", value, typeof value);

    if (
      value === null ||
      value === undefined ||
      typeof value !== "number" ||
      isNaN(value)
    ) {
      console.log("formatCurrency returning fallback for invalid value");
      return "R 0";
    }
    const absValue = Math.abs(value);
    const formatted = absValue.toLocaleString("en-ZA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return value < 0 ? `-R ${formatted}` : `R ${formatted}`;
  };

  const formatPercentage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "0.0%";
    return `${value.toFixed(1)}%`;
  };

  const multiplier = (() => {
    if (currentPeriod === "qtd") return 2.8;
    if (currentPeriod === "ytd") {
      if (!totals?.totalRevenue || entities.length === 0) return 1;
      const totalMonthly = entities.reduce(
        (sum, e) => sum + (e.monthlyRevenue || 0),
        0,
      );
      if (totalMonthly === 0) return 1;
      return totals.totalRevenue / totalMonthly;
    }
    return 1;
  })();

  const getSparklineData = (data: number[] | null | undefined) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [{ x: 0, y: 50 }];
    }
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    return data.map((val, i) => ({ x: i, y: ((val - min) / range) * 100 }));
  };

  const dismissAlert = async (id: string) => {
    if (await api.dismissAlert(id)) {
      setAlerts(alerts.filter((a) => a.id !== id));
    }
  };

  if (!totals) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Loading Atlas Dashboard...</div>
          <div className="text-sm text-text-secondary">
            Connecting to enterprise database...
          </div>
        </div>
      </div>
    );
  }

  // Validate totals object has required properties
  console.log("Validating totals object:", totals);
  console.log(
    "totals.totalRevenue:",
    totals.totalRevenue,
    typeof totals.totalRevenue,
  );
  console.log(
    "totals.totalExpenses:",
    totals.totalExpenses,
    typeof totals.totalExpenses,
  );
  console.log(
    "totals.totalNetProfit:",
    totals.totalNetProfit,
    typeof totals.totalNetProfit,
  );
  console.log(
    "totals.profitMargin:",
    totals.profitMargin,
    typeof totals.profitMargin,
  );

  if (
    typeof totals.totalRevenue !== "number" ||
    typeof totals.totalExpenses !== "number" ||
    typeof totals.totalNetProfit !== "number" ||
    typeof totals.profitMargin !== "number"
  ) {
    console.error("Totals object missing required numeric properties:", totals);
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Data Error</div>
          <div className="text-sm text-text-secondary">
            Enterprise database returned invalid data format.
          </div>
          <div className="text-xs text-text-muted mt-4">
            Check browser console for detailed data structure.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 mb-7">
        <div className="bg-bg-card border border-border-default rounded-lg p-5">
          <div className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
            Group Revenue ({currentPeriod.toUpperCase()})
          </div>
          <div className="font-mono text-xl font-light mb-2">
            {formatCurrency(Math.round(totals.totalRevenue * multiplier))}
          </div>
          <div className="text-[11px] font-mono text-positive">+8.3% ▲</div>
        </div>
        <div className="bg-bg-card border border-border-default rounded-lg p-5">
          <div className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
            Group Expenses ({currentPeriod.toUpperCase()})
          </div>
          <div className="font-mono text-xl font-light mb-2">
            {formatCurrency(Math.round(totals.totalExpenses * multiplier))}
          </div>
          <div className="text-[11px] font-mono text-negative">+5.1% ▲</div>
        </div>
        <div className="bg-bg-card border border-border-default rounded-lg p-5">
          <div className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
            Net Profit ({currentPeriod.toUpperCase()})
          </div>
          <div className="font-mono text-xl font-light mb-2">
            {formatCurrency(Math.round(totals.totalNetProfit * multiplier))}
          </div>
          <div className="text-[11px] font-mono text-positive">+14.2% ▲</div>
        </div>
        <div className="bg-bg-card border border-border-default rounded-lg p-5">
          <div className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
            Profit Margin
          </div>
          <div className="font-mono text-xl font-light mb-2">
            {formatPercentage(totals.profitMargin)}
          </div>
          <div className="text-[11px] font-mono text-positive">+1.4pp ▲</div>
        </div>
        <div className="bg-bg-card border border-border-default rounded-lg p-5">
          <div className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
            Total Headcount
          </div>
          <div className="font-mono text-xl font-light mb-2">
            {totals.totalHeadcount.toLocaleString("en-ZA")}
          </div>
          <div className="text-[11px] font-mono text-neutral">+12</div>
        </div>
        <div className="bg-bg-card border border-border-default rounded-lg p-5">
          <div className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
            Active Entities
          </div>
          <div className="font-mono text-xl font-light mb-2">
            {entities.length} of {entities.length}
          </div>
          <div className="text-[11px] font-mono text-neutral">-</div>
        </div>
        <div className="bg-bg-card border border-border-default rounded-lg p-5">
          <div className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
            Active Projects
          </div>
          <div className="font-mono text-xl font-light mb-2">
            {totals.totalActiveProjects}
          </div>
          <div className="text-[11px] font-mono text-neutral">+3</div>
        </div>
        <div className="bg-bg-card border border-border-default rounded-lg p-5">
          <div className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
            Open Alerts
          </div>
          <div className="font-mono text-xl font-light mb-2">
            {alerts.length}
          </div>
          <div className="text-[11px] font-mono text-negative">+2 ▲</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-bg-surface border border-border-default rounded-lg p-5">
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Filter entities..."
                className="flex-1 px-3 py-2 bg-bg-elevated border border-border-default rounded text-sm"
              />
              <select className="px-3 py-2 bg-bg-elevated border border-border-default rounded text-sm">
                <option>Sort by...</option>
              </select>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] text-text-muted uppercase tracking-wider">
                  <th className="pb-3">Entity</th>
                  <th className="pb-3">Industry</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Expenses</th>
                  <th className="pb-3">Net Profit</th>
                  <th className="pb-3">Margin</th>
                  <th className="pb-3">Headcount</th>
                  <th className="pb-3">Projects</th>
                  <th className="pb-3">Trend</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((entity, index) => (
                  <tr
                    key={entity.id}
                    className={`border-t border-border-subtle ${index % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated"} hover:bg-bg-card transition-colors cursor-pointer`}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: entity.color }}
                        ></span>
                        {entity.shortName}
                      </div>
                    </td>
                    <td className="py-3">{entity.industry}</td>
                    <td className="py-3 font-mono">
                      {formatCurrency(entity.monthlyRevenue)}
                    </td>
                    <td className="py-3 font-mono">
                      {formatCurrency(entity.monthlyExpenses)}
                    </td>
                    <td
                      className={`py-3 font-mono ${entity.monthlyNetProfit < 0 ? "text-negative" : ""}`}
                    >
                      {formatCurrency(entity.monthlyNetProfit)}
                    </td>
                    <td className="py-3 font-mono">
                      {formatPercentage(entity.profitMargin)}
                    </td>
                    <td className="py-3 font-mono">{entity.employees}</td>
                    <td className="py-3 font-mono">{entity.activeProjects}</td>
                    <td className="py-3">
                      <ResponsiveContainer width={60} height={24}>
                        <LineChart data={getSparklineData(entity.sparkline)}>
                          <Line
                            type="monotone"
                            dataKey="y"
                            stroke={
                              entity.sparkline[entity.sparkline.length - 1] >
                              entity.sparkline[0]
                                ? "#3d9e6e"
                                : "#c94f4f"
                            }
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[11px] font-medium px-2 py-1 rounded-full uppercase ${
                          entity.status === "On Track"
                            ? "bg-green-900/20 text-positive"
                            : entity.status === "At Risk"
                              ? "bg-amber-900/20 text-warning"
                              : "bg-red-900/20 text-negative"
                        }`}
                      >
                        {entity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-bg-card border border-border-default rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4">
              Active Alerts{" "}
              <span className="bg-negative text-text-primary text-[10px] px-1.5 py-0.5 rounded ml-2">
                {alerts.length}
              </span>
            </h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex gap-3 p-3 border-b border-border-subtle last:border-b-0"
                >
                  <span className="text-base">
                    {alert.type === "critical"
                      ? "🔴"
                      : alert.type === "warning"
                        ? "🟡"
                        : "🔵"}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm leading-relaxed mb-1">
                      {alert.entity}: {alert.message}
                    </div>
                    <div className="text-[11px] text-text-muted">
                      {alert.time}
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-text-muted hover:text-text-primary text-lg"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-text-secondary hover:text-text-primary">
              View All Alerts
            </button>
          </div>

          <div className="bg-bg-card border border-border-default rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4">Group Activity</h3>
            <div className="space-y-2">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-2 text-sm"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: entities.find(
                        (e) => e.shortName === item.entity,
                      )?.color,
                    }}
                  ></span>
                  <span className="font-medium">{item.entity}</span>
                  <span className="flex-1">{item.action}</span>
                  <span className="text-text-muted text-[11px]">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
