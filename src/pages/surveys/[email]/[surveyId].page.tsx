import { GetServerSidePropsContext } from "next";
import * as S from "./index.styles";
import { SurveyResultPageProps, SurveyResultType } from "./index.types";

import { useMemo, useState } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";

import { db } from "@/utils/db";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";

export default function SurveyResultPage({
  surveyTitle,
  results,
}: SurveyResultPageProps) {
  const 질문모아보기 = useMemo(() => {
    const questionsHash: {
      [questionTitle: string]: {
        questionId: string;
        answers: string[];
      };
    } = {};

    results
      .map((result) => result.response)
      .forEach((answer) =>
        answer.forEach((question) => {
          if (!questionsHash[question.data.questionTitle])
            questionsHash[question.data.questionTitle] = {
              questionId: question.questionId,
              answers: [],
            };
          questionsHash[question.data.questionTitle].answers.push(
            question.answer
          );
        })
      );

    return questionsHash;
  }, [results]);

  const [viewWay, setViewWay] = useState("summary");

  return (
    <>
      <Head>
        <title>{surveyTitle}</title>
      </Head>
      <S.Wrapper>
        <S.HeaderWrapper>
          <S.TitleWrapper>
            <S.Title>{surveyTitle}</S.Title>
          </S.TitleWrapper>
          <S.ViewWaysNavBar>
            <S.ViewWayButton
              isClicked={viewWay === "summary"}
              onClick={() => setViewWay("summary")}
            >
              요약
            </S.ViewWayButton>
            <S.ViewWayButton
              isClicked={viewWay === "separate"}
              onClick={() => setViewWay("separate")}
            >
              응답별로 보기
            </S.ViewWayButton>
          </S.ViewWaysNavBar>
        </S.HeaderWrapper>
        {viewWay === "summary" && (
          <S.SummaryWrapper>
            <S.CollectBody>
              {Object.entries(질문모아보기).map(([질문, 답변들], 질문Index) => (
                <S.QuestionWrapper key={질문Index}>
                  <S.QuestionHeaderWrapper>
                    <S.QuestionTitle>{질문}</S.QuestionTitle>
                    <S.AnswersCount>{`응답 ${답변들.answers.length}개`}</S.AnswersCount>
                  </S.QuestionHeaderWrapper>
                  {답변들.answers.map((answer, answerIdx) => (
                    <S.Answer key={answerIdx}>{answer}</S.Answer>
                  ))}
                </S.QuestionWrapper>
              ))}
            </S.CollectBody>
          </S.SummaryWrapper>
        )}
        {viewWay === "separate" && (
          <S.Body>
            {results.map((응답, index) => (
              <S.AnswerWrapper key={index}>
                <S.Respondent>{응답.respondent}</S.Respondent>
                {응답.response.map((question, idx) => (
                  <S.QuestionWrapper key={idx}>
                    <S.QuestionHeaderWrapper>
                      <S.QuestionTitle>
                        {question.data.questionTitle}
                      </S.QuestionTitle>
                    </S.QuestionHeaderWrapper>
                    <S.Answer>{question.answer}</S.Answer>
                  </S.QuestionWrapper>
                ))}
              </S.AnswerWrapper>
            ))}
          </S.Body>
        )}
      </S.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let results: SurveyResultType[] = [];

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  const surveyDocRef = doc(db, "surveys", ctx.query.surveyId as string);
  const surveyDocSnap = await getDoc(surveyDocRef);

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
      surveyTitle: surveyDocSnap.data()!.surveyTitle,
      results: results,
    },
  };
}
