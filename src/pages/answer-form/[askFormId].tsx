import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import * as S from "./index.styles";
import { AnswerFormProps } from "./index.types";

import { db } from "@/utils/db";
import { doc, getDoc } from "firebase/firestore";

export default function AnswerForm({ askForm }: AnswerFormProps) {
  const router = useRouter();

  const [answers, setAnswers] = useState(
    askForm.questions.map((question) => ({ ...question, answer: "" }))
  );

  return (
    <>
      <Head>
        <title>응답 폼</title>
      </Head>
      <S.Wrapper>
        <S.Header>
          <S.Created>{askForm.created}</S.Created>
          <S.Title>{`${askForm.askFormMaker}님의 질문폼`}</S.Title>
        </S.Header>
        <S.AskFormWrapper>
          {askForm.questions.map((question, index) => (
            <S.QuestionWrapper key={question.questionId}>
              <S.QuestionTitle>{`질문 ${index + 1} : ${
                question.questionTitle
              }`}</S.QuestionTitle>
              <S.AnswerWrapper>
                <S.AnswerTitle>답변 : </S.AnswerTitle>
                <S.Answer
                  onChange={(event) =>
                    setAnswers((answers) =>
                      answers.map((answer) =>
                        answer.questionId === question.questionId
                          ? {
                              ...answer,
                              answer: event.target.value,
                            }
                          : { ...answer }
                      )
                    )
                  }
                />
              </S.AnswerWrapper>
            </S.QuestionWrapper>
          ))}
        </S.AskFormWrapper>
        <S.AnswerButton
          onClick={async () => {
            const { status } = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/answer-form/${askForm.askFormId}`,
              {
                method: "POST",
                body: JSON.stringify({
                  respondent: "익명",
                  answers: answers,
                }),
              }
            );

            if (status === 201) {
              alert("응답폼이 성공적으로 제출 됐습니다.");
              router.replace("/");
            }

            if (status === 401) {
              alert("응답폼 제출에 실패했습니다.");
              return;
            }
          }}
        >
          답변 제출하기
        </S.AnswerButton>
      </S.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const docRef = doc(db, "askForms", ctx.query.askFormId as string);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      askForm: {
        askFormId: docSnap.data()!.askFormId,
        created: String(new Date(docSnap.data()!.created.toDate())),
        askFormMaker: docSnap.data()!.askFormMaker,
        questions: docSnap.data()!.questions,
      },
    },
  };
}
