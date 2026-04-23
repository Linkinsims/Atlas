// Vercel serverless functions for Express routes
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function handler(req: any, res: any) {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Entities endpoint
  if (req.url.startsWith("/api/entities")) {
    if (req.method === "GET") {
      try {
        const { data, error } = await supabase
          .from("entities")
          .select("*")
          .order("name");

        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch entities" });
      }
    }
  }

  // Group totals endpoint
  else if (req.url.startsWith("/api/group-totals")) {
    if (req.method === "GET") {
      try {
        const { data, error } = await supabase
          .from("group_totals")
          .select("*")
          .single();

        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch group totals" });
      }
    }
  }

  // Alerts endpoint
  else if (req.url.startsWith("/api/alerts")) {
    if (req.method === "GET") {
      try {
        const { data, error } = await supabase
          .from("alerts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch alerts" });
      }
    } else if (req.method === "DELETE") {
      const id = req.url.split("/").pop();
      try {
        const { error } = await supabase.from("alerts").delete().eq("id", id);

        if (error) throw error;
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Failed to dismiss alert" });
      }
    }
  }

  // Activity endpoint
  else if (req.url.startsWith("/api/activity")) {
    if (req.method === "GET") {
      try {
        const { data, error } = await supabase
          .from("activity")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch activity" });
      }
    }
  }

  // Projects endpoint
  else if (req.url.startsWith("/api/projects")) {
    if (req.method === "GET") {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("due_date");

        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch projects" });
      }
    }
  }

  // Reports endpoint
  else if (req.url.startsWith("/api/reports/generate")) {
    if (req.method === "POST") {
      // Simulate report generation
      setTimeout(() => {
        res
          .status(200)
          .json({ success: true, message: "Report generated successfully" });
      }, 2000);
    }
  } else {
    res.status(404).json({ error: "Endpoint not found" });
  }
}
