import { GetServerSidePropsContext } from "next";
import * as S from "./index.styles";
import { SurveyResultPageProps, SurveyResultType } from "./index.types";

import { useMemo } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";

import { db } from "@/utils/db";
import { doc, getDoc } from "firebase/firestore";

export default function SurveyResultPage({ results }: SurveyResultPageProps) {
  const 질문모아보기 = useMemo(() => {
    const questionsHash: {
      [questionTitle: string]: string[];
    } = {};

    results
      .map((result) => result.response)
      .forEach((answer) =>
        answer.forEach((question) => {
          if (!questionsHash[question.questionTitle])
            questionsHash[question.questionTitle] = [];
          questionsHash[question.questionTitle].push(question.answer);
        })
      );

    return questionsHash;
  }, [results]);

  return (
    <S.Wrapper>
      <S.Columm>
        <S.Title>응답들</S.Title>
        <S.Body>
          {results.map((응답, index) => (
            <S.AnswerWrapper key={index}>
              <S.Respondent>{`응답자 : ${응답.respondent}`}</S.Respondent>
              {응답.response.map((question, idx) => (
                <S.QuestionWrapper key={idx}>
                  <S.QuestionTitle>{`질문 ${idx + 1} : ${
                    question.questionTitle
                  }`}</S.QuestionTitle>
                  <S.Answer>{`답변 : ${question.answer}`}</S.Answer>
                </S.QuestionWrapper>
              ))}
            </S.AnswerWrapper>
          ))}
        </S.Body>
      </S.Columm>
      <S.Columm>
        <S.Title>모아보기</S.Title>
        <S.CollectBody>
          {Object.entries(질문모아보기).map(([질문, 답변들], index) => (
            <S.QuestionWrapper key={index}>
              <S.QuestionTitle>{`질문 ${index + 1} : ${질문}`}</S.QuestionTitle>
              {답변들.map((answer, idx) => (
                <S.Answer key={idx}>{`답변 ${idx + 1} : ${answer}`}</S.Answer>
              ))}
            </S.QuestionWrapper>
          ))}
        </S.CollectBody>
      </S.Columm>
    </S.Wrapper>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let results: SurveyResultType[] = [];

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session?.user?.email === ctx.query.email) {
    const docRef = doc(db, "responses", ctx.query.surveyId as string);
    const docSnap = await getDoc(docRef);

    for (const data in docSnap.data()!) {
      results.push(docSnap.data()![data]);
    }
  } else {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      results: results,
    },
  };
}
