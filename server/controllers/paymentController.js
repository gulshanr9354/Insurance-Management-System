const Payment = require("../models/Payment");

// Add Payment
const addPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate({
      path: "policy",
      populate: {
        path: "customer",
      },
    });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Payment
const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Payment
const deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Payment Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addPayment,
  getPayments,
  updatePayment,
  deletePayment,
};