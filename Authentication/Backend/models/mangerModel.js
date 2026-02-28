import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salary: { type: String, required: true },
  designation: { type: String, required: true },
  phone: { type: String },
  status: { type: Boolean, default: true },
  created_date: { type: String },
  updated_date: { type: String }
});

export const managerCollection = mongoose.model("Manager", managerSchema);