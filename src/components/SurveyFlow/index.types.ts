import { Dispatch, SetStateAction } from "react";

import type { QuestionEdge, QuestionNode } from "@/types/general";

export interface SurveyFlowProps {
  surveyTitle: string;
  questionNodes: QuestionNode[];
  questionEdges: QuestionEdge[];
  setSurveyTitle: Dispatch<SetStateAction<string>>;
  setQuestionNodes: Dispatch<SetStateAction<QuestionNode[]>>;
  setQuestionEdges: Dispatch<SetStateAction<QuestionEdge[]>>;
}
