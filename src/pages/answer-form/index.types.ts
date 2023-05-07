type QuestionType = {
  questionId: string;
  questionType: string;
  questionTitle: string;
};

export interface AnswerFormProps {
  askForm: {
    askFormId: string;
    created: string;
    askFormMaker: string;
    questions: QuestionType[];
  };
}
