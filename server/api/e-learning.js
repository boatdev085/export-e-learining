const express = require("express");
const db = require("../model/index");
const xl = require("excel4node");
const path = require("path");
const fs = require("fs");
const ELearning = db.ELearning;
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const mapAttributes = await Object.keys(ELearning.rawAttributes)
      .map((item, idx) => {
        return { key: idx + 1, title: item };
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
router.post("/export", async (req, res, next) => {
  try {
    const fullHost = req.protocol + "://" + req.get("host");
    const getPathFile = fullHost + "/files/";
    const dateNow = new Date();
    const getFileName = `e-learning_${dateNow.getDate()}_${dateNow.getMonth()}_${dateNow.getFullYear()}_${dateNow.getHours()}_${dateNow.getMinutes()}_${dateNow.getMilliseconds()}.xlsx`;
    const appRoot = path.dirname(require.main.filename);
    if (!req.body.field) {
      res.json(null);
      return;
    }
    const response = await getDataELearning(req.body.field || []);
    if (!response && response.length === 0) {
      res.json(null);
      return;
    }
    let wb = await new xl.Workbook();
    let ws = await wb.addWorksheet("e-learning");
    for (let h = 0; h < req.body.field.length; h++) {
      await ws.cell(1, h + 1).string(req.body.field[h]);
    }
    for (let i = 0; i < response.length; i++) {
      for (let j = 0; j < req.body.field.length; j++) {
        await ws
          .cell(i + 2, j + 1)
          .string(response[i][req.body.field[j]] || "");
      }
    }
    if (!fs.existsSync(appRoot + "/files")) {
      fs.mkdirSync(appRoot + "/files");
    }
    await wb.write(appRoot + "/files/" + getFileName);
    setTimeout(() => {
      res.json(getPathFile + getFileName);
    }, [1000]);
    return;
  } catch {
    res.json(null);
    return;
  }
});
module.exports = router;
const getDataELearning = async (field) => {
  return await ELearning.findAll({ attributes: field }).then((data) => {
    return data;
  });
};
