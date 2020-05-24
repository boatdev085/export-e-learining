const express = require("express");
const models = express.Router();
models.use("/elearning", require("../api/e-learning"));

module.exports = models;
