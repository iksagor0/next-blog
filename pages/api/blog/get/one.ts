import dbConnect from "@/db/dbConnect";
import Blog from "@/model/blogModel";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // Connect with Database
      await dbConnect();

      const blog_id = req.query;

      //   READING DATA
      const data = await Blog.findOne(req.query);

      if (data?.approval !== "Approved") {
        res.json({
          success: false,
          message: "Blog is not Approved by admin!",
        });
      } else {
        // SEND AS RESPONSE
        res.json({
          success: true,
          message: "Data fetched successfully!",
          body: data,
          writter: "Annonymas",
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
