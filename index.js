const express = require("express");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const Url = require("./models/url");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(express.static(path.join(__dirname, "views/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url/", urlRoutes);

app.get("/", async (req, res) => {
  try {
    const allUrls = await Url.find({});
    res.render("index.ejs", { urls: allUrls });
  } catch (err) {
    res.render("index.ejs", { urls: [] });
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
