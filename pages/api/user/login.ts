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
      // FIND USER AS REQ EMAIL
      const findUser = await User.findOne({ email: req.body?.email });

      console.log(findUser);

      if (findUser) {
        const { name, email, password, status, role, _id } = findUser;
        // COMPARE REQ PASSWORD WITH USER DB PASSOWRD
        const decryptedPass = await bcrypt.compare(
          req.body?.password,
          findUser?.password
        );

        if (decryptedPass) {
          // IF ALL OK THEN GENERATE JWT AND SEND RESPONSE
          const token = jwt.sign(
            { _id, name, email, role, status },
            process.env.JWT_TOKEN_PRIVATE_KEY || ""
          );

          res.status(200).json({
            success: true,
            message: "Login Successful!",
            body: { _id, name, email, role },
            token,
          });
        } else {
          // IF PASSWORD NOT MATCHED
          res.status(200).json({
            success: false,
            message: "Password doesn't match!!",
          });
        }
      } else {
        // IF USER NOT FOUND IN DATABASE
        res.status(200).json({
          success: false,
          message: "User Not Found!!",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "Request Method is wrong!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: "There is a server-side error!!",
    });
  }
}
