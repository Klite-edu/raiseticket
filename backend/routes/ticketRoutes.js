import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Create a new ticket
router.post("/tickets", async (req, res) => {
  try {
    const { email, issue, description, priority } = req.body;
    const newTicket = new Ticket({ email, issue, description, priority });
    await newTicket.save();
    res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

// Fetch all tickets
router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

// Update ticket status to "resolved"
router.put("/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status: "resolved", resolvedAt: new Date() },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: "Failed to update ticket" });
  }
});

export default router;
