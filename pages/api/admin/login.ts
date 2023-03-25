import dbConnect from "@/db/dbConnect";
import Admin from "@/model/adminModel";
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
      const findUser = await Admin.findOne({ email: req.body?.email });

      if (findUser) {
        const { name, email, password, role, _id } = findUser;
        // COMPARE REQ PASSWORD WITH USER DB PASSOWRD
        const decryptedPass = await bcrypt.compare(
          req.body?.password,
          findUser?.password
        );

        if (decryptedPass) {
          // IF ALL OK THEN GENERATE JWT AND SEND RESPONSE
          const token = jwt.sign(
            { name, email, role, _id },
            process.env.JWT_TOKEN_PRIVATE_KEY || ""
          );

          res.status(200).json({
            success: true,
            message: "Login Successful!",
            body: { name, email, role, _id },
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
