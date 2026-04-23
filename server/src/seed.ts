import { supabase } from "./index";

const entities = [
  {
    name: "Meridian Logistics (Pty) Ltd",
    short_name: "MER-LOG",
    industry: "Logistics & Supply Chain",
    color: "#8b5cf6",
    ceo: "Thabo Mokoena",
    employees: 340,
    founded: 2009,
    hq: "Durban, KZN",
    status: "On Track",
    monthly_revenue: 42800000,
    monthly_expenses: 31200000,
    monthly_net_profit: 11600000,
    profit_margin: 27.1,
    ytd_revenue: 385200000,
    sparkline: [38, 40, 39, 42, 41, 43, 42, 43],
    active_projects: 4,
    open_alerts: 1,
  },
  {
    name: "Prestige Property Holdings",
    short_name: "PRES-PROP",
    industry: "Real Estate & Development",
    color: "#3b82f6",
    ceo: "Anele Dlamini",
    employees: 47,
    founded: 2011,
    hq: "Cape Town, WC",
    status: "On Track",
    monthly_revenue: 18500000,
    monthly_expenses: 9800000,
    monthly_net_profit: 8700000,
    profit_margin: 47.0,
    ytd_revenue: 166500000,
    sparkline: [16, 17, 18, 17, 18, 19, 18, 18],
    active_projects: 2,
    open_alerts: 0,
  },
  {
    name: "Nexus Retail Group",
    short_name: "NEX-RET",
    industry: "Retail & Consumer Goods",
    color: "#10b981",
    ceo: "Simone van der Merwe",
    employees: 892,
    founded: 2013,
    hq: "Johannesburg, GP",
    status: "At Risk",
    monthly_revenue: 34100000,
    monthly_expenses: 31900000,
    monthly_net_profit: 2200000,
    profit_margin: 6.4,
    ytd_revenue: 306900000,
    sparkline: [38, 36, 35, 34, 33, 34, 33, 34],
    active_projects: 6,
    open_alerts: 2,
  },
  {
    name: "Axiom Technology Solutions",
    short_name: "AXI-TECH",
    industry: "Technology & Software",
    color: "#f59e0b",
    ceo: "Kaveer Pillay",
    employees: 124,
    founded: 2016,
    hq: "Pretoria, GP",
    status: "On Track",
    monthly_revenue: 11200000,
    monthly_expenses: 7400000,
    monthly_net_profit: 3800000,
    profit_margin: 33.9,
    ytd_revenue: 100800000,
    sparkline: [9, 10, 10, 11, 11, 11, 11, 11],
    active_projects: 3,
    open_alerts: 0,
  },
  {
    name: "Verdant Agricultural Estates",
    short_name: "VER-AGR",
    industry: "Agriculture & Agriprocessing",
    color: "#ef4444",
    ceo: "Boitumelo Sithole",
    employees: 218,
    founded: 2010,
    hq: "Bloemfontein, FS",
    status: "Critical",
    monthly_revenue: 6900000,
    monthly_expenses: 8100000,
    monthly_net_profit: -1200000,
    profit_margin: -17.4,
    ytd_revenue: 62100000,
    sparkline: [9, 8, 8, 7, 7, 7, 6, 6],
    active_projects: 2,
    open_alerts: 3,
  },
  {
    name: "Crestline Financial Services",
    short_name: "CRES-FIN",
    industry: "Financial Services & Lending",
    color: "#6366f1",
    ceo: "Michelle Hendricks",
    employees: 63,
    founded: 2014,
    hq: "Sandton, GP",
    status: "On Track",
    monthly_revenue: 9300000,
    monthly_expenses: 5100000,
    monthly_net_profit: 4200000,
    profit_margin: 45.2,
    ytd_revenue: 83700000,
    sparkline: [8, 8, 9, 9, 9, 9, 9, 9],
    active_projects: 1,
    open_alerts: 0,
  },
];

const groupTotals = {
  total_revenue: 122800000,
  total_expenses: 93500000,
  total_net_profit: 29300000,
  profit_margin: 23.9,
  total_headcount: 1684,
  total_active_projects: 18,
  total_open_alerts: 6,
  entities_at_risk: 2,
};

const alerts = [
  {
    type: "critical",
    entity: "Verdant Agricultural",
    message:
      "Operating at net loss for 3 consecutive months. Immediate CFO review required.",
    time: "2 hours ago",
  },
  {
    type: "warning",
    entity: "Nexus Retail",
    message:
      "Profit margin declined below 7% threshold. Cost structure review initiated.",
    time: "1 day ago",
  },
  {
    type: "warning",
    entity: "Nexus Retail",
    message: "Q3 inventory write-down of R 1 200 000 flagged by finance team.",
    time: "2 days ago",
  },
  {
    type: "critical",
    entity: "Verdant Agricultural",
    message: "Harvest yield 34% below seasonal forecast.",
    time: "3 days ago",
  },
  {
    type: "warning",
    entity: "Meridian Logistics",
    message:
      "Fuel cost escalation impacting Q3 margins. Hedging strategy under review.",
    time: "4 days ago",
  },
  {
    type: "info",
    entity: "Prestige Property",
    message:
      "New commercial development in Waterfront approved. Breaking ground Q1 2026.",
    time: "5 days ago",
  },
];

const activity = [
  { entity: "MER-LOG", action: "Board report generated", time: "2 hours ago" },
  { entity: "AXI-TECH", action: "New hire in tech", time: "4 hours ago" },
  {
    entity: "PRES-PROP",
    action: "Contract signed at property",
    time: "6 hours ago",
  },
  {
    entity: "NEX-RET",
    action: "Quarterly review completed",
    time: "1 day ago",
  },
  {
    entity: "VER-AGR",
    action: "Budget revision submitted",
    time: "2 days ago",
  },
  { entity: "CRES-FIN", action: "Audit trail updated", time: "3 days ago" },
  { entity: "MER-LOG", action: "Fleet upgrade approved", time: "4 days ago" },
  {
    entity: "PRES-PROP",
    action: "Property valuation completed",
    time: "5 days ago",
  },
];

async function seed() {
  try {
    console.log("Seeding entities...");
    const { error: entitiesError } = await supabase
      .from("entities")
      .upsert(entities);
    if (entitiesError) throw entitiesError;

    console.log("Seeding group totals...");
    const { error: totalsError } = await supabase
      .from("group_totals")
      .upsert(groupTotals);
    if (totalsError) throw totalsError;

    console.log("Seeding alerts...");
    const alertsWithIds = alerts.map((alert, index) => ({
      id: index + 1,
      ...alert,
    }));
    const { error: alertsError } = await supabase
      .from("alerts")
      .upsert(alertsWithIds);
    if (alertsError) throw alertsError;

    console.log("Seeding activity...");
    const activityWithIds = activity.map((item, index) => ({
      id: index + 1,
      ...item,
    }));
    const { error: activityError } = await supabase
      .from("activity")
      .upsert(activityWithIds);
    if (activityError) throw activityError;

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seed();
