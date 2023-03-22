import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title should be blank!!"],
    },

    image: {
      type: String,
      default: "",
    },

    shortDes: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: [true, "Description should be blank!!"],
    },

    category: {
      type: Array,
      default: [],
    },

    approval: {
      type: Boolean,
      default: false,
    },

    writter: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Admin || mongoose.model("Admin", blogSchema);
