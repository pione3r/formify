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

export interface AnswerFormProps {
  askForm: {
    askFormId: string;
    created: string;
    askFormMaker: string;
    questions: QuestionType[];
  };
}

export type AnswersType = (
  | {
      answer: string;
      questionId: string;
      questionType: "simple-text";
      questionTitle: string;
    }
  | {
      answer: string;
      questionId: string;
      questionType: "radio-button";
      questionTitle: string;
      radioButtonOptions: string[];
    }
  | {
      answer: string[];
      questionId: string;
      questionType: "check-box";
      questionTitle: string;
      checkBoxOptions: string[];
    }
)[];
