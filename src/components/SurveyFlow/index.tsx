import * as S from "./index.styles";
import type { SurveyFlowProps } from "./index.types";
import type { QuestionEdge, QuestionNode } from "@/types/general";

import { useScreenControl } from "@/hooks/useScreenControl";
import { useConnect } from "@/hooks/useConnect";
import { useNodeMove } from "@/hooks/useNodeMove";

import { DrawEdges } from "../DrawEdges";
import { QuestionNode as Node } from "../QuestionNode";

export function SurveyFlow({
  questionNodes,
  questionEdges,
  setQuestionNodes,
  setQuestionEdges,
}: SurveyFlowProps) {
  const {
    screenTransition,
    onScreenEnter,
    onScreenLeave,
    onScreenZoom,
    onScreenMove,
  } = useScreenControl();

  const isEdgeAlreadyExist = (sourceId: string) =>
    questionEdges.find((edge) => edge.source === sourceId) ? true : false;

  const 노드추가 = (newNode: QuestionNode) =>
    setQuestionNodes((prev) => prev.concat(newNode));

  const 엣지추가 = (newEdge: QuestionEdge) =>
    setQuestionEdges((prev) => prev.concat(newEdge));

  const {
    onConnectStart,
    onConnectToNewNode,
    onConnectToExistNode,
    onConnectToEndNode,
  } = useConnect(isEdgeAlreadyExist, 노드추가, 엣지추가);

  const 노드위치변경 = (nodeId: string, newX: number, newY: number) => {
    const copiedQuestionNodes = [...questionNodes];
    const newQuestionNodes = copiedQuestionNodes.map((questionNode) =>
      questionNode.questionId === nodeId
        ? {
            ...questionNode,
            position: {
              x: newX,
              y: newY,
            },
          }
        : questionNode
    );

    setQuestionNodes(newQuestionNodes);
  };

  const { onNodeMove } = useNodeMove(노드위치변경);

  const onDeleteNode = (nodeId: string) => {
    const copiedQuestionNodes = [...questionNodes];
    const copiedQuestionEdges = [...questionEdges];

    const newQuestionNodes = copiedQuestionNodes.filter(
      (question) => question.questionId !== nodeId
    );
    const newQuestionEdges = copiedQuestionEdges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    setQuestionNodes(newQuestionNodes);
    setQuestionEdges(newQuestionEdges);
  };

  const onAddNewQuestionOption = (nodeId: string) => {
    const copiedQuestionNodes = [...questionNodes];

    const index = copiedQuestionNodes.findIndex(
      (question) => question.questionId === nodeId
    );

    const options = copiedQuestionNodes[index].data.options;

    if (options) {
      copiedQuestionNodes[index].data.options = [...options, ""];
    } else {
      copiedQuestionNodes[index].data.options = [""];
    }

    const copiedQuestionEdges = [...questionEdges];

    const newQuestionEdges = copiedQuestionEdges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    setQuestionNodes(copiedQuestionNodes);
    setQuestionEdges(newQuestionEdges);
  };

  const onQuestionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nodeId: string
  ) => {
    const copiedQuestionNodes = [...questionNodes];

    const index = copiedQuestionNodes.findIndex(
      (question) => question.questionId === nodeId
    );

    copiedQuestionNodes[index].data.questionTitle = event.target.value;

    setQuestionNodes(copiedQuestionNodes);
  };

  const onQuestionOptionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nodeId: string,
    optionIndex: number
  ) => {
    const copiedQuestionNodes = [...questionNodes];

    const newQuestionNodes = copiedQuestionNodes.map((node) =>
      node.questionId === nodeId
        ? {
            ...node,
            data: {
              ...node.data,
              options: node.data.options?.map((option, idx) =>
                idx === optionIndex ? event.target.value : option
              ),
            },
          }
        : node
    );
    setQuestionNodes(newQuestionNodes);
  };

  return (
    <S.Wrapper
      className="flow-wrapper"
      onMouseUp={onConnectToNewNode}
      onMouseEnter={onScreenEnter}
      onMouseLeave={onScreenLeave}
      onWheel={onScreenZoom}
      onMouseDown={onScreenMove}
    >
      <S.FlowContainer
        className="flow-container"
        style={{
          transform: screenTransition,
        }}
      >
        {questionNodes.map((node) => (
          <Node
            key={node.questionId}
            node={node}
            onNodeMove={onNodeMove}
            onQuestionTitleChange={onQuestionTitleChange}
            onQuestionOptionTitleChange={onQuestionOptionTitleChange}
            onAddNewQuestionOption={onAddNewQuestionOption}
            onConnectStart={onConnectStart}
            onConnectToEndNode={onConnectToEndNode}
            onConnectToExistNode={onConnectToExistNode}
            onDeleteNode={onDeleteNode}
          />
        ))}
        <DrawEdges
          questionNodes={questionNodes}
          questionEdges={questionEdges}
        />
      </S.FlowContainer>
    </S.Wrapper>
  );
}
