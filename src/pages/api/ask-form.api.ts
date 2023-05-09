import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth].api";

import { setDoc, doc } from "@firebase/firestore";
import { db } from "@/utils/db";

import { v4 } from "uuid";

export default async function askFormHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    // 질문폼 저장
    if (req.method === "POST") {
      const parsed질문리스트 = JSON.parse(req.body);

      const uuid = v4();

      await setDoc(doc(db, "askForms", uuid), {
        askFormId: uuid,
        created: new Date(),
        askFormMaker: session.user?.email,
        questions: parsed질문리스트,
        answerFormLink:
          process.env.NODE_ENV === "production"
            ? `${process.env.NEXT_ANSWER_FORM_LINK_ROOT_PROD}/${uuid}`
            : `${process.env.NEXT_ANSWER_FORM_LINK_ROOT_DEV}/${uuid}`,
      });

      await setDoc(doc(db, "answerForms", uuid), {});

      res.status(201).json({ status: "질문폼 생성 성공" });
    }
  } else {
    res.status(401).json({ status: "BAD REQUEST 401" });
  }
}
