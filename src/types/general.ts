export type QuestionNode = {
  questionId: string;
  data: { questionTitle: string; options?: string[] };
  position: { x: number; y: number };
};

export type QuestionEdge = {
  edgeId: string;
  source: string;
  target: string;
};
