const express = require("express");
const {
  getDAO,
  getAllDao,
  uploadDAO,
} = require("../controllers/daoController");
const router = express.Router();

router.get("/metadata/:chainId/:address", getDAO);

router.get("/all/:chainId", getAllDao);

router.post("/upload", uploadDAO);

module.exports = router;
