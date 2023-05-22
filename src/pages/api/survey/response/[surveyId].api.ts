import { db } from "@/utils/db";
import { doc, updateDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

import { v4 } from "uuid";

type Data = {
  status: string;
};

export default async function surveyResponseHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const docRef = doc(db, "responses", req.query.surveyId as string);

    const uuid = v4();

    await updateDoc(docRef, {
      [uuid]: JSON.parse(req.body),
    });

    res.status(201).json({ status: "응답폼 제출 성공" });
  } else {
    res.status(401).json({ status: "BAD REQUEST: 401" });
  }
}
