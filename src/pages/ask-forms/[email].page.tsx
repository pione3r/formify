import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import * as S from "./index.styles";
import { AskFormType, FormsProps } from "./index.types";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth].api";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/db";

export default function AskForms({ forms }: FormsProps) {
  return (
    <>
      <Head>
        <title>내가 만든 질문폼들</title>
      </Head>
      <S.Wrapper>
        <S.Title>내가 만든 질문폼들</S.Title>
        <S.Body>
          {forms.map((form) => (
            <S.FormWrapper key={form.created}>
              <S.FormSubWrapper
                href={`/ask-forms/${form.askFormMaker}/${form.askFormId}`}
              >
                <S.FormHeader>
                  <S.Created>{form.created}</S.Created>
                  <S.FormMaker>{form.askFormMaker}</S.FormMaker>
                </S.FormHeader>
                <S.QuestionsWrapper>
                  {form.questions.map((question) => (
                    <S.QuestionWrapper key={question.questionId}>
                      <S.QuestionTitle>{`질문 ${question.questionId} : ${question.questionTitle}`}</S.QuestionTitle>
                    </S.QuestionWrapper>
                  ))}
                </S.QuestionsWrapper>
              </S.FormSubWrapper>
              <S.LinkCopyButton
                onClick={() => {
                  window.navigator.clipboard
                    .writeText(form.answerFormLink)
                    .then(() =>
                      alert("클립보드에 응답 링크가 복사되었습니다.")
                    );
                }}
              >
                응답 링크 복사하기
              </S.LinkCopyButton>
            </S.FormWrapper>
          ))}
        </S.Body>
      </S.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const forms: AskFormType[] = [];

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session?.user?.email === ctx.query.email) {
    const formsCollection = collection(db, "askForms");

    const q = query(
      formsCollection,
      where("askFormMaker", "==", ctx.query.email)
    );

    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      forms.push({
        askFormId: doc.data().askFormId,
        created: String(new Date(doc.data().created.toDate())),
        askFormMaker: doc.data().askFormMaker,
        questions: doc.data().questions,
        answerFormLink: doc.data().answerFormLink,
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
