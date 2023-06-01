import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useRef, useState } from "react";

import * as S from "./index.styles";

import { useQuestions } from "@/hooks/temp/useQuestions";
import { useDraggable } from "@/hooks/temp/useDraggable2";
import { usePickedFormPosSwitch } from "@/hooks/temp/usePickedFormPosSwitch";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";

import { Backend_API_URL } from "@/common/url";

import { DraggableItem } from "@/components/temp/DraggableItem";

import { SimpleTextQuestionForm } from "@/components/temp/QuestionForm/SimpleTextQuestionForm";
import { RadioButtonQuestionForm } from "@/components/temp/QuestionForm/RadioButtonQuestionForm";
import { CheckBoxQuestionForm } from "@/components/temp/QuestionForm/CheckBoxQuestionForm";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

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
    이전질문리스트길이,
  } = useQuestions();

  const { 요소추가 } = useDraggable(질문추가);

  const { 폼순서바꾸기 } = usePickedFormPosSwitch(질문순서바꾸기);

  const [현재보이는질문Index, set현재보이는질문Index] = useState("");

  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropZoneRef) return;

    if (!dropZoneRef.current) return;

    const scrollHeight = dropZoneRef.current?.scrollHeight || 0;

    if (이전질문리스트길이! < 질문리스트.length)
      dropZoneRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
  }, [이전질문리스트길이, 질문리스트]);

  const { target: draggableItemRef } = useIntersectionObserver({
    onIntersect: (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.5)
          set현재보이는질문Index(
            (entry.target as HTMLElement).dataset["index"] || ""
          );
      });
    },
  });

  return (
    <>
      <Head>
        <title>{`작성중 ${설문제목 === "" ? "" : `| ${설문제목}`}`}</title>
      </Head>
      <S.Wrapper>
        <S.PaginationBar>
          {질문리스트.map((질문, 질문Index) => (
            <S.DotWrapper key={질문.questionId}>
              <S.Dot isCurrent={현재보이는질문Index === "" + 질문Index}></S.Dot>
              <S.SubDotsWrapper>
                {질문.questionType === "radio-button" &&
                  질문.nextQuestionIds.map((option, optionIndex) => (
                    <S.SubDot key={optionIndex}></S.SubDot>
                  ))}
              </S.SubDotsWrapper>
            </S.DotWrapper>
          ))}
        </S.PaginationBar>
        <S.ColumnLeft>
          <S.SurveyTitleInputWrapper>
            <S.SurveyTitleInput
              placeholder="설문 제목을 입력하세요."
              value={설문제목}
              onChange={(event) => set설문제목(event.target.value)}
              spellCheck={false}
            />
          </S.SurveyTitleInputWrapper>
          <S.DropZone
            className="drop-zone"
            ref={dropZoneRef}
            onMouseDown={(mouseDownEvent) => {
              const element = mouseDownEvent.currentTarget;

              const elementPos = element.getBoundingClientRect();

              let intervalId: string | number | NodeJS.Timer | undefined;

              const onMouseMoveHandler = (mouseMoveEvent: MouseEvent) => {
                const scrollTop = dropZoneRef.current?.scrollTop || 0;

                const dY = (mouseMoveEvent.pageY - mouseDownEvent.pageY) * 0.01;

                function keepScroll() {
                  if (
                    mouseMoveEvent.clientY < elementPos.top ||
                    mouseMoveEvent.clientY >
                      elementPos.top + element.offsetHeight
                  )
                    dropZoneRef.current?.scrollTo({
                      top: scrollTop + dY,
                    });
                }

                let isUp = mouseMoveEvent.pageY < elementPos.top;

                let isDown = mouseMoveEvent.pageY > elementPos.bottom;

                let isOnTop = false;

                let isOnDown = false;

                if (isUp) {
                  if (!intervalId) {
                    isOnTop = true;
                    intervalId = setInterval(() => {
                      if (isOnTop) {
                        dropZoneRef.current?.scrollBy({
                          top: -5,
                        });
                      }
                    }, 10);
                  }
                } else if (isDown) {
                  if (!intervalId) {
                    isOnDown = true;
                    intervalId = setInterval(() => {
                      if (isOnDown) {
                        dropZoneRef.current?.scrollBy({
                          top: 5,
                        });
                      }
                    }, 10);
                  }
                } else {
                  clearInterval(intervalId);
                  isOnDown = false;
                  intervalId = undefined;
                }
              };

              const onMouseUpHandler = () => {
                clearInterval(intervalId);
                intervalId = undefined;

                document.removeEventListener("mousemove", onMouseMoveHandler);
                document.onmouseup = null;
              };

              document.addEventListener("mousemove", onMouseMoveHandler);
              document.addEventListener("mouseup", onMouseUpHandler, {
                once: true,
              });
            }}
          >
            {질문리스트.map((질문, questionIndex, origin) => (
              <DraggableItem
                key={질문.questionId}
                className="draggable-item"
                data-index={questionIndex}
                onMouseDown={폼순서바꾸기}
                요소삭제={질문삭제}
                ref={draggableItemRef}
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
          <S.QuestionTypeButtonBoard>
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
          </S.QuestionTypeButtonBoard>
          <S.SubmitButton
            onClick={async () => {
              if (설문제목 === "") {
                alert("설문 제목을 입력해주세요");
                return;
              }

              for (const 질문 of 질문리스트) {
                if (질문.questionTitle === "") {
                  alert("비어 있는 질문 제목이 있습니다.");
                  return;
                }
              }

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
