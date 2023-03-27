import dbConnect from "@/db/dbConnect";
import Blog from "@/model/blogModel";

import checkLogin from "@/middleware/checkLogin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      // Connect with Database
      await dbConnect();

      const isUser = checkLogin(req.headers?.authorization || "");

      if (!isUser) {
        //  IF USER NOT FOUND
        throw new Error("User not logged in!!");
      } else if (isUser?.role !== "ADMIN") {
        // ONLY ADMIN CAN UPDATE BLOG
        throw new Error("Only ADMIN can APPROVE the blog!!!");
      } else {
        // DELETE DATA ID FROM QUERY
        const deletedData = await Blog.findByIdAndDelete(req.query?._id);

        // SEND RESPONSE
        res.status(200).json({
          success: true,
          message: `Blogs Deleted successfully!`,
          deletedData,
        });
      }
    } else {
      // FOR WRONG RES METHOD
      throw new Error("Request Method is wrong!!");
    }
  } catch (error: any) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}
