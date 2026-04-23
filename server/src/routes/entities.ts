import { Router } from "express";
import { supabase } from "../index";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("entities")
      .select("*")
      .order("name");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch entities" });
  }
});

export default router;
