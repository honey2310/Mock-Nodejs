import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: true },
  created_date: { type: String },
  updated_date: { type: String }
});

export const authCollection= mongoose.model("Admin", adminSchema);