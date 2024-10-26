const simpleId = require("simple-id");
const Url = require("../models/url");

exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({
      message: "Original URL is missing",
    });
  }

  try {
    let urlRecord = await Url.findOne({ originalUrl });
    if (!urlRecord) {
      const shortUrl = simpleId();
      urlRecord = await Url.create({
        originalUrl,
        shortUrl,
      });
    }
    return res.json(urlRecord);
  } catch (err) {
    console.error("Error creating short URL:", err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
