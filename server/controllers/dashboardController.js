const Customer = require("../models/Customer");
const Policy = require("../models/Policy");
const Claim = require("../models/Claim");
const Payment = require("../models/Payment");

const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalPolicies = await Policy.countDocuments();
    const totalClaims = await Claim.countDocuments();

    const totalPremium = await Payment.aggregate([
      {
        $match: {
          status: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      totalCustomers,
      totalPolicies,
      totalClaims,
      totalPremium:
        totalPremium.length > 0 ? totalPremium[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};