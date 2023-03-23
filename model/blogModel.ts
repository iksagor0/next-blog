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
      type: String,
    },

    writter_id: {
      type: String,
    },

    writter_name: {
      type: String,
    },

    approval: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Rejected"],
    },

    adminComment: {
      type: String,
    },

    priority: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.blog || mongoose.model("blog", blogSchema);
