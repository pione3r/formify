import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import * as S from "./index.styles";
import { AnswerType, ResponsePageProps } from "./index.types";

import { db } from "@/utils/db";
import { doc, getDoc } from "firebase/firestore";
import { Backend_API_URL } from "@/common/url";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";

export default function ResponsePage({
  survey,
  respondent,
}: ResponsePageProps) {
  const router = useRouter();

  const [응답리스트, set응답리스트] = useState<AnswerType[]>(
    survey.survey.map((question) => {
      if (question.questionType === "check-box")
        return { ...question, answer: [] };
      return { ...question, answer: "" };
    })
  );

  const [idStack, setIdStack] = useState<string[]>([
    survey.survey[0].questionId,
  ]);

  const stackPointer = idStack.length - 1;

  return (
    <>
      <Head>
        <title>{survey.surveyTitle}</title>
      </Head>
      <S.Wrapper>
        <S.TitleWrapper>
          <S.Title>{survey.surveyTitle}</S.Title>
        </S.TitleWrapper>

        <S.BodyWrapper>
          {응답리스트.map((질문) => {
            if (질문.questionType === "text")
              return (
                <S.QuestionWrapper
                  key={질문.questionId}
                  isCurrentQuestion={질문.questionId === idStack[stackPointer]}
                >
                  <S.QuestionHeaderWrapper>
                    <S.QuestionIndex>{`${질문.questionId}번 질문 (단답형)`}</S.QuestionIndex>
                    <S.QuestionTitle>{질문.questionTitle}</S.QuestionTitle>
                  </S.QuestionHeaderWrapper>
                  <S.QuestionBodyWrapper>
                    <S.TextInputWrapper>
                      <S.TextInput
                        placeholder="내 답변"
                        value={질문.answer}
                        onChange={(event) =>
                          set응답리스트((prev) =>
                            prev.map((응답) => {
                              if (응답.questionId === 질문.questionId) {
                                if (응답.questionType === "text") {
                                  return {
                                    ...응답,
                                    answer: event.target.value,
                                  };
                                } else return 응답;
                              }
                              return 응답;
                            })
                          )
                        }
                        spellCheck={false}
                      />
                    </S.TextInputWrapper>
                  </S.QuestionBodyWrapper>
                  <S.QuestionFooterWrapper>
                    {stackPointer !== 0 && (
                      <S.PreviousButton
                        onClick={() => {
                          if (stackPointer === 0) return;
                          const copiedIdStack = [...idStack];
                          copiedIdStack.pop();
                          setIdStack(copiedIdStack);
                        }}
                      >
                        이전 질문
                      </S.PreviousButton>
                    )}
                    <S.NextButton
                      onClick={() => {
                        if (질문.answer === "") {
                          alert("응답을 입력해주세요");
                          return;
                        }
                        if (idStack.includes(질문.nextQuestionId)) return;

                        setIdStack((prev) => [...prev, 질문.nextQuestionId]);
                      }}
                    >
                      다음 질문
                    </S.NextButton>
                  </S.QuestionFooterWrapper>
                </S.QuestionWrapper>
              );
            if (질문.questionType === "check-box")
              return (
                <S.QuestionWrapper
                  key={질문.questionId}
                  isCurrentQuestion={질문.questionId === idStack[stackPointer]}
                >
                  <S.QuestionHeaderWrapper>
                    <S.QuestionIndex>{`${질문.questionId}번 질문 (다중선택형)`}</S.QuestionIndex>
                    <S.QuestionTitle>{질문.questionTitle}</S.QuestionTitle>
                  </S.QuestionHeaderWrapper>
                  <S.QuestionBodyWrapper>
                    <S.OptionsWrapper>
                      {질문.options.map((option, optionIndex) => (
                        <S.OptionWrapper key={optionIndex}>
                          <S.OptionLabel>
                            <S.CheckBoxMark />
                            <S.OptionCheckBoxInput
                              type="checkbox"
                              value={option}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  set응답리스트((prev) =>
                                    prev.map((응답) => {
                                      if (응답.questionId === 질문.questionId) {
                                        if (응답.questionType === "check-box") {
                                          return {
                                            ...응답,
                                            answer: [
                                              ...응답.answer,
                                              event.target.value,
                                            ],
                                          };
                                        } else return 응답;
                                      }
                                      return 응답;
                                    })
                                  );
                                } else {
                                  set응답리스트((prev) =>
                                    prev.map((응답) => {
                                      if (응답.questionId === 질문.questionId) {
                                        if (응답.questionType === "check-box") {
                                          return {
                                            ...응답,
                                            answer: [
                                              ...응답.answer.filter(
                                                (checkedItem) =>
                                                  checkedItem !==
                                                  event.target.value
                                              ),
                                            ],
                                          };
                                        } else return 응답;
                                      }
                                      return 응답;
                                    })
                                  );
                                }
                              }}
                            />
                            {option}
                          </S.OptionLabel>
                        </S.OptionWrapper>
                      ))}
                    </S.OptionsWrapper>
                  </S.QuestionBodyWrapper>
                  <S.QuestionFooterWrapper>
                    {stackPointer !== 0 && (
                      <S.PreviousButton
                        onClick={() => {
                          if (stackPointer === 0) return;
                          const copiedIdStack = [...idStack];
                          copiedIdStack.pop();
                          setIdStack(copiedIdStack);
                        }}
                      >
                        이전 질문
                      </S.PreviousButton>
                    )}
                    <S.NextButton
                      onClick={() => {
                        if (!질문.answer.length) {
                          alert("응답을 입력해주세요");
                          return;
                        }
                        if (idStack.includes(질문.nextQuestionId)) return;

                        setIdStack((prev) => [...prev, 질문.nextQuestionId]);
                      }}
                    >
                      다음 질문
                    </S.NextButton>
                  </S.QuestionFooterWrapper>
                </S.QuestionWrapper>
              );
            if (질문.questionType === "radio-button")
              return (
                <S.QuestionWrapper
                  key={질문.questionId}
                  isCurrentQuestion={질문.questionId === idStack[stackPointer]}
                >
                  <S.QuestionHeaderWrapper>
                    <S.QuestionIndex>{`${질문.questionId}번 질문 (단일선택형)`}</S.QuestionIndex>
                    <S.QuestionTitle>{질문.questionTitle}</S.QuestionTitle>{" "}
                  </S.QuestionHeaderWrapper>
                  <S.QuestionBodyWrapper>
                    <S.OptionsWrapper>
                      {질문.options.map((option, optionIndex) => (
                        <S.OptionWrapper key={optionIndex}>
                          <S.OptionLabel>
                            <S.OptionRadioButtonInput
                              type="radio"
                              name={질문.questionId}
                              value={option}
                              onChange={(event) =>
                                set응답리스트((prev) =>
                                  prev.map((응답) => {
                                    if (응답.questionId === 질문.questionId) {
                                      if (
                                        응답.questionType === "radio-button"
                                      ) {
                                        return {
                                          ...응답,
                                          answer: event.target.value,
                                        };
                                      } else return 응답;
                                    }
                                    return 응답;
                                  })
                                )
                              }
                            />
                            {option}
                          </S.OptionLabel>
                        </S.OptionWrapper>
                      ))}
                    </S.OptionsWrapper>
                  </S.QuestionBodyWrapper>
                  <S.QuestionFooterWrapper>
                    {stackPointer !== 0 && (
                      <S.PreviousButton
                        onClick={() => {
                          if (stackPointer === 0) return;
                          const copiedIdStack = [...idStack];
                          copiedIdStack.pop();
                          setIdStack(copiedIdStack);
                        }}
                      >
                        이전 질문
                      </S.PreviousButton>
                    )}
                    <S.NextButton
                      onClick={() => {
                        if (질문.answer === "") {
                          alert("응답을 입력해주세요");
                          return;
                        }
                        if (
                          idStack.includes(
                            질문.nextQuestionIds[
                              질문.options.findIndex(
                                (option) => option === 질문.answer
                              )
                            ]
                          )
                        )
                          return;

                        setIdStack((prev) => [
                          ...prev,
                          질문.nextQuestionIds[
                            질문.options.findIndex(
                              (option) => option === 질문.answer
                            )
                          ],
                        ]);
                      }}
                    >
                      다음 질문
                    </S.NextButton>
                  </S.QuestionFooterWrapper>
                </S.QuestionWrapper>
              );
          })}
          {idStack[stackPointer] === "submit" && (
            <S.FooterWrapper>
              <S.FooterHeaderWrapper>
                <S.FooterTitle>
                  설문이 끝났습니다. 제출하기 버튼을 누르면 제출됩니다.
                </S.FooterTitle>
              </S.FooterHeaderWrapper>
              <S.FooterBodyWrapper>
                <S.PreviousButton
                  onClick={() => {
                    if (stackPointer === 0) return;
                    const copiedIdStack = [...idStack];
                    copiedIdStack.pop();
                    setIdStack(copiedIdStack);
                  }}
                >
                  이전 질문
                </S.PreviousButton>
                <S.SubmitButton
                  onClick={async () => {
                    const { status } = await fetch(
                      `${Backend_API_URL}/survey/response/${survey.surveyId}`,
                      {
                        method: "POST",
                        body: JSON.stringify({
                          respondent: respondent === "" ? "익명" : respondent,
                          response: 응답리스트.map((응답) =>
                            idStack.includes(응답.questionId)
                              ? 응답
                              : { ...응답, answer: "" }
                          ),
                        }),
                      }
                    );
                    if (status === 201) {
                      alert("응답폼이 성공적으로 제출 됐습니다.");
                      router.replace("/");
                    }
                    if (status === 401) {
                      alert("응답폼 제출에 실패했습니다.");
                      return;
                    }
                  }}
                >
                  답변 제출하기
                </S.SubmitButton>
              </S.FooterBodyWrapper>
            </S.FooterWrapper>
          )}
        </S.BodyWrapper>
      </S.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const docRef = doc(db, "surveys", ctx.query.surveyId as string);
  const docSnap = await getDoc(docRef);

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  return {
    props: {
      survey: {
        surveyId: docSnap.data()!.surveyId,
        created: String(new Date(docSnap.data()!.created.toDate())),
        surveyMaker: docSnap.data()!.surveyMaker,
        surveyTitle: docSnap.data()!.surveyTitle,
        survey: docSnap.data()!.survey,
      },
      respondent: session?.user?.email || "",
    },
  };
}
