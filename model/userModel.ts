import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "USER",
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
