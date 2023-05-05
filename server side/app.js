const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const dataStorage = [];

app.post("/submit", (req, res) => {
  dataStorage.push(req.body);
  res.sendStatus(200);
});

app.get("/data", (req, res) => {
  res.json(dataStorage);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
