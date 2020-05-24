const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./router/router");
const app = express();
const db = require("./model/index");
const importElearning = require("./utils/import-elearning");
const port = process.env.PORT || 3005;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
// app.use(express.static("build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });
app.listen(port);

console.log("App is listening on port " + port);
const initalElearning = async () => {
  await db.sequelize.sync({ force: true });
  importElearning();
};
// initalElearning();
