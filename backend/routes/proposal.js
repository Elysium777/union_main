const express = require("express");
const {
  getProposal,
  getAllProposals,
  createNewProposal,
} = require("../controllers/proposalController");
const initializeUserMiddleware = require("../middleware/initializeUser");
const router = express.Router();

router.get(
  "/metadata/:chainId/:address/:proposalId",
  initializeUserMiddleware,
  getProposal
);

router.get("/all/:chainId/:address", initializeUserMiddleware, getAllProposals);

router.post(
  "/create/:chainId/:address",
  initializeUserMiddleware,
  createNewProposal
);

module.exports = router;
