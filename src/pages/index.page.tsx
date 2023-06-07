import Head from "next/head";

import { useState } from "react";

import * as S from "./index.styles";

import { SurveyFlow } from "@/components/SurveyFlow";

import type { QuestionEdge, QuestionNode } from "@/types/general";

const initialQuestionNodes = [
  {
    questionId: "start",
    data: { questionTitle: "" },
    position: { x: 100, y: 100 },
  },
  {
    questionId: "end",
    data: { questionTitle: "" },
    position: { x: 1600, y: 500 },
  },
];

export default function MainPage() {
  const [questionNodes, setQuestionNodes] =
    useState<QuestionNode[]>(initialQuestionNodes);

  const [questionEdges, setQuestionEdges] = useState<QuestionEdge[]>([]);
  return (
    <>
      <Head>
        <title>Formify</title>
      </Head>
      <S.Wrapper>
        <S.DescriptionWrapper>
          <S.DescriptionSubTitle>
            간단한 퀴즈부터, 설문 조사 등 응답이 필요한 경우 쉽게 만드세요
          </S.DescriptionSubTitle>
          <S.DescriptionTitle>Formify</S.DescriptionTitle>
        </S.DescriptionWrapper>
        <S.ExampleWrapper>
          <S.ExampleTitle>Example</S.ExampleTitle>
          <S.ExampleBody>
            <SurveyFlow
              questionNodes={questionNodes}
              questionEdges={questionEdges}
              setQuestionNodes={setQuestionNodes}
              setQuestionEdges={setQuestionEdges}
            />
          </S.ExampleBody>
        </S.ExampleWrapper>
      </S.Wrapper>
    </>
  );
}
