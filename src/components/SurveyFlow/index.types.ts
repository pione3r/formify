import { Dispatch, SetStateAction } from "react";

import type { QuestionEdge, QuestionNode } from "@/types/general";

export interface SurveyFlowProps {
  questionNodes: QuestionNode[];
  questionEdges: QuestionEdge[];
  setQuestionNodes: Dispatch<SetStateAction<QuestionNode[]>>;
  setQuestionEdges: Dispatch<SetStateAction<QuestionEdge[]>>;
}
