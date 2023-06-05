import { useRouter } from "next/router";

import * as S from "./index.styles";
import type { SurveyFlowProps } from "./index.types";
import type { QuestionEdge, QuestionNode } from "@/types/general";

import { useScreenControl } from "@/hooks/useScreenControl";
import { useConnect } from "@/hooks/useConnect";
import { useNodeMove } from "@/hooks/useNodeMove";

import { Backend_API_URL } from "@/common/url";

import { useSession } from "next-auth/react";

import { DrawEdges } from "../DrawEdges";

export function SurveyFlow({
  surveyTitle,
  questionNodes,
  questionEdges,
  setSurveyTitle,
  setQuestionNodes,
  setQuestionEdges,
}: SurveyFlowProps) {
  const router = useRouter();

  const { data } = useSession();

  const userEmail = data?.user?.email;

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
        {questionNodes.map((node) => {
          switch (node.questionId) {
            case "start":
              return (
                <S.QuestionNodeWrapper
                  key={node.questionId}
                  style={{
                    transform: ` translate(${node.position.x}px, ${node.position.y}px)`,
                  }}
                  className="start"
                  onMouseDown={(event) => onNodeMove(event, node.questionId)}
                >
                  <S.QuestionHeader>
                    <S.SurveyTitleInputWrapper>
                      <S.SurveyTitleInput
                        placeholder="설문 제목을 입력하세요."
                        value={surveyTitle}
                        onChange={(event) => setSurveyTitle(event.target.value)}
                        spellCheck={false}
                      />
                    </S.SurveyTitleInputWrapper>
                    <S.QuestionIndex>시작 질문</S.QuestionIndex>
                    <S.QuestionTitleInput
                      placeholder="질문 제목을 입력해주세요"
                      value={node.data.questionTitle}
                      onChange={(event) =>
                        onQuestionTitleChange(event, node.questionId)
                      }
                    />
                  </S.QuestionHeader>

                  <S.OptionAddButton
                    onClick={() => onAddNewQuestionOption(node.questionId)}
                  >
                    옵션추가
                  </S.OptionAddButton>

                  {node.data.options ? (
                    <S.OptionsWrapper>
                      {node.data.options.map((option, optionIndex) => (
                        <S.OptionWrapper key={optionIndex}>
                          <S.OptionTitleInput
                            placeholder="답변을 입력해주세요"
                            value={option}
                            onChange={(event) =>
                              onQuestionOptionTitleChange(
                                event,
                                node.questionId,
                                optionIndex
                              )
                            }
                          />
                          <S.OptionConnectStartHandle
                            data-id={`${node.questionId}.${optionIndex}`}
                            onMouseDown={onConnectStart}
                          />
                        </S.OptionWrapper>
                      ))}
                    </S.OptionsWrapper>
                  ) : (
                    <S.ConnectStartHandle
                      data-id={node.questionId}
                      onMouseDown={onConnectStart}
                    />
                  )}
                </S.QuestionNodeWrapper>
              );

            case "end":
              return (
                <S.QuestionNodeWrapper
                  key={node.questionId}
                  style={{
                    transform: ` translate(${node.position.x}px, ${node.position.y}px)`,
                  }}
                  className="end"
                  onMouseDown={(event) => onNodeMove(event, node.questionId)}
                  onMouseUp={onConnectToEndNode}
                >
                  <S.QuestionHeader>
                    <S.QuestionIndex>마지막 질문</S.QuestionIndex>
                    <S.QuestionTitleInput
                      placeholder="질문 제목을 입력해주세요"
                      value={node.data.questionTitle}
                      onChange={(event) =>
                        onQuestionTitleChange(event, node.questionId)
                      }
                    />
                  </S.QuestionHeader>

                  <S.OptionAddButton
                    onClick={() => onAddNewQuestionOption(node.questionId)}
                  >
                    옵션추가
                  </S.OptionAddButton>

                  <S.SubmitButton
                    onClick={async () => {
                      if (surveyTitle === "") {
                        alert("설문 제목을 입력하세요");
                        return;
                      }

                      const response = await fetch(
                        `${Backend_API_URL}/survey`,
                        {
                          method: "POST",
                          body: JSON.stringify({
                            surveyTitle: surveyTitle,
                            survey: {
                              questionNodes,
                              questionEdges,
                            },
                          }),
                        }
                      );

                      if (response.status === 201) {
                        alert("질문폼 생성 성공");
                        router.replace(`/surveys/${userEmail}`);
                      }
                      if (response.status === 401) {
                        alert("질문폼 생성 실패");
                      }
                    }}
                  >
                    폼 생성하기
                  </S.SubmitButton>

                  {node.data.options ? (
                    <S.OptionsWrapper>
                      {node.data.options.map((option, optionIndex) => (
                        <S.OptionWrapper key={optionIndex}>
                          <S.OptionTitleInput
                            placeholder="답변을 입력해주세요"
                            value={option}
                            onChange={(event) =>
                              onQuestionOptionTitleChange(
                                event,
                                node.questionId,
                                optionIndex
                              )
                            }
                          />
                        </S.OptionWrapper>
                      ))}
                    </S.OptionsWrapper>
                  ) : null}
                </S.QuestionNodeWrapper>
              );

            default:
              return (
                <S.QuestionNodeWrapper
                  key={node.questionId}
                  style={{
                    transform: ` translate(${node.position.x}px, ${node.position.y}px)`,
                  }}
                  data-id={node.questionId}
                  className="node"
                  onMouseDown={(event) => onNodeMove(event, node.questionId)}
                  onMouseUp={onConnectToExistNode}
                >
                  <S.QuestionHeader>
                    <S.QuestionTitleInput
                      placeholder="질문 제목을 입력해주세요"
                      value={node.data.questionTitle}
                      onChange={(event) =>
                        onQuestionTitleChange(event, node.questionId)
                      }
                    />
                    <S.QuestionDeleteButton
                      onClick={() => onDeleteNode(node.questionId)}
                    >
                      <S.DeleteButtonIcon
                        src="/images/delete-button.svg"
                        alt="delete-button"
                        width={20}
                        height={20}
                      />
                    </S.QuestionDeleteButton>
                  </S.QuestionHeader>

                  <S.OptionAddButton
                    onClick={() => onAddNewQuestionOption(node.questionId)}
                  >
                    옵션추가
                  </S.OptionAddButton>

                  {node.data.options ? (
                    <S.OptionsWrapper>
                      {node.data.options.map((option, optionIndex) => (
                        <S.OptionWrapper key={optionIndex}>
                          <S.OptionTitleInput
                            placeholder="답변을 입력해주세요"
                            value={option}
                            onChange={(event) =>
                              onQuestionOptionTitleChange(
                                event,
                                node.questionId,
                                optionIndex
                              )
                            }
                          />
                          <S.OptionConnectStartHandle
                            data-id={`${node.questionId}.${optionIndex}`}
                            onMouseDown={onConnectStart}
                          />
                        </S.OptionWrapper>
                      ))}
                    </S.OptionsWrapper>
                  ) : (
                    <S.ConnectStartHandle
                      data-id={node.questionId}
                      onMouseDown={onConnectStart}
                    />
                  )}
                </S.QuestionNodeWrapper>
              );
          }
        })}
        <DrawEdges
          questionNodes={questionNodes}
          questionEdges={questionEdges}
        />
      </S.FlowContainer>
    </S.Wrapper>
  );
}
