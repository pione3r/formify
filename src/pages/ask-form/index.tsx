import Head from "next/head";
import { useState } from "react";
import * as S from "./index.styles";

import { QuestionType } from "./index.types";

import { DraggableItem } from "@/components/DraggableItem";
import { DummySimpleTextQuestion } from "@/components/DummyQuestionForm/DummySimpleTextQuestionForm";
import { SimpleTextQuestionForm } from "@/components/QuestionForm/SimpleTextQuestionForm";

import { useDraggable } from "@/hooks/useDraggable";
import { usePickedFormPosSwitch } from "@/hooks/usePickedFormPosSwitch";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { DummyRadioButtonQuestionForm } from "@/components/DummyQuestionForm/DummyRadioButtonQuestionForm";
import { RadioButtonQuestionForm } from "@/components/QuestionForm/RadioButtonQuestionForm";

export default function AskForm() {
  const router = useRouter();

  const [선택된질문리스트, set선택된질문리스트] = useState<QuestionType[]>([]);

  const 질문추가 = (elementId: string) => {
    const newId = Math.max(
      0,
      ...선택된질문리스트.map((질문) => Number.parseInt(질문.questionId))
    );

    if (elementId === "simple-text") {
      set선택된질문리스트((prev) => [
        ...prev,
        {
          questionId: "" + (newId + 1),
          questionType: elementId,
          questionTitle: "",
        },
      ]);
    } else if (elementId === "radio-button") {
      set선택된질문리스트((prev) => [
        ...prev,
        {
          questionId: "" + (newId + 1),
          questionType: elementId,
          questionTitle: "",
          radioButtonOptions: [],
        },
      ]);
    }
  };

  const { onMouseDownHandler } = useDraggable(질문추가);

  const 질문순서바꾸기 = (sourceIdx: number, destinationIdx: number) => {
    const copied질문리스트 = [...선택된질문리스트];
    const moving질문 = copied질문리스트[sourceIdx];
    copied질문리스트.splice(sourceIdx, 1);
    copied질문리스트.splice(destinationIdx, 0, moving질문);
    set선택된질문리스트(copied질문리스트);
  };

  const { 폼순서바꾸기 } = usePickedFormPosSwitch(질문순서바꾸기);

  const 질문제목수정 = (
    event: React.ChangeEvent<HTMLInputElement>,
    질문Id: string
  ) => {
    const 수정한제목 = event.target.value;
    set선택된질문리스트((prev) =>
      prev.map((item) =>
        item.questionId === 질문Id
          ? { ...item, questionTitle: 수정한제목 }
          : { ...item }
      )
    );
  };

  const 선택지추가 = (질문Index: number) => {
    set선택된질문리스트((prev) =>
      prev.map((질문, idx) => {
        if (질문.questionType === "radio-button") {
          if (질문Index === idx) {
            return {
              ...질문,
              radioButtonOptions: [...질문.radioButtonOptions, ""],
            };
          }
          return 질문;
        }
        return 질문;
      })
    );
  };

  const 선택지내용수정 = (
    event: React.ChangeEvent<HTMLInputElement>,
    질문Index: number,
    옵션Index: number
  ) => {
    set선택된질문리스트((prev) =>
      prev.map((질문, idx) => {
        if (질문.questionType === "radio-button") {
          if (질문Index === idx) {
            return {
              ...질문,
              radioButtonOptions: 질문.radioButtonOptions.map(
                (option, 옵션Idx) =>
                  옵션Index === 옵션Idx ? event.target.value : option
              ),
            };
          }
          return 질문;
        }
        return 질문;
      })
    );
  };

  return (
    <>
      <Head>
        <title>폼 만들기</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <S.Wrapper>
        <S.QuestionFormBoardWrapper>
          <S.QuestionFormBoardTitle>
            질문타입 선택 보드
          </S.QuestionFormBoardTitle>
          <S.QuestionFormBoardBody>
            <DraggableItem id="simple-text" onMouseDown={onMouseDownHandler}>
              <DummySimpleTextQuestion />
            </DraggableItem>
            <DraggableItem id="radio-button" onMouseDown={onMouseDownHandler}>
              <DummyRadioButtonQuestionForm />
            </DraggableItem>
          </S.QuestionFormBoardBody>
        </S.QuestionFormBoardWrapper>

        <S.QuestionFormBoardWrapper>
          <S.QuestionFormBoardTitle>선택된 질문들</S.QuestionFormBoardTitle>
          <S.QuestionFormBoardBody id="picked-askform-board">
            {선택된질문리스트.map((질문, index) => (
              <DraggableItem
                key={질문.questionId}
                className="draggable-item"
                data-index={index}
                onMouseDown={폼순서바꾸기}
                요소삭제={() => {
                  const 삭제된질문 = [...선택된질문리스트];
                  삭제된질문.splice(index, 1);
                  set선택된질문리스트(삭제된질문);
                }}
              >
                {질문.questionType === "simple-text" && (
                  <SimpleTextQuestionForm
                    질문순서={index}
                    질문제목={질문.questionTitle}
                    질문제목수정={(event) =>
                      질문제목수정(event, 질문.questionId)
                    }
                  />
                )}
                {질문.questionType === "radio-button" && (
                  <RadioButtonQuestionForm
                    질문순서={index}
                    질문제목={질문.questionTitle}
                    질문제목수정={(event) =>
                      질문제목수정(event, 질문.questionId)
                    }
                    선택지목록={질문.radioButtonOptions}
                    선택지추가={선택지추가}
                    선택지내용수정={선택지내용수정}
                  />
                )}
              </DraggableItem>
            ))}
          </S.QuestionFormBoardBody>

          <S.SubmitButton
            onClick={async () => {
              // 질문이 없는지 검사
              if (!선택된질문리스트.length) {
                alert("최소 1개 이상의 질문을 포함해주세요");
                return;
              }

              // 비어있는 질문 있는지 검사
              for (const 질문 of 선택된질문리스트) {
                if (질문.questionTitle === "") {
                  alert("비어있는 질문이 있습니다.");
                  return;
                }
              }

              // 비어있는 옵션 검사
              for (const 질문 of 선택된질문리스트) {
                if (질문.questionType === "radio-button") {
                  for (const 옵션 of 질문.radioButtonOptions) {
                    if (옵션 === "") {
                      alert("비어있는 옵션이 있는 질문이 있습니다.");
                      return;
                    }
                  }
                }
              }

              const 정렬된질문리스트 = 선택된질문리스트.map((질문, index) => ({
                ...질문,
                questionId: "" + (index + 1),
              }));

              const { status } = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ask-form`,
                {
                  method: "POST",
                  body: JSON.stringify(정렬된질문리스트),
                }
              );

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
        </S.QuestionFormBoardWrapper>
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
