import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

import { collection, addDoc } from "@firebase/firestore";
import { db } from "@/utils/db";

type Data = {
  status: string;
};

export default async function formHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    // 폼 저장
    if (req.method === "POST") {
      const parsed질문리스트 = JSON.parse(req.body);

      addDoc(collection(db, "forms"), {
        formMadeUser: session.user?.email,
        askList: parsed질문리스트,
        created: new Date(),
      });
      res.status(201).json({ status: "POST" });
    }
  } else {
    res.status(401).json({ status: "BAD REQUEST: 401" });
  }
}
