export type SurveyResultType = {
  response: {
    questionId: string;
    data: { questionTitle: string };
    answer: string;
  }[];
  respondent: string;
};

export interface SurveyResultPageProps {
  surveyTitle: string;
  results: SurveyResultType[];
}
