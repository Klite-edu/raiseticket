import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    issue: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "pending" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" }, 
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
