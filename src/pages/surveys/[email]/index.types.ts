export type SurveyResultType = {
  response: {
    questionId: string;
    questionType: string;
    questionTitle: string;
    answer: string;
  }[];
  respondent: string;
};

export interface SurveyResultPageProps {
  results: SurveyResultType[];
}
