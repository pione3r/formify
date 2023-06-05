export type QuestionNode = {
  questionId: string;
  data: { questionTitle: string; options?: string[] };
  position: { top: number; left: number };
};

export type QuestionEdge = {
  edgeId: string;
  source: string;
  target: string;
};

export interface SurveyEditPageProps {
  userEmail: string | null | undefined;
}
