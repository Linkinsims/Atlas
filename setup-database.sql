-- Atlas Enterprise OS Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create entities table
CREATE TABLE entities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  color TEXT NOT NULL,
  ceo TEXT NOT NULL,
  employees INTEGER NOT NULL,
  founded INTEGER NOT NULL,
  hq TEXT NOT NULL,
  status TEXT NOT NULL,
  monthly_revenue BIGINT NOT NULL,
  monthly_expenses BIGINT NOT NULL,
  monthly_net_profit BIGINT NOT NULL,
  profit_margin DECIMAL NOT NULL,
  ytd_revenue BIGINT NOT NULL,
  sparkline INTEGER[] NOT NULL,
  active_projects INTEGER NOT NULL,
  open_alerts INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create group_totals table
CREATE TABLE group_totals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_revenue BIGINT NOT NULL,
  total_expenses BIGINT NOT NULL,
  total_net_profit BIGINT NOT NULL,
  profit_margin DECIMAL NOT NULL,
  total_headcount INTEGER NOT NULL,
  total_active_projects INTEGER NOT NULL,
  total_open_alerts INTEGER NOT NULL,
  entities_at_risk INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  entity TEXT NOT NULL,
  message TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create activity table
CREATE TABLE activity (
  id SERIAL PRIMARY KEY,
  entity TEXT NOT NULL,
  action TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  entity TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  budget BIGINT NOT NULL,
  spend BIGINT NOT NULL,
  remaining BIGINT NOT NULL,
  complete INTEGER NOT NULL,
  due TEXT NOT NULL,
  lead TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample entities
INSERT INTO entities (name, short_name, industry, color, ceo, employees, founded, hq, status, monthly_revenue, monthly_expenses, monthly_net_profit, profit_margin, ytd_revenue, sparkline, active_projects, open_alerts) VALUES
('Meridian Logistics (Pty) Ltd', 'MER-LOG', 'Logistics & Supply Chain', '#8b5cf6', 'Thabo Mokoena', 340, 2009, 'Durban, KZN', 'On Track', 42800000, 31200000, 11600000, 27.1, 385200000, '{38,40,39,42,41,43,42,43}', 4, 1),
('Prestige Property Holdings', 'PRES-PROP', 'Real Estate & Development', '#3b82f6', 'Anele Dlamini', 47, 2011, 'Cape Town, WC', 'On Track', 18500000, 9800000, 8700000, 47.0, 166500000, '{16,17,18,17,18,19,18,18}', 2, 0),
('Nexus Retail Group', 'NEX-RET', 'Retail & Consumer Goods', '#10b981', 'Simone van der Merwe', 892, 2013, 'Johannesburg, GP', 'At Risk', 34100000, 31900000, 2200000, 6.4, 306900000, '{38,36,35,34,33,34,33,34}', 6, 2),
('Axiom Technology Solutions', 'AXI-TECH', 'Technology & Software', '#f59e0b', 'Kaveer Pillay', 124, 2016, 'Pretoria, GP', 'On Track', 11200000, 7400000, 3800000, 33.9, 100800000, '{9,10,10,11,11,11,11,11}', 3, 0),
('Verdant Agricultural Estates', 'VER-AGR', 'Agriculture & Agriprocessing', '#ef4444', 'Boitumelo Sithole', 218, 2010, 'Bloemfontein, FS', 'Critical', 6900000, 8100000, -1200000, -17.4, 62100000, '{9,8,8,7,7,7,6,6}', 2, 3),
('Crestline Financial Services', 'CRES-FIN', 'Financial Services & Lending', '#6366f1', 'Michelle Hendricks', 63, 2014, 'Sandton, GP', 'On Track', 9300000, 5100000, 4200000, 45.2, 83700000, '{8,8,9,9,9,9,9,9}', 1, 0);

-- Insert group totals
INSERT INTO group_totals (total_revenue, total_expenses, total_net_profit, profit_margin, total_headcount, total_active_projects, total_open_alerts, entities_at_risk) VALUES
(122800000, 93500000, 29300000, 23.9, 1684, 18, 6, 2);

-- Insert sample alerts
INSERT INTO alerts (type, entity, message, time) VALUES
('critical', 'Verdant Agricultural', 'Operating at net loss for 3 consecutive months. Immediate CFO review required.', '2 hours ago'),
('warning', 'Nexus Retail', 'Profit margin declined below 7% threshold. Cost structure review initiated.', '1 day ago'),
('warning', 'Nexus Retail', 'Q3 inventory write-down of R 1 200 000 flagged by finance team.', '2 days ago'),
('critical', 'Verdant Agricultural', 'Harvest yield 34% below seasonal forecast.', '3 days ago'),
('warning', 'Meridian Logistics', 'Fuel cost escalation impacting Q3 margins. Hedging strategy under review.', '4 days ago'),
('info', 'Prestige Property', 'New commercial development in Waterfront approved. Breaking ground Q1 2026.', '5 days ago');

-- Insert sample activity
INSERT INTO activity (entity, action, time) VALUES
('MER-LOG', 'Board report generated', '2 hours ago'),
('AXI-TECH', 'New hire in tech', '4 hours ago'),
('PRES-PROP', 'Contract signed at property', '6 hours ago'),
('NEX-RET', 'Quarterly review completed', '1 day ago'),
('VER-AGR', 'Budget revision submitted', '2 days ago'),
('CRES-FIN', 'Audit trail updated', '3 days ago'),
('MER-LOG', 'Fleet upgrade approved', '4 days ago'),
('PRES-PROP', 'Property valuation completed', '5 days ago');

-- Insert sample projects
INSERT INTO projects (name, entity, category, status, budget, spend, remaining, complete, due, lead) VALUES
('Fleet Management System Upgrade', 'MER-LOG', 'Technology', 'On Schedule', 3400000, 2100000, 1300000, 62, '2026-06-15', 'K. Naidoo'),
('Durban Hub Expansion Phase 2', 'MER-LOG', 'Infrastructure', 'Delayed', 12000000, 8500000, 3500000, 71, '2026-08-30', 'T. Mokoena'),
('Waterfront Commercial Development', 'PRES-PROP', 'Development', 'On Schedule', 28000000, 18000000, 10000000, 64, '2026-12-01', 'A. Dlamini'),
('Store Rebranding Initiative', 'NEX-RET', 'Marketing', 'At Risk', 1800000, 1200000, 600000, 67, '2026-05-20', 'S. van der Merwe'),
('ERP System Implementation', 'AXI-TECH', 'Technology', 'On Schedule', 2100000, 1400000, 700000, 67, '2026-07-10', 'K. Pillay'),
('Irrigation Infrastructure', 'VER-AGR', 'Infrastructure', 'Delayed', 4500000, 2800000, 1700000, 62, '2026-09-15', 'B. Sithole'),
('Credit Risk Model v2', 'CRES-FIN', 'Technology', 'On Schedule', 900000, 650000, 250000, 72, '2026-04-30', 'M. Hendricks');

-- Enable Row Level Security (optional but recommended)
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_totals ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (adjust as needed)
CREATE POLICY "Allow authenticated users to read entities" ON entities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read group_totals" ON group_totals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read alerts" ON alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete alerts" ON alerts FOR DELETE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read activity" ON activity FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read projects" ON projects FOR SELECT TO authenticated USING (true);