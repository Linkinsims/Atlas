import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createClient } from "@supabase/supabase-js";
import entitiesRouter from "./routes/entities";
import groupTotalsRouter from "./routes/groupTotals";
import alertsRouter from "./routes/alerts";
import activityRouter from "./routes/activity";
import projectsRouter from "./routes/projects";
import reportsRouter from "./routes/reports";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Routes
app.use("/api/entities", entitiesRouter);
app.use("/api/group-totals", groupTotalsRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/activity", activityRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/reports", reportsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
