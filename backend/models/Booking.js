const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },

  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },

  travelDate: { type: Date, required: true },
  peopleCount: { type: Number, required: true },

  package: {
    type: {
      type: String,
      enum: ["Silver", "Gold", "Platinum"],
      required: true
    },
    price: { type: Number, required: true }
  },

  payment: {
    type: {
      type: String,
      enum: ["full", "advance"],
      required: true
    },
    paidAmount: Number,
    remainingAmount: Number,
    status: {
      type: String,
      enum: ["pending", "success"],
      default: "pending"
    },
    upiId: { type: String, default: "8734573457@axl" }
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "completed"],
    default: "pending"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
