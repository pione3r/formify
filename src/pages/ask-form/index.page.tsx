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
import { authOptions } from "../api/auth/[...nextauth].api";
import { useRouter } from "next/router";
import { DummyRadioButtonQuestionForm } from "@/components/DummyQuestionForm/DummyRadioButtonQuestionForm";
import { RadioButtonQuestionForm } from "@/components/QuestionForm/RadioButtonQuestionForm";
import { Backend_API_URL } from "@/common/url";
import { DummyCheckBoxQuestionForm } from "@/components/DummyQuestionForm/DummyCheckBoxQuestionForm";
import { CheckBoxQuestionForm } from "@/components/QuestionForm/CheckBoxQuestionForm";

export default function AskForm() {
  const router = useRouter();

  const [설문제목, set설문제목] = useState("");

  const [섹션리스트, set섹션리스트] = useState<
    { sectionId: string; questions: QuestionType[]; next: string }[]
  >([{ sectionId: "1", questions: [], next: "submit" }]);

  const 질문추가 = (droppableItemId: string, questionType: string) => {
    const 섹션Idx = 섹션리스트.findIndex(
      (섹션) => 섹션.sectionId === droppableItemId
    );
    const newId = Math.max(
      0,
      ...섹션리스트[섹션Idx].questions.map((질문) =>
        Number.parseInt(질문.questionId)
      )
    );

    if (questionType === "simple-text") {
      set섹션리스트((prev) =>
        prev.map((섹션) => {
          if (섹션.sectionId === droppableItemId) {
            return {
              ...섹션,
              questions: [
                ...섹션.questions,
                {
                  questionId: "" + (newId + 1),
                  questionType: questionType,
                  questionTitle: "",
                },
              ],
            };
          } else return 섹션;
        })
      );
    }
    if (questionType === "radio-button") {
      set섹션리스트((prev) =>
        prev.map((섹션) => {
          if (섹션.sectionId === droppableItemId) {
            return {
              ...섹션,
              questions: [
                ...섹션.questions,
                {
                  questionId: "" + (newId + 1),
                  questionType: questionType,
                  questionTitle: "",
                  radioButtonOptions: [],
                },
              ],
            };
          } else return 섹션;
        })
      );
    }
    if (questionType === "check-box") {
      set섹션리스트((prev) =>
        prev.map((섹션) => {
          if (섹션.sectionId === droppableItemId) {
            return {
              ...섹션,
              questions: [
                ...섹션.questions,
                {
                  questionId: "" + (newId + 1),
                  questionType: questionType,
                  questionTitle: "",
                  checkBoxOptions: [],
                },
              ],
            };
          } else return 섹션;
        })
      );
    }
  };

  const { onMouseDownHandler } = useDraggable(질문추가);

  const 질문순서바꾸기 = (
    droppableItemId: string,
    sourceIdx: number,
    destinationIdx: number
  ) => {
    const 섹션Idx = 섹션리스트.findIndex(
      (섹션) => 섹션.sectionId === droppableItemId
    );

    const copied질문리스트 = [...섹션리스트[섹션Idx].questions];
    const moving질문 = copied질문리스트[sourceIdx];
    copied질문리스트.splice(sourceIdx, 1);
    copied질문리스트.splice(destinationIdx, 0, moving질문);
    set섹션리스트((prev) =>
      prev.map((섹션) => {
        if (섹션.sectionId === droppableItemId) {
          return { ...섹션, questions: copied질문리스트 };
        } else return 섹션;
      })
    );
  };

  const { 폼순서바꾸기 } = usePickedFormPosSwitch(질문순서바꾸기);

  const 질문제목수정 = (
    섹션Id: string,
    event: React.ChangeEvent<HTMLInputElement>,
    질문Id: string
  ) => {
    const 수정한제목 = event.target.value;
    set섹션리스트((prev) =>
      prev.map((섹션) => {
        if (섹션.sectionId === 섹션Id) {
          return {
            ...섹션,
            questions: 섹션.questions.map((item) =>
              item.questionId === 질문Id
                ? { ...item, questionTitle: 수정한제목 }
                : { ...item }
            ),
          };
        } else {
          return 섹션;
        }
      })
    );
  };

  const 선택지추가 = (sectionId: string, 질문Index: number) => {
    set섹션리스트((prev) =>
      prev.map((섹션) => {
        if (섹션.sectionId === sectionId) {
          return {
            ...섹션,
            questions: 섹션.questions.map((질문, idx) => {
              if (질문.questionType === "radio-button") {
                if (질문Index === idx) {
                  return {
                    ...질문,
                    radioButtonOptions: [...질문.radioButtonOptions, ""],
                  };
                }
                return 질문;
              }
              if (질문.questionType === "check-box") {
                if (질문Index === idx) {
                  return {
                    ...질문,
                    checkBoxOptions: [...질문.checkBoxOptions, ""],
                  };
                }
              }
              return 질문;
            }),
          };
        } else return 섹션;
      })
    );
  };

  const 선택지내용수정 = (
    sectionId: string,
    event: React.ChangeEvent<HTMLInputElement>,
    질문Index: number,
    옵션Index: number
  ) => {
    set섹션리스트((prev) =>
      prev.map((섹션) => {
        if (섹션.sectionId === sectionId) {
          return {
            ...섹션,
            questions: 섹션.questions.map((질문, idx) => {
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
              if (질문.questionType === "check-box") {
                if (질문Index === idx) {
                  return {
                    ...질문,
                    checkBoxOptions: 질문.checkBoxOptions.map(
                      (option, 옵션Idx) =>
                        옵션Index === 옵션Idx ? event.target.value : option
                    ),
                  };
                }
              }
              return 질문;
            }),
          };
        } else return 섹션;
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
        <S.Column>
          <S.DummyQuestionFormBoardWrapper>
            <S.DummyQuestionFormBoardTitle>
              질문유형 선택
            </S.DummyQuestionFormBoardTitle>
            <S.DummyQuestionFormBoardBody>
              <DraggableItem
                data-question-type="simple-text"
                onMouseDown={onMouseDownHandler}
              >
                <DummySimpleTextQuestion />
              </DraggableItem>
              <DraggableItem
                data-question-type="radio-button"
                onMouseDown={onMouseDownHandler}
              >
                <DummyRadioButtonQuestionForm />
              </DraggableItem>
              <DraggableItem
                data-question-type="check-box"
                onMouseDown={onMouseDownHandler}
              >
                <DummyCheckBoxQuestionForm />
              </DraggableItem>
            </S.DummyQuestionFormBoardBody>
          </S.DummyQuestionFormBoardWrapper>
        </S.Column>

        <S.Column>
          <S.QuestionFormBoardWrapper>
            <S.QuestionFormBoardTitle
              placeholder="설문 제목을 입력해주세요"
              value={설문제목}
              onChange={(event) => set설문제목(event.target.value)}
            />
            <S.AddSectionButton
              onClick={() => {
                const newId = Math.max(
                  0,
                  ...섹션리스트.map((섹션) => Number.parseInt(섹션.sectionId))
                );
                set섹션리스트((prev) => [
                  ...prev.map((prev섹션) => ({
                    ...prev섹션,
                    next: String(Number.parseInt(prev섹션.sectionId) + 1),
                  })),
                  {
                    sectionId: "" + (newId + 1),
                    questions: [],
                    next: "submit",
                  },
                ]);
              }}
            >
              섹션 추가
            </S.AddSectionButton>
            {섹션리스트.map((섹션, i) => (
              <S.SectionWrapper key={i}>
                <S.SectionHeader>
                  <S.SectionTitle>{`섹션 ${i + 1}`}</S.SectionTitle>
                  <S.SectionFlowSelect
                    value={섹션.next}
                    onChange={(event) => {
                      const copied섹션리스트 = [...섹션리스트];

                      const 섹션Idx = 섹션리스트.findIndex(
                        (섹션픽) => 섹션픽.sectionId === 섹션.sectionId
                      );

                      copied섹션리스트[섹션Idx].next = event.target.value;
                      set섹션리스트(copied섹션리스트);
                    }}
                  >
                    <>
                      {섹션리스트.map((섹션, flowIdx) => (
                        <S.SectionFlowOption
                          key={flowIdx}
                          value={섹션.sectionId}
                        >
                          {섹션.sectionId}
                        </S.SectionFlowOption>
                      ))}
                      <S.SectionFlowOption value={"submit"}>
                        제출
                      </S.SectionFlowOption>
                    </>
                  </S.SectionFlowSelect>
                  <S.SectionDeleteButton
                    onClick={() => {
                      const copied섹션리스트 = [...섹션리스트];

                      const 섹션Idx = 섹션리스트.findIndex(
                        (섹션픽) => 섹션픽.sectionId === 섹션.sectionId
                      );

                      copied섹션리스트.splice(섹션Idx, 1);

                      const 정렬된섹션리스트 = copied섹션리스트.map(
                        (섹션, idx) => ({
                          ...섹션,
                          sectionId: String(idx + 1),
                        })
                      );

                      const next정렬된섹션리스트 = 정렬된섹션리스트.map(
                        (섹션, idx, origin) => {
                          if (idx === origin.length - 1)
                            return { ...섹션, next: "submit" };
                          if (origin.find((el) => el.sectionId === 섹션.next)) {
                            return 섹션;
                          } else {
                            return {
                              ...섹션,
                              next: String(Number.parseInt(섹션.sectionId) + 1),
                            };
                          }
                        }
                      );
                      set섹션리스트(next정렬된섹션리스트);
                    }}
                  >
                    섹션 삭제
                  </S.SectionDeleteButton>
                </S.SectionHeader>
                <S.QuestionFormBoardBody
                  id={섹션.sectionId}
                  className="picked-askform-board"
                >
                  {섹션.questions.map((질문, index) => (
                    <DraggableItem
                      key={질문.questionId}
                      className="draggable-item"
                      data-index={index}
                      onMouseDown={폼순서바꾸기}
                      요소삭제={() => {
                        const copied섹션리스트 = [...섹션리스트];

                        const 섹션Idx = 섹션리스트.findIndex(
                          (섹션픽) => 섹션픽.sectionId === 섹션.sectionId
                        );

                        const 삭제된질문 = [...섹션.questions];
                        삭제된질문.splice(index, 1);

                        copied섹션리스트[섹션Idx].questions = 삭제된질문;

                        set섹션리스트(copied섹션리스트);
                      }}
                    >
                      {질문.questionType === "simple-text" && (
                        <SimpleTextQuestionForm
                          질문순서={index}
                          질문제목={질문.questionTitle}
                          질문제목수정={(event) =>
                            질문제목수정(섹션.sectionId, event, 질문.questionId)
                          }
                        />
                      )}
                      {질문.questionType === "radio-button" && (
                        <RadioButtonQuestionForm
                          섹션Id={섹션.sectionId}
                          질문순서={index}
                          질문제목={질문.questionTitle}
                          질문제목수정={(event) =>
                            질문제목수정(섹션.sectionId, event, 질문.questionId)
                          }
                          선택지목록={질문.radioButtonOptions}
                          선택지추가={() => 선택지추가(섹션.sectionId, index)}
                          선택지내용수정={선택지내용수정}
                        />
                      )}
                      {질문.questionType === "check-box" && (
                        <CheckBoxQuestionForm
                          섹션Id={섹션.sectionId}
                          질문순서={index}
                          질문제목={질문.questionTitle}
                          질문제목수정={(event) =>
                            질문제목수정(섹션.sectionId, event, 질문.questionId)
                          }
                          선택지목록={질문.checkBoxOptions}
                          선택지추가={() => 선택지추가(섹션.sectionId, index)}
                          선택지내용수정={선택지내용수정}
                        />
                      )}
                    </DraggableItem>
                  ))}
                </S.QuestionFormBoardBody>
              </S.SectionWrapper>
            ))}

            <S.SubmitButton
              onClick={async () => {
                const { status } = await fetch(`${Backend_API_URL}/ask-form`, {
                  method: "POST",
                  body: JSON.stringify({
                    설문제목: 설문제목,
                    설문폼: 섹션리스트,
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
          </S.QuestionFormBoardWrapper>
        </S.Column>
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
