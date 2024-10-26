const express = require("express");
const {
  createShortUrl,
  redirectToOrginalUrl,
  getAnalytics,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/shorten", createShortUrl);

router.get("/:shortUrl", redirectToOrginalUrl);

router.get("/:shortUrl/analytics", getAnalytics);

module.exports = router;
