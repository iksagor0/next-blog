import jwt from "jsonwebtoken";

export default function checklogin(token: string) {
  const user = jwt.decode(token);

  return user;
}
