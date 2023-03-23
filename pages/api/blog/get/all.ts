import dbConnect from "@/db/dbConnect";
import Blog from "@/model/blogModel";

import checkLogin from "@/middleware/checkLogin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // Connect with Database
      await dbConnect();

      const isUser = checkLogin(req.headers?.authorization || "");

      if (!isUser) {
        //  IF USER NOT FOUND
        res
          .status(400)
          .json({ success: false, message: "User not logged in!!" });
      } else if (isUser?.role !== "ADMIN") {
        //   IF USER NOT = ADMIN
        res.status(500).json({
          success: false,
          message: "Only ADMIN can get all blogs!!",
        });
      } else {
        //   READING DATA AND SEND AS RESPONSE
        const data = await Blog.find(req.query)
          .sort({ createdAt: -1 })
          .limit(req.body?.limit)
          .skip(req.body?.skip);

        console.log(data.length);
        res.status(200).json({
          success: true,
          message: "Data fetched successfully!",
          body: data,
        });
      }
    } else {
      // FOR WRONG RES METHOD
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
