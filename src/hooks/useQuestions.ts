import { useState } from "react";

interface ITextQuestion {
  questionId: string;
  questionType: "text";
  questionTitle: string;
}

interface IRadioButtonQuestion {
  questionId: string;
  questionType: "radio-button";
  questionTitle: string;
  options: string[];
}

interface ICheckBoxQuestion {
  questionId: string;
  questionType: "check-box";
  questionTitle: string;
  options: string[];
}

export type QuestionType =
  | ITextQuestion
  | IRadioButtonQuestion
  | ICheckBoxQuestion;

export function useQuestions() {
  const [질문리스트, set질문리스트] = useState<QuestionType[]>([]);

  const 질문추가 = (questionType: string) => {
    const newId = String(
      Math.max(0, ...질문리스트.map((질문) => +질문.questionId)) + 1
    );

    if (questionType === "text")
      set질문리스트((prev) => [
        ...prev,
        { questionId: newId, questionType: questionType, questionTitle: "" },
      ]);

    if (questionType === "radio-button" || questionType === "check-box")
      set질문리스트((prev) => [
        ...prev,
        {
          questionId: newId,
          questionType: questionType,
          questionTitle: "",
          options: [],
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
    const 삭제된질문 = [...질문리스트];
    삭제된질문.splice(questionIndex, 1);
    set질문리스트(삭제된질문);
  };

  const 질문순서바꾸기 = (sourceIdx: number, destinationIdx: number) => {
    const copied질문리스트 = [...질문리스트];
    const moving질문 = copied질문리스트[sourceIdx];
    copied질문리스트.splice(sourceIdx, 1);
    copied질문리스트.splice(destinationIdx, 0, moving질문);
    set질문리스트(copied질문리스트);
  };

  const 선택지추가 = (질문Index: number) => {
    set질문리스트((prev) =>
      prev.map((질문, idx) => {
        if (질문.questionType === "radio-button") {
          if (질문Index === idx) {
            return {
              ...질문,
              options: [...질문.options!, ""],
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
      prev.map((질문, idx) => {
        if (질문.questionType === "radio-button") {
          if (질문Index === idx) {
            return {
              ...질문,
              options: 질문.options.map((option, 옵션Idx) =>
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
              options: 질문.options.map((option, 옵션Idx) =>
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

  return {
    질문리스트,
    질문추가,
    질문제목수정,
    질문삭제,
    질문순서바꾸기,
    선택지추가,
    선택지내용수정,
  };
}
