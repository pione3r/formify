import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import * as S from "./index.styles";
import { Answer, CurrentQuestion, ResponsePageProps } from "./index.types";

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

  const { questionNodes, questionEdges } = survey.survey;

  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    ...survey.survey.questionNodes[0],
    answer: "",
  });

  const [answerStack, setAnswerStack] = useState<Answer[]>([]);

  return (
    <>
      <Head>
        <title>{survey.surveyTitle}</title>
      </Head>
      <S.PreviewWrapper>
        <S.TitleWrapper>
          <S.Title>{survey.surveyTitle}</S.Title>
        </S.TitleWrapper>

        {(() => {
          switch (currentQuestion.questionId) {
            case "start":
              return (
                <S.CurrentQuestionWrapper>
                  <S.CurrentQuestionHeaderWrapper>
                    <S.CurrentQuestionIndex>시작 질문</S.CurrentQuestionIndex>
                    <S.CurrentQuestionTitle>
                      {currentQuestion.data.questionTitle}
                    </S.CurrentQuestionTitle>
                  </S.CurrentQuestionHeaderWrapper>
                  {!currentQuestion.data.options ? (
                    <S.CurrentQuestionTextInputWrapper>
                      <S.CurrentQuestionTextInput
                        placeholder="내 답변"
                        value={currentQuestion.answer}
                        onChange={(event) => {
                          setCurrentQuestion((q) => ({
                            ...q,
                            answer: event.target.value,
                          }));
                        }}
                      />
                    </S.CurrentQuestionTextInputWrapper>
                  ) : (
                    <S.CurrentQuestionOptionsWrapper>
                      {currentQuestion.data.options.map(
                        (option, optionIndex) => (
                          <S.CurrentQuestionOptionWrapper key={optionIndex}>
                            <S.CurrentQuestionOptionLabel>
                              <S.CurrentQuestionOptionRadioButtonInputWrapper>
                                <S.CurrentQuestionOptionRadioButtonInput
                                  type="radio"
                                  name={currentQuestion.questionId}
                                  checked={
                                    currentQuestion.answer !== "" &&
                                    currentQuestion.answer === option
                                  }
                                  value={option}
                                  onChange={(event) => {
                                    setCurrentQuestion((q) => ({
                                      ...q,
                                      answer: event.target.value,
                                    }));
                                  }}
                                />
                              </S.CurrentQuestionOptionRadioButtonInputWrapper>
                              {option}
                            </S.CurrentQuestionOptionLabel>
                          </S.CurrentQuestionOptionWrapper>
                        )
                      )}
                    </S.CurrentQuestionOptionsWrapper>
                  )}
                  <S.CurrentQuestionNextButton
                    onClick={() => {
                      if (!currentQuestion.data.options) {
                        const edgeToNextQuestion = questionEdges.find(
                          (edge) =>
                            edge.edgeId.split("-")[0] ===
                            currentQuestion.questionId
                        );

                        if (!edgeToNextQuestion) return;

                        const nextQuestionId = edgeToNextQuestion.target;

                        if (nextQuestionId) {
                          setAnswerStack((prev) =>
                            prev.concat(currentQuestion)
                          );

                          const nextQuestion = questionNodes.find(
                            (node) => node.questionId === nextQuestionId
                          )!;

                          setCurrentQuestion({
                            ...nextQuestion,
                            answer: "",
                          });
                        }
                      } else {
                        const edgeToNextQuestion = questionEdges.find((edge) =>
                          edge.edgeId.includes(
                            `${
                              currentQuestion.questionId
                            }.${currentQuestion.data.options?.findIndex(
                              (option) => option === currentQuestion.answer
                            )}`
                          )
                        );

                        if (!edgeToNextQuestion) return;

                        const nextQuestionId = edgeToNextQuestion.target;

                        if (nextQuestionId) {
                          const nextQuestion = questionNodes.find(
                            (node) => node.questionId === nextQuestionId
                          )!;

                          setAnswerStack((prev) =>
                            prev.concat(currentQuestion)
                          );

                          setCurrentQuestion({
                            ...nextQuestion,
                            answer: "",
                          });
                        }
                      }
                    }}
                  >
                    다음 질문
                  </S.CurrentQuestionNextButton>
                </S.CurrentQuestionWrapper>
              );
            case "end":
              return (
                <S.CurrentQuestionWrapper>
                  <S.CurrentQuestionHeaderWrapper>
                    <S.CurrentQuestionIndex>마지막 질문</S.CurrentQuestionIndex>
                    <S.CurrentQuestionTitle>
                      {currentQuestion.data.questionTitle}
                    </S.CurrentQuestionTitle>
                  </S.CurrentQuestionHeaderWrapper>
                  <>
                    {!currentQuestion.data.options ? (
                      <S.CurrentQuestionTextInputWrapper>
                        <S.CurrentQuestionTextInput
                          placeholder="내 답변"
                          value={currentQuestion.answer}
                          onChange={(event) => {
                            setCurrentQuestion((q) => ({
                              ...q,
                              answer: event.target.value,
                            }));
                          }}
                        />
                      </S.CurrentQuestionTextInputWrapper>
                    ) : (
                      <S.CurrentQuestionOptionsWrapper>
                        {currentQuestion.data.options.map(
                          (option, optionIndex) => (
                            <S.CurrentQuestionOptionWrapper key={optionIndex}>
                              <S.CurrentQuestionOptionLabel>
                                <S.CurrentQuestionOptionRadioButtonInputWrapper>
                                  <S.CurrentQuestionOptionRadioButtonInput
                                    type="radio"
                                    name={currentQuestion.questionId}
                                    checked={
                                      currentQuestion.answer !== "" &&
                                      currentQuestion.answer === option
                                    }
                                    value={option}
                                    onChange={(event) => {
                                      setCurrentQuestion((q) => ({
                                        ...q,
                                        answer: event.target.value,
                                      }));
                                    }}
                                  />
                                </S.CurrentQuestionOptionRadioButtonInputWrapper>
                                {option}
                              </S.CurrentQuestionOptionLabel>
                            </S.CurrentQuestionOptionWrapper>
                          )
                        )}
                      </S.CurrentQuestionOptionsWrapper>
                    )}
                  </>
                  <S.CurrentQuestionFooterWrapper>
                    <S.CurrentQuestionPreviousButton
                      onClick={() => {
                        if (answerStack.length <= 0) return;

                        const copiedAnswerStack = [...answerStack];

                        setCurrentQuestion({ ...copiedAnswerStack.pop()! });
                        setAnswerStack(copiedAnswerStack);
                      }}
                    >
                      이전 질문
                    </S.CurrentQuestionPreviousButton>
                    <S.CurrentQuestionSubmitButton
                      onClick={async () => {
                        const { status } = await fetch(
                          `${Backend_API_URL}/survey/response/${survey.surveyId}`,
                          {
                            method: "POST",
                            body: JSON.stringify({
                              respondent:
                                respondent === "" ? "익명" : respondent,
                              response: answerStack.concat(currentQuestion),
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
                      제출
                    </S.CurrentQuestionSubmitButton>
                  </S.CurrentQuestionFooterWrapper>
                </S.CurrentQuestionWrapper>
              );
            default:
              return (
                <S.CurrentQuestionWrapper>
                  <S.CurrentQuestionHeaderWrapper>
                    <S.CurrentQuestionIndex>{`${currentQuestion.questionId}번 질문`}</S.CurrentQuestionIndex>
                    <S.CurrentQuestionTitle>
                      {currentQuestion.data.questionTitle}
                    </S.CurrentQuestionTitle>
                  </S.CurrentQuestionHeaderWrapper>
                  {!currentQuestion.data.options ? (
                    <S.CurrentQuestionTextInputWrapper>
                      <S.CurrentQuestionTextInput
                        placeholder="내 답변"
                        value={currentQuestion.answer}
                        onChange={(event) => {
                          setCurrentQuestion((q) => ({
                            ...q,
                            answer: event.target.value,
                          }));
                        }}
                      />
                    </S.CurrentQuestionTextInputWrapper>
                  ) : (
                    <S.CurrentQuestionOptionsWrapper>
                      {currentQuestion.data.options.map(
                        (option, optionIndex) => (
                          <S.CurrentQuestionOptionWrapper key={optionIndex}>
                            <S.CurrentQuestionOptionLabel>
                              <S.CurrentQuestionOptionRadioButtonInputWrapper>
                                <S.CurrentQuestionOptionRadioButtonInput
                                  type="radio"
                                  name={currentQuestion.questionId}
                                  checked={
                                    currentQuestion.answer !== "" &&
                                    currentQuestion.answer === option
                                  }
                                  value={option}
                                  onChange={(event) => {
                                    setCurrentQuestion((q) => ({
                                      ...q,
                                      answer: event.target.value,
                                    }));
                                  }}
                                />
                              </S.CurrentQuestionOptionRadioButtonInputWrapper>
                              {option}
                            </S.CurrentQuestionOptionLabel>
                          </S.CurrentQuestionOptionWrapper>
                        )
                      )}
                    </S.CurrentQuestionOptionsWrapper>
                  )}
                  <S.CurrentQuestionFooterWrapper>
                    <S.CurrentQuestionPreviousButton
                      onClick={() => {
                        if (answerStack.length <= 0) return;

                        const copiedAnswerStack = [...answerStack];

                        setCurrentQuestion({ ...copiedAnswerStack.pop()! });
                        setAnswerStack(copiedAnswerStack);
                      }}
                    >
                      이전 질문
                    </S.CurrentQuestionPreviousButton>
                    <S.CurrentQuestionNextButton
                      onClick={() => {
                        if (!currentQuestion.data.options) {
                          const edgeToNextQuestion = questionEdges.find(
                            (edge) =>
                              edge.edgeId.split("-")[0] ===
                              currentQuestion.questionId
                          );

                          if (!edgeToNextQuestion) return;

                          const nextQuestionId = edgeToNextQuestion.target;

                          if (nextQuestionId) {
                            setAnswerStack((prev) =>
                              prev.concat(currentQuestion)
                            );

                            const nextQuestion = questionNodes.find(
                              (node) => node.questionId === nextQuestionId
                            )!;

                            setCurrentQuestion({
                              ...nextQuestion,
                              answer: "",
                            });
                          }
                        } else {
                          const edgeToNextQuestion = questionEdges.find(
                            (edge) =>
                              edge.edgeId.includes(
                                `${
                                  currentQuestion.questionId
                                }.${currentQuestion.data.options?.findIndex(
                                  (option) => option === currentQuestion.answer
                                )}`
                              )
                          );

                          if (!edgeToNextQuestion) return;

                          const nextQuestionId = edgeToNextQuestion.target;

                          if (nextQuestionId) {
                            const nextQuestion = questionNodes.find(
                              (node) => node.questionId === nextQuestionId
                            )!;

                            setAnswerStack((prev) =>
                              prev.concat(currentQuestion)
                            );

                            setCurrentQuestion({
                              ...nextQuestion,
                              answer: "",
                            });
                          }
                        }
                      }}
                    >
                      다음 질문
                    </S.CurrentQuestionNextButton>
                  </S.CurrentQuestionFooterWrapper>
                </S.CurrentQuestionWrapper>
              );
          }
        })()}
      </S.PreviewWrapper>
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
