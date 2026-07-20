const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
  addCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customerController");

router.post("/", protect, addCustomer);
router.get("/", protect, getCustomers);
router.put("/:id", protect, updateCustomer);
router.delete("/:id", protect, deleteCustomer);

module.exports = router; 