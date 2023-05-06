import { GetServerSidePropsContext } from "next";
import { FormProps } from "./index.types";

import { db } from "@/utils/db";
import { doc, getDoc } from "firebase/firestore";

export default function Form({ form }: FormProps) {
  console.log(form);
  return <>hi</>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const docRef = doc(db, "forms", ctx.query.formId as string);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      form: {
        formId: docSnap.data()!.formId,
        created: String(new Date(docSnap.data()!.created.toDate())),
        formMadeUser: docSnap.data()!.formMadeUser,
        askList: docSnap.data()!.askList,
      },
    },
  };
}
