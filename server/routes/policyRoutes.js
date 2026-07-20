const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addPolicy,
  getPolicies,
  deletePolicy,
  updatePolicy,
} = require("../controllers/policyController");

router.post("/", protect, addPolicy);
router.get("/", protect, getPolicies);
router.put("/:id", protect, updatePolicy);
router.delete("/:id", protect, deletePolicy);

module.exports = router;