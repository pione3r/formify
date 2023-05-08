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

// export interface AskFormProps {
//   askForm: {
//     askFormId: string;
//     created: string;
//     askFormMaker: string;
//     questions: SimpleTextQuestionFormType[] | RadioButtonQuestionFormType[];
//   };
// }
