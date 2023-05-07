import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import * as S from "./index.styles";
import { FormsProps, FormsType } from "./index.types";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/db";

export default function Forms({ forms }: FormsProps) {
  return (
    <>
      <Head>
        <title>내가 만든 질문폼들</title>
      </Head>
      <S.Wrapper>
        <S.Title>내가 만든 질문폼들</S.Title>
        <S.Body>
          {forms.map((form) => (
            <S.FormWrapper key={form.created} href={`/form/${form.formId}`}>
              <S.Created>{form.created}</S.Created>
              <S.FormMaker>{form.formMadeUser}</S.FormMaker>
            </S.FormWrapper>
          ))}
        </S.Body>
      </S.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const forms: FormsType = [];

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session?.user?.email === ctx.query.email) {
    const formsCollection = collection(db, "forms");

    const q = query(
      formsCollection,
      where("formMadeUser", "==", ctx.query.email)
    );

    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      forms.push({
        formId: doc.data().formId,
        created: String(new Date(doc.data().created.toDate())),
        formMadeUser: doc.data().formMadeUser,
        askList: doc.data().askList,
      });
    });
  } else {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      forms: forms,
    },
  };
}
