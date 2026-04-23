const API_BASE = import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_URL;

export const api = {
  async getEntities() {
    const res = await fetch(`${API_BASE}/entities`);
    return res.json();
  },
  async getGroupTotals() {
    const res = await fetch(`${API_BASE}/group-totals`);
    return res.json();
  },
  async getAlerts() {
    const res = await fetch(`${API_BASE}/alerts`);
    return res.json();
  },
  async getActivity() {
    const res = await fetch(`${API_BASE}/activity`);
    return res.json();
  },
  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    return res.json();
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
