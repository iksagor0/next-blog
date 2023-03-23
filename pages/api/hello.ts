// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

function name() {
  console.log("Sagor");
}


type Data = {
  name: string;
};

type Req = NextApiRequest;
type Res = NextApiResponse<Data>;

export default function handler(req: Req, res: Res) {
  res.status(200).json({ name: "John Doe" });
}
