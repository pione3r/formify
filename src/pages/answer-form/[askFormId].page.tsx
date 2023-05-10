import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import * as S from "./index.styles";
import { AnswerFormProps, AnswersType } from "./index.types";

import { db } from "@/utils/db";
import { doc, getDoc } from "firebase/firestore";
import { Backend_API_URL } from "@/common/url";

export default function AnswerForm({ askForm }: AnswerFormProps) {
  const router = useRouter();

  const [answers, setAnswers] = useState<AnswersType>(
    askForm.questions.map((question) => {
      if (question.questionType === "radio-button") {
        return { ...question, answer: "" };
      }
      if (question.questionType === "check-box") {
        return { ...question, answer: [] };
      }
      return { ...question, answer: "" };
    })
  );

  return (
    <>
      <Head>
        <title>응답 폼</title>
      </Head>
      <S.Wrapper>
        <S.Header>
          <S.Created>{askForm.created}</S.Created>
          <S.Title>{`${askForm.askFormMaker}님의 질문폼`}</S.Title>
        </S.Header>
        <S.AskFormWrapper>
          {askForm.questions.map((question, index) => {
            if (question.questionType === "simple-text") {
              return (
                <S.QuestionWrapper key={question.questionId}>
                  <S.QuestionTitle>{`질문 ${index + 1} : ${
                    question.questionTitle
                  }`}</S.QuestionTitle>
                  <S.AnswerWrapper>
                    <S.AnswerTitle>답변 : </S.AnswerTitle>
                    <S.AnswerTypeSimpleText
                      onChange={(event) =>
                        setAnswers((answers) =>
                          answers.map((answer) => {
                            if (answer.questionType === "simple-text") {
                              if (answer.questionId === question.questionId) {
                                return {
                                  ...answer,
                                  answer: event.target.value,
                                };
                              }
                              return { ...answer };
                            }
                            return answer;
                          })
                        )
                      }
                    />
                  </S.AnswerWrapper>
                </S.QuestionWrapper>
              );
            }
            if (question.questionType === "radio-button") {
              return (
                <S.QuestionWrapper key={question.questionId}>
                  <S.QuestionTitle>{`질문 ${index + 1} : ${
                    question.questionTitle
                  }`}</S.QuestionTitle>
                  <S.AnswerWrapper>
                    <S.AnswerTitle>답변 : </S.AnswerTitle>
                    {question.radioButtonOptions.map((option, index) => (
                      <S.AnswerTypeRadioButtonWrapper key={index}>
                        <S.AnswerTypeRadioButtonLabel>
                          <S.AnswerTypeRadioButtonInput
                            type="radio"
                            name={question.questionId}
                            value={option}
                            onChange={(event) =>
                              setAnswers((answers) =>
                                answers.map((answer) => {
                                  if (answer.questionType === "radio-button") {
                                    if (
                                      answer.questionId === question.questionId
                                    ) {
                                      return {
                                        ...answer,
                                        answer: event.target.value,
                                      };
                                    }
                                    return { ...answer };
                                  }
                                  return answer;
                                })
                              )
                            }
                          />
                          {option}
                        </S.AnswerTypeRadioButtonLabel>
                      </S.AnswerTypeRadioButtonWrapper>
                    ))}
                  </S.AnswerWrapper>
                </S.QuestionWrapper>
              );
            }
            if (question.questionType === "check-box") {
              return (
                <S.QuestionWrapper key={question.questionId}>
                  <S.QuestionTitle>{`질문 ${index + 1} : ${
                    question.questionTitle
                  }`}</S.QuestionTitle>
                  <S.AnswerWrapper>
                    <S.AnswerTitle>답변 : </S.AnswerTitle>
                    {question.checkBoxOptions.map((option, index) => (
                      <S.AnswerTypeCheckBoxWrapper key={index}>
                        <S.AnswerTypeCheckBoxLabel>
                          <S.AnswerTypeCheckBoxInput
                            type="checkbox"
                            name={question.questionId}
                            value={option}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setAnswers((answers) =>
                                  answers.map((answer) => {
                                    if (answer.questionType === "check-box") {
                                      if (
                                        answer.questionId ===
                                        question.questionId
                                      ) {
                                        return {
                                          ...answer,
                                          answer: [
                                            ...answer.answer,
                                            event.target.value,
                                          ],
                                        };
                                      }
                                      return { ...answer };
                                    }
                                    return answer;
                                  })
                                );
                              } else {
                                setAnswers((answers) =>
                                  answers.map((answer) => {
                                    if (answer.questionType === "check-box") {
                                      if (
                                        answer.questionId ===
                                        question.questionId
                                      ) {
                                        return {
                                          ...answer,
                                          answer: answer.answer.filter(
                                            (item) =>
                                              item !== event.target.value
                                          ),
                                        };
                                      }
                                      return { ...answer };
                                    }
                                    return answer;
                                  })
                                );
                              }
                            }}
                          />
                          {option}
                        </S.AnswerTypeCheckBoxLabel>
                      </S.AnswerTypeCheckBoxWrapper>
                    ))}
                  </S.AnswerWrapper>
                </S.QuestionWrapper>
              );
            }
          })}
        </S.AskFormWrapper>
        <S.AnswerButton
          onClick={async () => {
            // 비어있는 답변 검사
            for (const answer of answers) {
              if (answer.answer === "" || !answer.answer.length) {
                alert("비어있는 답변이 있습니다.");
                return;
              }
            }

            const { status } = await fetch(
              `${Backend_API_URL}/answer-form/${askForm.askFormId}`,
              {
                method: "POST",
                body: JSON.stringify({
                  respondent: "익명",
                  answers: answers,
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
        </S.AnswerButton>
      </S.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const docRef = doc(db, "askForms", ctx.query.askFormId as string);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      askForm: {
        askFormId: docSnap.data()!.askFormId,
        created: String(new Date(docSnap.data()!.created.toDate())),
        askFormMaker: docSnap.data()!.askFormMaker,
        questions: docSnap.data()!.questions,
      },
    },
  };
}
