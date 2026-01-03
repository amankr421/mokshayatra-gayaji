// 

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

/*
POST → Save new booking
URL: http://localhost:3000/api/bookings
*/
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.json({
      success: true,
      message: "Booking saved successfully",
      data: booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to save booking"
    });
  }
});

/*
GET → Admin panel fetch
URL: http://localhost:3000/api/bookings/all
*/
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
