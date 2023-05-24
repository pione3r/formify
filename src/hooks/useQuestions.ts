import { useEffect, useRef, useState } from "react";

interface ITextQuestion {
  questionId: string;
  questionType: "text";
  questionTitle: string;
  nextQuestionId: string;
}

interface IRadioButtonQuestion {
  questionId: string;
  questionType: "radio-button";
  questionTitle: string;
  options: string[];
  nextQuestionIds: string[];
}

interface ICheckBoxQuestion {
  questionId: string;
  questionType: "check-box";
  questionTitle: string;
  options: string[];
  nextQuestionId: string;
}

type QuestionType = ITextQuestion | IRadioButtonQuestion | ICheckBoxQuestion;

function usePreviousQuestionsLength(length: number) {
  const ref = useRef<number>();

  useEffect(() => {
    ref.current = length;
  });

  return ref.current;
}

export function useQuestions() {
  const [질문리스트, set질문리스트] = useState<QuestionType[]>([]);

  const 이전질문리스트길이 = usePreviousQuestionsLength(질문리스트.length);

  const 질문추가 = (questionType: string) => {
    const newId = String(
      Math.max(0, ...질문리스트.map((질문) => +질문.questionId)) + 1
    );

    if (questionType === "text") {
      set질문리스트((prev) => [
        ...prev,
        {
          questionId: newId,
          questionType: questionType,
          questionTitle: "",
          nextQuestionId: "",
        },
      ]);
    }

    if (questionType === "check-box")
      set질문리스트((prev) => [
        ...prev,
        {
          questionId: newId,
          questionType: questionType,
          questionTitle: "",
          options: [],
          nextQuestionId: "",
        },
      ]);

    if (questionType === "radio-button")
      set질문리스트((prev) => [
        ...prev,
        {
          questionId: newId,
          questionType: questionType,
          questionTitle: "",
          options: [],
          nextQuestionIds: [],
        },
      ]);
  };

  const 질문제목수정 = (
    event: React.ChangeEvent<HTMLInputElement>,
    질문순서: number
  ) => {
    const 수정한제목 = event.target.value;
    set질문리스트((prev) =>
      prev.map((question, questionIndex) =>
        questionIndex === 질문순서
          ? { ...question, questionTitle: 수정한제목 }
          : { ...question }
      )
    );
  };

  const 질문삭제 = (questionIndex: number) => {
    const copied질문리스트 = [...질문리스트];
    copied질문리스트.splice(questionIndex, 1);
    const new질문리스트 = copied질문리스트.map((질문, index) => ({
      ...질문,
      questionId: String(index + 1),
    }));
    set질문리스트(new질문리스트);
  };

  const 질문순서바꾸기 = (sourceIdx: number, destinationIdx: number) => {
    const copied질문리스트 = [...질문리스트];
    const moving질문 = copied질문리스트[sourceIdx];
    copied질문리스트.splice(sourceIdx, 1);
    copied질문리스트.splice(destinationIdx, 0, moving질문);
    const new질문리스트 = copied질문리스트.map((질문, index) => ({
      ...질문,
      questionId: String(index + 1),
    }));
    set질문리스트(new질문리스트);
  };

  const 선택지추가 = (질문Index: number) => {
    set질문리스트((prev) =>
      prev.map((질문, idx) => {
        if (질문.questionType === "radio-button") {
          if (질문Index === idx) {
            return {
              ...질문,
              options: [...질문.options, ""],
              nextQuestionIds: [...질문.nextQuestionIds, ""],
            };
          }
          return 질문;
        }
        if (질문.questionType === "check-box") {
          if (질문Index === idx) {
            return {
              ...질문,
              options: [...질문.options, ""],
            };
          }
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
    set질문리스트((prev) =>
      prev.map((question, questionIdx) => {
        if (
          question.questionType === "radio-button" ||
          question.questionType === "check-box"
        ) {
          if (질문Index === questionIdx) {
            return {
              ...question,
              options: question.options.map((option, optionIdx) =>
                옵션Index === optionIdx ? event.target.value : option
              ),
            };
          }
          return question;
        }

        return question;
      })
    );
  };

  const 다음질문으로이동 = (
    event: React.ChangeEvent<HTMLSelectElement>,
    질문Index: number,
    옵션Index?: number
  ) => {
    set질문리스트((prev) =>
      prev.map((question, questionIdx) => {
        if (질문Index === questionIdx) {
          if (question.questionType === "radio-button") {
            return {
              ...question,
              nextQuestionIds: question.nextQuestionIds.map(
                (nextQuestionId, optionIdx) =>
                  옵션Index === optionIdx ? event.target.value : nextQuestionId
              ),
            };
          }
          return { ...question, nextQuestionId: event.target.value };
        }
        return question;
      })
    );
  };

  return {
    질문리스트,
    질문추가,
    질문제목수정,
    질문삭제,
    질문순서바꾸기,
    선택지추가,
    선택지내용수정,
    다음질문으로이동,
    이전질문리스트길이,
  };
}
