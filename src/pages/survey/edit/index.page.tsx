import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import * as S from "./index.styles";

import { useQuestions } from "@/hooks/useQuestions";
import { useDraggable } from "@/hooks/useDraggable";
import { usePickedFormPosSwitch } from "@/hooks/usePickedFormPosSwitch";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";

import { Backend_API_URL } from "@/common/url";

import { DraggableItem } from "@/components/DraggableItem";

import { SimpleTextQuestionForm } from "@/components/QuestionForm/SimpleTextQuestionForm";
import { RadioButtonQuestionForm } from "@/components/QuestionForm/RadioButtonQuestionForm";
import { CheckBoxQuestionForm } from "@/components/QuestionForm/CheckBoxQuestionForm";
import { useState } from "react";

export default function SurveyEditPage() {
  const router = useRouter();

  const [설문제목, set설문제목] = useState("");

  const {
    질문리스트,
    질문추가,
    질문제목수정,
    질문삭제,
    질문순서바꾸기,
    선택지추가,
    선택지내용수정,
    다음질문으로이동,
  } = useQuestions();

  const { 요소추가 } = useDraggable(질문추가);

  const { 폼순서바꾸기 } = usePickedFormPosSwitch(질문순서바꾸기);

  return (
    <>
      <Head>
        <title>폼 만들기</title>
      </Head>
      <S.Wrapper>
        <S.ColumnLeft>
          <S.SurveyTitleInputWrapper>
            <S.SurveyTitleInput
              placeholder="설문 제목을 입력하세요."
              value={설문제목}
              onChange={(event) => set설문제목(event.target.value)}
            />
          </S.SurveyTitleInputWrapper>
          <S.DropZone className="drop-zone">
            {질문리스트.map((질문, questionIndex, origin) => (
              <DraggableItem
                key={질문.questionId}
                className="draggable-item"
                data-index={questionIndex}
                onMouseDown={폼순서바꾸기}
                요소삭제={질문삭제}
              >
                {질문.questionType === "text" && (
                  <SimpleTextQuestionForm
                    질문순서={questionIndex}
                    질문제목={질문.questionTitle}
                    질문제목수정={질문제목수정}
                    질문아이디리스트={origin.map(
                      (question) => question.questionId
                    )}
                    다음질문={질문.nextQuestionId}
                    다음질문으로이동={다음질문으로이동}
                  />
                )}
                {질문.questionType === "radio-button" && (
                  <RadioButtonQuestionForm
                    질문순서={questionIndex}
                    질문제목={질문.questionTitle}
                    질문제목수정={질문제목수정}
                    선택지목록={질문.options}
                    선택지추가={선택지추가}
                    선택지내용수정={선택지내용수정}
                    질문아이디리스트={origin.map(
                      (question) => question.questionId
                    )}
                    다음질문={질문.nextQuestionIds}
                    다음질문으로이동={다음질문으로이동}
                  />
                )}
                {질문.questionType === "check-box" && (
                  <CheckBoxQuestionForm
                    질문순서={questionIndex}
                    질문제목={질문.questionTitle}
                    질문제목수정={질문제목수정}
                    선택지목록={질문.options}
                    선택지추가={선택지추가}
                    선택지내용수정={선택지내용수정}
                    질문아이디리스트={origin.map(
                      (question) => question.questionId
                    )}
                    다음질문={질문.nextQuestionId}
                    다음질문으로이동={다음질문으로이동}
                  />
                )}
              </DraggableItem>
            ))}
          </S.DropZone>
        </S.ColumnLeft>

        <S.ColumnRight>
          <S.QuestionPickBoard>
            <S.QuestionTypeButton
              data-question-type="text"
              onMouseDown={요소추가}
              onClick={() => 질문추가("text")}
            >
              단답형
            </S.QuestionTypeButton>
            <S.QuestionTypeButton
              data-question-type="radio-button"
              onMouseDown={요소추가}
              onClick={() => 질문추가("radio-button")}
            >
              단일선택형
            </S.QuestionTypeButton>

            <S.QuestionTypeButton
              data-question-type="check-box"
              onMouseDown={요소추가}
              onClick={() => 질문추가("check-box")}
            >
              다중선택형
            </S.QuestionTypeButton>
          </S.QuestionPickBoard>
          <S.SubmitButton
            onClick={async () => {
              const { status } = await fetch(`${Backend_API_URL}/survey`, {
                method: "POST",
                body: JSON.stringify({
                  surveyTitle: 설문제목,
                  survey: 질문리스트,
                }),
              });
              if (status === 201) {
                alert("질문폼 생성 성공");
                router.replace("/");
              }
              if (status === 401) {
                alert("질문폼 생성 실패");
              }
            }}
          >
            폼 제출
          </S.SubmitButton>
        </S.ColumnRight>
      </S.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session)
    return {
      redirect: {
        destination: "/",
      },
    };

  return { props: {} };
}

{
}
