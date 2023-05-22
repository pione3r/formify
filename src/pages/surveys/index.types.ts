export type SurveyType = {
  surveyId: string;
  created: string;
  surveyMaker: string;
  surveyTitle: string;
  responseFormLink: string;
};

export interface SurveysPageProps {
  surveys: SurveyType[];
  surveyMakerEmail: string;
}
