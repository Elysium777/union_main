const express = require("express");

const {
  getNotification,
  sendPushNotification,
} = require("../controllers/notificationController");
const initializeUserMiddleware = require("../middleware/initializeUser");

const router = express.Router();

router.get("/", initializeUserMiddleware, getNotification);
router.post("/", initializeUserMiddleware, sendPushNotification);

module.exports = router;
