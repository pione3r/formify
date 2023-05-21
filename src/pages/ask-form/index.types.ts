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

  