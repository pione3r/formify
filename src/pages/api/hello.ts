import type { NextApiRequest, NextApiResponse } from "next";

import { collection, getDocs } from "@firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    id = doc.id;
    data = doc.data().askTitle;
  });

  res.status(200).json({ name: "John Doe", data: data });
}
