import dbConnect from "@db/dbConnect";
import User from "@model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect with Database
  await dbConnect();

  try {
    if (req.method === "POST") {
      const { name, email, password } = req.body;

      // ENCRYPT USER PASSWORD
      const encryptedPass = await bcrypt.hash(password, 10);

      // const decryptedPass = await bcrypt.compare(
      //   req.body?.password,
      //   encryptedPass
      // );

      // IF USER EXIST ALREADY
      const findUser = await User.findOne({ email });
      if (findUser) {
        res.status(500).json({
          success: false,
          message: "Already exist a user on this email!!",
        });
        return false;
      }

      // CREATE NEW USER IN DATABASE
      const newData = await new User({ name, email, password: encryptedPass });
      newData.save();

      
      // SEND JTW TOKEN TO USER
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
