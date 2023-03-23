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

      const data = await Blog.find({ approval: "Approved", ...req.query })
        .sort({
          priority: -1,
          createdAt: -1,
        })
        .limit(req.body?.limit)
        .skip(req.body?.skip);


      res.status(200).json({
        success: true,
        message: "Data fetched successfully!",
        body: data,
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
