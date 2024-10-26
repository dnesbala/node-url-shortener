const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());

app.use("/api/url/", urlRoutes);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
