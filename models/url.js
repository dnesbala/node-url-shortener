const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    unique: true,
  },
  analytics: [
    {
      date: { type: Date, default: Date.now },
      ip: { type: String },
    },
  ],
});

const Url = mongoose.model("url", urlSchema);

module.exports = Url;