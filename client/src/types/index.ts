export interface Entity {
  id: string;
  name: string;
  shortName: string;
  industry: string;
  color: string;
  ceo: string;
  employees: number;
  founded: number;
  hq: string;
  status: "On Track" | "At Risk" | "Critical";
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyNetProfit: number;
  profitMargin: number;
  ytdRevenue: number;
  sparkline: number[];
  activeProjects: number;
  openAlerts: number;
}

export interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  entity: string;
  message: string;
  time: string;
}

export interface Activity {
  id: string;
  entity: string;
  action: string;
  time: string;
}

export interface Project {
  id: string;
  name: string;
  entity: string;
  category: string;
  status: string;
  budget: number;
  spend: number;
  remaining: number;
  complete: number;
  due: string;
  lead: string;
}

export interface GroupTotals {
  totalRevenue: number;
  totalExpenses: number;
  totalNetProfit: number;
  profitMargin: number;
  totalHeadcount: number;
  totalActiveProjects: number;
  totalOpenAlerts: number;
  entitiesAtRisk: number;
}

export type Period = "mtd" | "qtd" | "ytd";
