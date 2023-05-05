import type { NextApiRequest, NextApiResponse } from "next";

import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/utils/db";

type Data = {
  name: string;
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let id = "";
  let data = "";
  const formCollection = collection(db, "form");

  const query = await getDocs(formCollection);

  query.forEach((doc) => {
    console.log(doc.data());
  });

  res.status(200).json({ name: "John Doe", data: data });
}
