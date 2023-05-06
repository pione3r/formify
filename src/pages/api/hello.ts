import type { NextApiRequest, NextApiResponse } from "next";

import { setDoc, doc, getDoc } from "@firebase/firestore";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const session = await getServerSession(req, res, authOptions);

  // if (session !== null) {
  //   if ((await getDoc(doc(db, "users", session.user.email))).exists()) {
  //     res
  //       .status(401)
  //       .json({ status: "이미 존재하는 유저거나, 생성할 수 없습니다." });
  //     return;
  //   } else {
  //     setDoc(doc(db, "users", session.user.email), session.user);
  //     res.status(201).json({ status: "데이터 저장 성공" });
  //   }
  // }
}
