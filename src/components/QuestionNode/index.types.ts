import type { QuestionNode } from "@/types/general";

export interface QuestionNodeProps {
  node: QuestionNode;
  onNodeMove: (mouseDownEvent: React.MouseEvent, nodeId: string) => void;
  onQuestionTitleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    nodeId: string
  ) => void;
  onQuestionOptionTitleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    nodeId: string,
    optionIndex: number
  ) => void;
  onAddNewQuestionOption: (nodeId: string) => void;
  onConnectStart: (mouseDownEvent: React.MouseEvent) => void;
  onConnectToEndNode: (mouseUpEvent: React.MouseEvent) => void;
  onConnectToExistNode: (mouseUpEvent: React.MouseEvent) => void;
  onDeleteNode: (nodeId: string) => void;
}
