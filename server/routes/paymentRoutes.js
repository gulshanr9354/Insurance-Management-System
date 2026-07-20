const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addPayment,
  getPayments,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");


router.post("/", protect, addPayment);
router.get("/", protect, getPayments);
router.put("/:id", protect, updatePayment);
router.delete("/:id", protect, deletePayment);

module.exports = router;