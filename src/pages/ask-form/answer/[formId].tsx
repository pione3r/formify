import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import * as S from "./index.styles";

import { db } from "@/utils/db";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { FormAnswerProps } from "./index.types";
import { useState } from "react";

export default function FormAnswer({ form }: FormAnswerProps) {
  const [answerList, setAnswerList] = useState<
    { id: string; askTitle: string; answer: string }[]
  >(
    form.askList.map((item) => ({
      id: item.id,
      askTitle: item.askTitle,
      answer: "",
    }))
  );

  return (
    <>
      <Head>
        <title>응답 폼</title>
      </Head>
      <S.Wrapper>
        <S.Header>
          <S.Created>{form.created}</S.Created>
          <S.Title>{`${form.formMadeUser}님의 질문폼`}</S.Title>
        </S.Header>
        <S.AskListWrapper>
          {form.askList.map((ask, index) => (
            <S.AskWrapper key={ask.id}>
              <S.AskTitle>{`질문 ${index + 1} : ${ask.askTitle}`}</S.AskTitle>
              <S.AnswerWrapper>
                <S.AnswerTitle>답변 : </S.AnswerTitle>
                <S.Answer
                  onChange={(event) =>
                    setAnswerList((prev) =>
                      prev.map((item) =>
                        item.id === ask.id
                          ? {
                              id: item.id,
                              askTitle: item.askTitle,
                              answer: event.target.value,
                            }
                          : { ...item }
                      )
                    )
                  }
                />
              </S.AnswerWrapper>
            </S.AskWrapper>
          ))}
        </S.AskListWrapper>
        <S.AnswerButton
          onClick={async () => {
            fetch(`http://localhost:3000/api/answer/${form.formId}`, {
              method: "POST",
              body: JSON.stringify({ respondent: "익명", answers: answerList }),
            });
          }}
        >
          답변 제출하기
        </S.AnswerButton>
      </S.Wrapper>
    </>
  );
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
