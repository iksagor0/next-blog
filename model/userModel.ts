import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    photo: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.user || mongoose.model("user", UserSchema);
