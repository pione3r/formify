export type AnswerFormType = {
  answers: {
    answer: string;
    questionId: string;
    questionTitle: string;
    questionType: string;
  }[];
  respondent: string;
};

export interface AnswersForAskFormProps {
  forms: AnswerFormType[];
}
