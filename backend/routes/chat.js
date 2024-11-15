const express = require("express");
const {
  createGroupChat,
  joinGroupChat,
  leaveGroupChat,
} = require("../controllers/chatController");
const initializeUserMiddleware = require("../middleware/initializeUser");
const router = express.Router();

router.post("/create", initializeUserMiddleware, createGroupChat);
router.post("/join", initializeUserMiddleware, joinGroupChat);
router.post("/leave", initializeUserMiddleware, leaveGroupChat);

module.exports = router;
