import { Router } from "express";
import { supabase } from "../index";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("alerts")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to dismiss alert" });
  }
});

export default router;
