const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Define Schedule Schema
const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: String,
    isVirtual: {
      type: Boolean,
      default: false,
    },
    meetingLink: String,
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

// Create a new appointment
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      caseId,
      attendees,
      location,
      isVirtual,
      meetingLink,
    } = req.body;

    const schedule = new Schedule({
      title,
      description,
      startTime,
      endTime,
      user: req.user.id,
      caseId,
      attendees,
      location,
      isVirtual,
      meetingLink,
    });

    await schedule.save();

    res.status(201).json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all appointments for a user
router.get("/", auth, async (req, res) => {
  try {
    const schedules = await Schedule.find({
      $or: [{ user: req.user.id }, { attendees: req.user.id }],
    }).sort({ startTime: 1 });

    res.json(schedules);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific appointment
router.get("/:id", auth, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Check if user is authorized to view this schedule
    if (
      schedule.user.toString() !== req.user.id &&
      !schedule.attendees.includes(req.user.id)
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update an appointment
router.put("/:id", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      attendees,
      location,
      isVirtual,
      meetingLink,
    } = req.body;

    let schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Check if user is authorized to update this schedule
    if (schedule.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        startTime,
        endTime,
        attendees,
        location,
        isVirtual,
        meetingLink,
      },
      { new: true }
    );

    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an appointment
router.delete("/:id", auth, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Check if user is authorized to delete this schedule
    if (schedule.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Schedule.deleteOne({ _id: req.params.id });

    res.json({ message: "Schedule removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
