import express from "express";
import { layouts } from "../data/layouts.js";
import { stores } from "../data/stores.js";

const router = express.Router();

router.get("/stores/:country", (req, res) => {
  const country = req.params.country;
  const matched = stores.filter((s) => s.country.toLowerCase() === country.toLowerCase());
  res.json(matched);
});

router.get("/layout/:storeId", (req, res) => {
  const store = stores.find((s) => s.id === req.params.storeId);
  if (!store) return res.status(404).json({ message: "Store not found" })

  const layoutData = layouts[store.layout];
  res.json({ store, layout: layoutData });
});

export default router;

