import { useEffect, useState } from "react";
import * as S from "./index.styles";
import type {
  CurrentQuestion,
  Answer,
  SurveyPreviewProps,
} from "./index.types";

export function SurveyPreview({
  surveyTitle,
  questionNodes,
  questionEdges,
}: SurveyPreviewProps) {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    ...questionNodes[0],
    answer: "",
  });

  const [answerStack, setAnswerStack] = useState<Answer[]>([]);

  useEffect(() => {
    setCurrentQuestion({ ...questionNodes[0], answer: "" });
    setAnswerStack([]);
  }, [questionNodes]);

  return (
    <S.PreviewWrapper>
      <S.PreviewTitle>미리보기</S.PreviewTitle>
      <S.TitleWrapper>
        <S.Title>{surveyTitle || "설문제목"}</S.Title>
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
                    {currentQuestion.data.options.map((option, optionIndex) => (
                      <S.CurrentQuestionOptionWrapper key={optionIndex}>
                        <S.CurrentQuestionOptionLabel>
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
                          {option}
                        </S.CurrentQuestionOptionLabel>
                      </S.CurrentQuestionOptionWrapper>
                    ))}
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
                        setAnswerStack((prev) => prev.concat(currentQuestion));

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

                        setAnswerStack((prev) => prev.concat(currentQuestion));

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
                    onClick={() => {
                      setCurrentQuestion({ ...questionNodes[0], answer: "" });
                      setAnswerStack([]);
                    }}
                  >
                    처음으로 돌아가기
                  </S.CurrentQuestionSubmitButton>
                </S.CurrentQuestionFooterWrapper>
              </S.CurrentQuestionWrapper>
            );
          default:
            return (
              <S.CurrentQuestionWrapper>
                <S.CurrentQuestionHeaderWrapper>
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
                    {currentQuestion.data.options.map((option, optionIndex) => (
                      <S.CurrentQuestionOptionWrapper key={optionIndex}>
                        <S.CurrentQuestionOptionLabel>
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
                          {option}
                        </S.CurrentQuestionOptionLabel>
                      </S.CurrentQuestionOptionWrapper>
                    ))}
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
                </S.CurrentQuestionFooterWrapper>
              </S.CurrentQuestionWrapper>
            );
        }
      })()}
    </S.PreviewWrapper>
  );
}
