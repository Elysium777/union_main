const express = require("express");
const {
  getUnion,
  getAllUnion,
  createNewUnion,
  addMemberToUnion,
  removeMemberFromUnion,
  getUnionMembers,
} = require("../controllers/unionController");
const initializeUserMiddleware = require("../middleware/initializeUser");
const router = express.Router();

router.get("/metadata/:chainId/:address", getUnion);

router.get("/all/:chainId/", getAllUnion);

router.post("/create/:chainId", initializeUserMiddleware, createNewUnion);

router.patch(
  "/add/:chainId/:address",
  initializeUserMiddleware,
  addMemberToUnion
);

router.patch(
  "/remove/:chainId/:address",
  initializeUserMiddleware,
  removeMemberFromUnion
);

router.get("/members/:chainId/:address", getUnionMembers);

module.exports = router;
