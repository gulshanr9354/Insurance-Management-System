const Claim = require("../models/Claim");

// Add Claim
const addClaim = async (req, res) => {
  try {
    const claim = await Claim.create(req.body);
    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Claims
const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find().populate({
      path: "policy",
      populate: {
        path: "customer",
      },
    });

    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Claim
const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Claim
const deleteClaim = async (req, res) => {
  try {
    await Claim.findByIdAndDelete(req.params.id);

    res.json({
      message: "Claim Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addClaim,
  getClaims,
  updateClaim,
  deleteClaim,
};