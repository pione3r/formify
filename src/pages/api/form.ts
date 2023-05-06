import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

import { collection, setDoc, doc, getDoc, addDoc } from "@firebase/firestore";
import { db } from "@/utils/db";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);

  if (session === null) res.status(401).json({ status: "BAD REQUEST: 401" });
  if (session !== null) {
    if (req.method === "GET") {
      res.status(200).json({ status: "GET" });
    }

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
  }
}
