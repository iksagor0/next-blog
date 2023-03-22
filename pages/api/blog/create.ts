import dbConnect from "@/db/dbConnect";
import Blog from "@/model/blogModel";

import checkLogin from "@/middleware/checkLogin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect with Database
    await dbConnect();

    if (req.method === "POST") {
      // CHECK USER IDENTIFICATION
      const isUser = checkLogin(req.headers?.authorization || "");
      console.log(isUser);

      if (!isUser) {
        //  IF USER NOT FOUND
        res
          .status(400)
          .json({ success: false, message: "User not logged in!!" });
      } else {
        // CREATE NEW USER IN DATABASE
        const newData = await new Blog({
          ...req.body,
          approval: "Pending",
          writter: {
            name: isUser?.name,
            email: isUser?.email,
          },
        });
        newData
          .save()
          .then((data: object) => {
            res.status(200).json({
              success: true,
              message: "Blog posted successfully!",
              body: data,
            });
          })
          .catch(function (error: any) {
            // IF ERROR FROM MONGODB
            res.status(200).json({
              success: false,
              message: "Failed to post blog!!!",
              body: error.message,
            });
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
