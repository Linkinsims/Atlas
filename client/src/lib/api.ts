import { supabase } from "./supabase";

export const api = {
  async getEntities() {
    try {
      const { data, error } = await supabase
        .from("entities")
        .select(
          `
          id,
          name,
          short_name as shortName,
          industry,
          color,
          ceo,
          employees,
          founded,
          hq,
          status,
          monthly_revenue as monthlyRevenue,
          monthly_expenses as monthlyExpenses,
          monthly_net_profit as monthlyNetProfit,
          profit_margin as profitMargin,
          ytd_revenue as ytdRevenue,
          sparkline,
          active_projects as activeProjects,
          open_alerts as openAlerts
        `,
        )
        .order("name");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to fetch entities:", error);
      return [];
    }
  },

  async getGroupTotals() {
    try {
      const { data, error } = await supabase
        .from("group_totals")
        .select(
          `
          total_revenue as totalRevenue,
          total_expenses as totalExpenses,
          total_net_profit as totalNetProfit,
          profit_margin as profitMargin,
          total_headcount as totalHeadcount,
          total_active_projects as totalActiveProjects,
          total_open_alerts as totalOpenAlerts,
          entities_at_risk as entitiesAtRisk
        `,
        )
        .single();

      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error("Failed to fetch group totals:", error);
      return null;
    }
  },

  async getAlerts() {
    try {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      return [];
    }
  },

  async getActivity() {
    try {
      const { data, error } = await supabase
        .from("activity")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to fetch activity:", error);
      return [];
    }
  },

  async getProjects() {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
          id,
          name,
          entity,
          category,
          status,
          budget,
          spend,
          remaining,
          complete,
          due as dueDate,
          lead
        `,
        )
        .order("due");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      return [];
    }
  },

  async dismissAlert(id: string) {
    try {
      const { error } = await supabase.from("alerts").delete().eq("id", id);

      return !error;
    } catch (error) {
      console.error("Failed to dismiss alert:", error);
      return false;
    }
  },

  async generateReport(template: string) {
    // Simulate report generation (in a real app, this might trigger a Supabase Edge Function)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: true,
      message: `${template} report generated successfully`,
    };
  },
};
