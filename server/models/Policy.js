const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    policyNumber: {
      type: String,
      required: true,
      unique: true,
    },
    policyType: {
      type: String,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);