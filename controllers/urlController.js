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

exports.redirectToOrginalUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;

  try {
    const analyticsData = {
      date: new Date(),
      ip: req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
    };

    const result = await Url.findOneAndUpdate(
      { shortUrl },
      { $push: { analytics: analyticsData } }
    );
    if (!result) {
      return res.status(400).json({
        message: "Invalid URL",
      });
    }
    return res.redirect(result.originalUrl);
  } catch (err) {
    console.error("Error redirecting to original URL:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
