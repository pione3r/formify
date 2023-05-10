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

interface CheckBoxQuestionFormType {
  questionId: string;
  questionType: "check-box";
  questionTitle: string;
  checkBoxOptions: string[];
}

export type QuestionType =
  | SimpleTextQuestionFormType
  | RadioButtonQuestionFormType
  | CheckBoxQuestionFormType;
