import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

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

router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

export default router;

