const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
