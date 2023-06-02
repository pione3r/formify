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

export type CurrentQuestion = QuestionNode & {
  answer: string;
};

export type Answer = QuestionNode & {
  answer: string;
};

export interface SurveyPreviewProps {
  surveyTitle: string;
  questionNodes: QuestionNode[];
  questionEdges: QuestionEdge[];
}
