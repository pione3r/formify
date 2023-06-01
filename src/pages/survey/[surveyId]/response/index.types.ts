type QuestionNode = {
  questionId: string;
  data: { questionTitle: string; options?: string[] };
  position: { top: number; left: number };
};

type QuestionEdge = {
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

export interface ResponsePageProps {
  survey: {
    surveyId: string;
    created: string;
    surveyMaker: string;
    surveyTitle: string;
    survey: {
      questionNodes: QuestionNode[];
      questionEdges: QuestionEdge[];
    };
  };
  respondent: string;
}
