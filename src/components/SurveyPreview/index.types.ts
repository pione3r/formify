import type { QuestionEdge, QuestionNode } from "@/types/general";

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
