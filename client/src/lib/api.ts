// For development, use proxy. For production, use environment variable
const API_BASE = import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_URL;

export const api = {
  async getEntities() {
    try {
      const res = await fetch(`${API_BASE}/entities`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch entities:", error);
      return []; // Return empty array as fallback
    }
  },
  async getGroupTotals() {
    try {
      const res = await fetch(`${API_BASE}/group-totals`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch group totals:", error);
      return null; // Return null as fallback
    }
  },
  async getAlerts() {
    try {
      const res = await fetch(`${API_BASE}/alerts`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      return []; // Return empty array as fallback
    }
  },
  async getActivity() {
    try {
      const res = await fetch(`${API_BASE}/activity`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch activity:", error);
      return []; // Return empty array as fallback
    }
  },
  async getProjects() {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      return []; // Return empty array as fallback
    }
  },
  async dismissAlert(id: string) {
    const res = await fetch(`${API_BASE}/alerts/${id}`, { method: "DELETE" });
    return res.ok;
  },
  async generateReport(template: string) {
    const res = await fetch(`${API_BASE}/reports/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template }),
    });
    return res.json();
  },
};
