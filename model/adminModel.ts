import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
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

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
