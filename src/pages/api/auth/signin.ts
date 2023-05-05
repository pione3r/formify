import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(await getServerSession(req, res, authOptions));
  res.status(200).json({ name: "John Doe" });
}
