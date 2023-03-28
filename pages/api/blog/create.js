import dbConnect from "@/db/dbConnect";
import Blog from "@/model/blogModel";

import checkLogin from "@/middleware/checkLogin";

// interface userDataJWT {
//   _id: string | null;
//   name: string | null;
//   email: string | null;
// }

export default async function handler(req, res) {
  try {
    // Connect with Database
    await dbConnect();

    if (req.method === "POST") {
      // CHECK USER IDENTIFICATION
      const isUser = checkLogin(req.headers?.authorization ?? "");

      if (!isUser) {
        //  IF USER NOT FOUND
        res.json({ success: false, message: "User not logged in!!" });
      } else {
        // CREATE NEW USER IN DATABASE
        const newData = await new Blog({
          ...req.body,
          approval: "Pending",
          writter_id: isUser?._id,
          writter_name: isUser?.name,
        });
        newData
          .save()
          .then((data) => {
            res.status(200).json({
              success: true,
              message: "Blog posted successfully!",
              body: data,
            });
          })
          .catch(function (error) {
            // IF ERROR FROM MONGODB
            throw new Error(error.message ?? "Failed to post blog!!!");
          });
      }
    } else {
      throw new Error("Request Method is wrong!!");
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
}
