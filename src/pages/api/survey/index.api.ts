import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth].api";

import { setDoc, doc } from "@firebase/firestore";
import { db } from "@/utils/db";

import { v4 } from "uuid";

export default async function surveyEditHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    // 질문폼 저장
    if (req.method === "POST") {
      const { surveyTitle, survey } = JSON.parse(req.body);

      const uuid = v4();

      await setDoc(doc(db, "surveys", uuid), {
        surveyId: uuid,
        created: new Date(),
        surveyMaker: session.user?.email,
        surveyTitle: surveyTitle,
        survey: survey,
        responseFormLink:
          process.env.NODE_ENV === "production"
            ? `${process.env.NEXT_ANSWER_FORM_LINK_ROOT_PROD}/survey/${uuid}/response`
            : `${process.env.NEXT_ANSWER_FORM_LINK_ROOT_DEV}/survey/${uuid}/response`,
      });

      await setDoc(doc(db, "responses", uuid), {});

      res.status(201).json({ status: "질문폼 생성 성공" });
    }
  } else {
    res.status(401).json({ status: "BAD REQUEST 401" });
  }
}
