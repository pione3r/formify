export interface QuestionType {
  questionId: string;
  questionType: string;
  questionTitle: string;
}

export interface AskFormProps {
  askForm: {
    askFormId: string;
    created: string;
    askFormMaker: string;
    questions: QuestionType[];
  };
}
