interface SimpleTextQuestionFormType {
  questionId: string;
  questionType: "simple-text";
  questionTitle: string;
}

interface RadioButtonQuestionFormType {
  questionId: string;
  questionType: "radio-button";
  questionTitle: string;
  radioButtonOptions: string[];
}

export type QuestionType =
  | SimpleTextQuestionFormType
  | RadioButtonQuestionFormType;
