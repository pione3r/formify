import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import * as S from "./index.styles";
import { SurveyType, SurveysPageProps } from "./index.types";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth].api";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/db";
import { useCallback } from "react";

export default function SurveysPage({ surveys }: SurveysPageProps) {
  const getYYYYMMDD = useCallback((date: string) => {
    const copiedDate = new Date(date);

    return `${copiedDate.getFullYear()}. ${
      copiedDate.getMonth() + 1
    }. ${copiedDate.getDate()}`;
  }, []);

  return (
    <>
      <Head>
        <title>내가 만든 설문</title>
      </Head>
      <S.Wrapper>
        <S.Title>최근 설문들</S.Title>
        <S.SurveysWrapper>
          {surveys.map((survey) => (
            <S.SurveyLink
              key={survey.surveyId}
              href={`/surveys/${survey.surveyMaker}/${survey.surveyId}`}
            >
              <S.SurveyWrapper>
                <S.Created>{getYYYYMMDD(survey.created)}</S.Created>
                <S.SurveyTitle>{survey.surveyTitle}</S.SurveyTitle>
                <S.ClipBoardCopyButton
                  onClick={(event) => {
                    event.preventDefault();
                    window.navigator.clipboard
                      .writeText(survey.responseFormLink)
                      .then(() =>
                        alert("클립보드에 응답 링크가 복사되었습니다.")
                      );
                  }}
                >
                  응답 링크 복사하기
                </S.ClipBoardCopyButton>
              </S.SurveyWrapper>
            </S.SurveyLink>
          ))}
        </S.SurveysWrapper>
      </S.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const surveys: SurveyType[] = [];

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session?.user?.email === ctx.query.email) {
    const surveysCollection = collection(db, "surveys");

    const q = query(
      surveysCollection,
      where("surveyMaker", "==", ctx.query.email)
    );

    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      surveys.push({
        surveyId: doc.data().surveyId,
        created: String(new Date(doc.data().created.toDate())),
        surveyMaker: doc.data().surveyMaker,
        surveyTitle: doc.data().surveyTitle,
        responseFormLink: doc.data().responseFormLink,
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
      surveys: surveys,
    },
  };
}
