import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "ADMIN",
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.admin || mongoose.model("admin", adminSchema);
