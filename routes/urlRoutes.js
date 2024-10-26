const express = require("express");
const {
  createShortUrl,
  redirectToOrginalUrl,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/shorten", createShortUrl);

router.get("/:shortUrl", redirectToOrginalUrl);

module.exports = router;
