import { db } from "@/utils/db";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

export default async function formHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const docRef = doc(db, "answers", req.query.formId as string);

    await updateDoc(docRef, {
      answerList: arrayUnion(JSON.parse(req.body)),
    });
  }
  res.status(201).json({ status: "BAD REQUEST: 401" });
}
