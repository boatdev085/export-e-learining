const express = require("express");
const db = require("../model/index");
const ELearning = db.ELearning;
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const mapAttributes = await Object.keys(ELearning.rawAttributes)
      .map((item) => {
        return { title: item };
      })
      .filter(
        (f) =>
          f.title !== "id" && f.title !== "createdAt" && f.title !== "updatedAt"
      );

    res.json(mapAttributes);
    return;
  } catch {
    res.json([]);
    return;
  }
});
module.exports = router;
