import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

// interface userDataJWT {
//   _id: string | null;
//   name: string | null;
//   email: string | null;
// }

export default function checklogin(token: string) {
  const user = jwt.decode(token) as JwtPayload;

  return user;
}
