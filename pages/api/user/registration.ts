import dbConnect from "@/db/dbConnect";
import User from "@/model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect with Database
    await dbConnect();

    if (req.method === "POST") {
      const { name, email, password } = req.body;

      // ENCRYPT USER PASSWORD
      const encryptedPass = await bcrypt.hash(password, 10);

      // IF USER EXIST ALREADY
      const findUser = await User.findOne({ email });
      if (findUser) {
        res.json({
          success: false,
          message: "Already exist a user on this email!!",
        });
        return false;
      }

      // CREATE NEW USER IN DATABASE
      const newData = await new User({ name, email, password: encryptedPass });
      newData.save();

      // GENERATE JTW TOKEN AND SEND RESPONSE
      const token = jwt.sign(
        { name, email },
        process.env.JWT_TOKEN_PRIVATE_KEY || ""
      );

      res.status(200).json({
        success: true,
        message: "Registration Successful!",
        body: newData,
        token,
      });
    } else {
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
