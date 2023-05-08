type QuestionType = {
  questionId: string;
  questionType: string;
  questionTitle: string;
};

export type AskFormType = {
  askFormId: string;
  created: string;
  askFormMaker: string;
  questions: QuestionType[];
  answerFormLink: string;
};

export interface FormsProps {
  forms: AskFormType[];
  formMakerEmail: string;
}
