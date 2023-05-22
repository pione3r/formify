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

export type QuestionType =
  | ITextQuestion
  | IRadioButtonQuestion
  | ICheckBoxQuestion;

export interface ResponsePageProps {
  survey: {
    surveyId: string;
    created: string;
    surveyMaker: string;
    surveyTitle: string;
    survey: QuestionType[];
  };
  respondent: string;
}

interface ITextAnswer {
  questionId: string;
  questionType: "text";
  questionTitle: string;
  nextQuestionId: string;
  answer: string;
}

interface IRadioButtonAnswer {
  questionId: string;
  questionType: "radio-button";
  questionTitle: string;
  options: string[];
  nextQuestionIds: string[];
  answer: string;
}

interface ICheckBoxAnswer {
  questionId: string;
  questionType: "check-box";
  questionTitle: string;
  options: string[];
  nextQuestionId: string;
  answer: string[];
}

export type AnswerType = ITextAnswer | IRadioButtonAnswer | ICheckBoxAnswer;
