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

        res.json({ success: false, message: "User not logged in!!" });
      } else if (isUser?.role !== "ADMIN") {
        // ONLY ADMIN CAN UPDATE BLOG
        res.json({
          success: false,
          message: "Only ADMIN can APPROVE the blog!!",
        });
      } else {
        // DECLARE ALL ID FROM BODY._ID
        let ids = req.body?._id ?? [];
        const blogs = await Blog.find({
          _id: {
            $in: ids,
          },
        });

        // BULK UPDATING BY IDs
        blogs.map(async (blog) => {
          return await Blog.findByIdAndUpdate(blog._id, req.body);
        });

        // SEND RESPONSE
        res.status(200).json({
          success: true,
          message: `Blogs ${req.body?.approval} successfully!`,
        });
      }
    } else {
      // FOR WRONG RES METHOD
      res.json({
        success: false,
        message: "Request Method is wrong!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "There is a server-side error!!",
    });
  }
}
