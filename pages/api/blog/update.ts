import dbConnect from "@/db/dbConnect";
import Blog from "@/model/blogModel";

import checkLogin from "@/middleware/checkLogin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      // Connect with Database
      await dbConnect();

      const isUser = checkLogin(req.headers?.authorization || "");

      if (!isUser) {
        //  IF USER NOT FOUND
        res
          .status(400)
          .json({ success: false, message: "User not logged in!!" });
      } else if (isUser?.role !== "ADMIN") {
        res.status(500).json({
          success: false,
          message: "Only ADMIN can APPROVE the blog!!",
        });
      } else {
        let ids = req.body?._id ?? [];
        const blogs = await Blog.find({
          _id: {
            $in: ids,
          },
        });

        blogs.map(async (blog) => {
          return await Blog.findByIdAndUpdate(blog._id, req.body);
        });

        res.status(200).json({
          success: true,
          message: `Blogs ${req.body?.approval} successfully!`,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "Request Method is wrong!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "There is a server-side error!!",
    });
  }
}
