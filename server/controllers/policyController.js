const Policy = require("../models/Policy");

// Add Policy
const addPolicy = async (req, res) => {
  try {
    const policy = await Policy.create(req.body);
    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Policies
const getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().populate("customer");
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Policy
const deletePolicy = async (req, res) => {
  try {
    await Policy.findByIdAndDelete(req.params.id);
    res.json({ message: "Policy Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Policy
const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(policy);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addPolicy,
  getPolicies,
  deletePolicy,
  updatePolicy,
};