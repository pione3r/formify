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
import { DummySimpleTextQuestion } from "@/components/DummyQuestionForm/DummySimpleTextQuestionForm";
import { DummyRadioButtonQuestionForm } from "@/components/DummyQuestionForm/DummyRadioButtonQuestionForm";
import { DummyCheckBoxQuestionForm } from "@/components/DummyQuestionForm/DummyCheckBoxQuestionForm";
import { SimpleTextQuestionForm } from "@/components/QuestionForm/SimpleTextQuestionForm";
import { RadioButtonQuestionForm } from "@/components/QuestionForm/RadioButtonQuestionForm";
import { CheckBoxQuestionForm } from "@/components/QuestionForm/CheckBoxQuestionForm";

export default function AskForm() {
  const router = useRouter();

  const {
    질문리스트,
    질문추가,
    질문제목수정,
    질문삭제,
    질문순서바꾸기,
    선택지추가,
    선택지내용수정,
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
          <S.DummyQuestionFormBoardWrapper>
            <S.QuestionFormBoardTitle>
              질문 유형 선택하기
            </S.QuestionFormBoardTitle>
            <S.QuestionFormBoardBody>
              <DraggableItem data-question-type="text" onMouseDown={요소추가}>
                <DummySimpleTextQuestion />
              </DraggableItem>
              <DraggableItem
                data-question-type="radio-button"
                onMouseDown={요소추가}
              >
                <DummyRadioButtonQuestionForm />
              </DraggableItem>
              <DraggableItem
                data-question-type="check-box"
                onMouseDown={요소추가}
              >
                <DummyCheckBoxQuestionForm />
              </DraggableItem>
            </S.QuestionFormBoardBody>
          </S.DummyQuestionFormBoardWrapper>
        </S.ColumnLeft>

        <S.ColumnRight>
          <S.QuestionFormBoardWrapper>
            <S.QuestionFormBoardTitle>질문들</S.QuestionFormBoardTitle>
            <S.QuestionFormBoardBody className="drop-zone">
              {질문리스트.map((질문, questionIndex) => (
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
                    />
                  )}
                </DraggableItem>
              ))}
            </S.QuestionFormBoardBody>

            <S.SubmitButton
              onClick={async () => {
                // const { status } = await fetch(`${Backend_API_URL}/ask-form`, {
                //   method: "POST",
                //   body: JSON.stringify(정렬된질문리스트),
                // });
                // if (status === 201) {
                //   alert("질문폼 생성 성공");
                //   router.replace("/");
                // }
                // if (status === 401) {
                //   alert("질문폼 생성 실패");
                // }

                console.log(질문리스트);
              }}
            >
              폼 제출
            </S.SubmitButton>
          </S.QuestionFormBoardWrapper>
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
