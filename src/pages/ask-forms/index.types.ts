type QuestionType = {
  questionId: string;
  questionType: string;
  questionTitle: string;
};

export type AskFormType = {
  askFormId: string;
  created: string;
  askFormMaker: string;
  askFormTitle: string;
  sections: { sectionId: string; questions: QuestionType[]; next: string }[];
  answerFormLink: string;
};

export interface FormsProps {
  forms: AskFormType[];
  formMakerEmail: string;
}
