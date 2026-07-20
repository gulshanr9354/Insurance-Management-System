const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addClaim,
  getClaims,
  updateClaim,
  deleteClaim,
} = require("../controllers/claimController");

router.post("/", protect, addClaim);
router.get("/", protect, getClaims);
router.put("/:id", protect, updateClaim);
router.delete("/:id", protect, deleteClaim);

module.exports = router;