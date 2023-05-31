import { useEffect, useRef, useState } from "react";
import * as S from "./index.styles";
import {
  calculateCanvasDimensions,
  calculateControlPointsWithBuffer,
  calculateDeltas,
} from "@/utils/getBezierPath";

let id = 1;

const getId = () => `${id++}`;

const initialQuestionNodes = [
  {
    questionId: "start",
    data: { questionTitle: "질문 시작" },
    position: { top: 0, left: 0 },
  },
  {
    questionId: "end",
    data: { questionTitle: "마지막 질문" },
    position: { top: 250, left: 1000 },
  },
];

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

type CurrentQuestion = QuestionNode & {
  answer: string;
};

type Answer = QuestionNode & {
  answer: string;
};

export default function TestPage() {
  const [questionNodes, setQuestionNodes] =
    useState<QuestionNode[]>(initialQuestionNodes);

  const [questionEdges, setQuestionEdges] = useState<QuestionEdge[]>([]);

  const sourceId = useRef<string>();

  const onConnectStart = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.stopPropagation();

    const source = mouseDownEvent.currentTarget as HTMLElement;

    if (source) {
      sourceId.current = source.dataset["id"];
    }
  };

  const onConnectToNewNode = (mouseUpEvent: React.MouseEvent) => {
    const target = mouseUpEvent.currentTarget;

    const copiedSourceId = sourceId.current;

    sourceId.current = undefined;

    if (!copiedSourceId) return;
    if (questionEdges.find((edge) => edge.source === copiedSourceId)) return;

    if (target.classList.contains("flow-wrapper")) {
      const newId = getId();

      const newNode = {
        questionId: newId,
        data: { questionTitle: "" },
        position: { top: mouseUpEvent.pageY, left: mouseUpEvent.pageX },
      };

      const newEdge = {
        edgeId: `${copiedSourceId}-${newId}`,
        source: copiedSourceId,
        target: newId,
      };

      setQuestionNodes((prev) => prev.concat(newNode));
      setQuestionEdges((prev) => prev.concat(newEdge));
    }
  };

  const onConnectToExistNode = (mouseUpEvent: React.MouseEvent) => {
    const target = mouseUpEvent.currentTarget as HTMLElement;

    const targetId = target.dataset["id"];

    const copiedSourceId = sourceId.current;

    sourceId.current = undefined;

    if (!copiedSourceId) return;
    if (!targetId) return;
    if (questionEdges.find((edge) => edge.source === copiedSourceId)) return;

    if (
      !target.classList.contains("flow-wrapper") &&
      !target.classList.contains("end")
    ) {
      const newEdge = {
        edgeId: `${copiedSourceId}-${targetId}`,
        source: copiedSourceId,
        target: targetId,
      };

      setQuestionEdges((prev) => prev.concat(newEdge));
    }
  };

  const onConnectToEndNode = (mouseUpEvent: React.MouseEvent) => {
    const target = mouseUpEvent.currentTarget;

    const copiedSourceId = sourceId.current;

    sourceId.current = undefined;

    if (!copiedSourceId) return;
    if (questionEdges.find((edge) => edge.source === copiedSourceId)) return;

    if (target.classList.contains("end")) {
      const newEdge = {
        edgeId: `${copiedSourceId}-end`,
        source: copiedSourceId,
        target: "end",
      };

      setQuestionEdges((prev) => prev.concat(newEdge));
    }
  };

  const onNodeDragStart = (
    mouseDownEvent: React.MouseEvent,
    nodeId: string
  ) => {
    const element = mouseDownEvent.currentTarget as HTMLElement;

    const elementPos = element.getBoundingClientRect();

    const inrange = (v: number, min: number, max: number) => {
      if (v < min) return min;
      if (v > max) return max;
      return v;
    };

    const onNodeDragMove = (moveEvent: MouseEvent) => {
      const newLeft = elementPos.left + moveEvent.pageX - mouseDownEvent.pageX;
      const newTop = elementPos.top + moveEvent.pageY - mouseDownEvent.pageY;

      const maxTop =
        element.parentElement?.offsetHeight! - element.offsetHeight - 40;

      const maxLeft =
        element.parentElement?.offsetWidth! - element.offsetWidth - 40;

      const copiedQuestionNodes = [...questionNodes];
      const newQuestionNodes = copiedQuestionNodes.map((questionNode) =>
        questionNode.questionId === nodeId
          ? {
              ...questionNode,
              position: {
                top: inrange(newTop, 0, maxTop),
                left: inrange(newLeft, 0, maxLeft),
              },
            }
          : questionNode
      );

      setQuestionNodes(newQuestionNodes);
    };

    const onNodeDragEnd = () => {
      document.removeEventListener("mousemove", onNodeDragMove);
      document.removeEventListener("mouseup", onNodeDragEnd);
    };

    document.addEventListener("mousemove", onNodeDragMove);
    document.addEventListener("mouseup", onNodeDragEnd, {
      once: true,
    });
  };

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
    <>
      <S.Wrapper className="flow-wrapper" onMouseUp={onConnectToNewNode}>
        {questionNodes.map((node) => {
          switch (node.questionId) {
            case "start":
              return (
                <S.QuestionNodeWrapper
                  key={node.questionId}
                  style={{
                    top: `${node.position.top}px`,
                    left: `${node.position.left}px`,
                  }}
                  className="start"
                  onMouseDown={(event) =>
                    onNodeDragStart(event, node.questionId)
                  }
                >
                  <button
                    onClick={() => onAddNewQuestionOption(node.questionId)}
                  >
                    옵션추가
                  </button>

                  <S.QuestionTitleInput
                    placeholder="질문 제목을 입력해주세요"
                    value={node.data.questionTitle}
                    onChange={(event) =>
                      onQuestionTitleChange(event, node.questionId)
                    }
                  />

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
                    top: `${node.position.top}px`,
                    left: `${node.position.left}px`,
                  }}
                  className="end"
                  onMouseDown={(event) =>
                    onNodeDragStart(event, node.questionId)
                  }
                  onMouseUp={onConnectToEndNode}
                >
                  <button
                    onClick={() => onAddNewQuestionOption(node.questionId)}
                  >
                    옵션추가
                  </button>

                  <S.QuestionTitleInput
                    placeholder="질문 제목을 입력해주세요"
                    value={node.data.questionTitle}
                    onChange={(event) =>
                      onQuestionTitleChange(event, node.questionId)
                    }
                  />

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
                    top: `${node.position.top}px`,
                    left: `${node.position.left}px`,
                  }}
                  data-id={node.questionId}
                  className="question"
                  onMouseDown={(event) =>
                    onNodeDragStart(event, node.questionId)
                  }
                  onMouseUp={onConnectToExistNode}
                >
                  <button onClick={() => onDeleteNode(node.questionId)}>
                    질문 삭제
                  </button>
                  <button
                    onClick={() => onAddNewQuestionOption(node.questionId)}
                  >
                    옵션추가
                  </button>

                  <S.QuestionTitleInput
                    placeholder="질문 제목을 입력해주세요"
                    value={node.data.questionTitle}
                    onChange={(event) =>
                      onQuestionTitleChange(event, node.questionId)
                    }
                  />

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
      </S.Wrapper>

      <Preview questionNodes={questionNodes} questionEdges={questionEdges} />
    </>
  );
}

function DrawEdges({
  questionNodes,
  questionEdges,
}: {
  questionNodes: QuestionNode[];
  questionEdges: QuestionEdge[];
}) {
  return (
    <>
      {questionEdges.map((edge) => {
        if (edge.edgeId.includes(".")) {
          const [sourceNodeId, optionIndex] = edge.source.split(".");
          const sourceNode = questionNodes.find(
            (node) => node.questionId === sourceNodeId
          );

          const target = questionNodes.find(
            (node) => node.questionId === edge.target
          );

          return (
            <Arrow
              key={edge.edgeId}
              startPoint={{
                x: sourceNode?.position.left! + 214,
                y: sourceNode?.position.top! + 171 + Number(optionIndex) * 20,
              }}
              endPoint={{
                x: target?.position.left!,
                y: target?.position.top! + 40,
              }}
              optionTitle={optionIndex}
            />
          );
        } else {
          const source = questionNodes.find(
            (node) => node.questionId === edge.source
          );

          const target = questionNodes.find(
            (node) => node.questionId === edge.target
          );

          return (
            <Arrow
              key={edge.edgeId}
              startPoint={{
                x: source?.position.left! + 230,
                y: source?.position.top! + 40,
              }}
              endPoint={{
                x: target?.position.left!,
                y: target?.position.top! + 40,
              }}
            />
          );
        }
      })}
    </>
  );
}

function Preview({
  questionNodes,
  questionEdges,
}: {
  questionNodes: QuestionNode[];
  questionEdges: QuestionEdge[];
}) {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    ...questionNodes[0],
    answer: "",
  });

  const [answerStack, setAnswerStack] = useState<Answer[]>([]);

  useEffect(() => {
    setCurrentQuestion({ ...questionNodes[0], answer: "" });
    setAnswerStack([]);
  }, [questionNodes]);

  return (
    <S.PreviewWrapper>
      <S.CurrentQuestionWrapper>
        <S.CurrentQuestionTitle>
          {currentQuestion.data.questionTitle}
        </S.CurrentQuestionTitle>
        {(() => {
          switch (currentQuestion.questionId) {
            case "start":
              return (
                <>
                  {!currentQuestion.data.options ? (
                    <>
                      <S.CurrentQuestionAnswerInput
                        value={currentQuestion.answer}
                        onChange={(event) => {
                          setCurrentQuestion((q) => ({
                            ...q,
                            answer: event.target.value,
                          }));
                        }}
                      />
                      <button
                        onClick={() => {
                          const edgeToNextQuestion = questionEdges.find(
                            (edge) =>
                              edge.edgeId.split("-")[0] ===
                              currentQuestion.questionId
                          );

                          if (!edgeToNextQuestion) return;

                          const nextQuestionId = edgeToNextQuestion.target;

                          if (nextQuestionId) {
                            setAnswerStack((prev) =>
                              prev.concat(currentQuestion)
                            );

                            const nextQuestion = questionNodes.find(
                              (node) => node.questionId === nextQuestionId
                            )!;

                            setCurrentQuestion({
                              ...nextQuestion,
                              answer: "",
                            });
                          }
                        }}
                      >
                        다음 질문
                      </button>
                    </>
                  ) : (
                    <>
                      {currentQuestion.data.options.map(
                        (option, optionIndex) => (
                          <div
                            style={{ cursor: "pointer" }}
                            key={optionIndex}
                            onClick={() => {
                              const edgeToNextQuestion = questionEdges.find(
                                (edge) =>
                                  edge.edgeId.includes(
                                    `${currentQuestion.questionId}.${optionIndex}`
                                  )
                              );

                              if (!edgeToNextQuestion) return;

                              const nextQuestionId = edgeToNextQuestion.target;

                              if (nextQuestionId) {
                                const nextQuestion = questionNodes.find(
                                  (node) => node.questionId === nextQuestionId
                                )!;

                                setAnswerStack((prev) =>
                                  prev.concat({
                                    ...currentQuestion,
                                    answer: option,
                                  })
                                );

                                setCurrentQuestion({
                                  ...nextQuestion,
                                  answer: "",
                                });
                              }
                            }}
                          >
                            {option}
                          </div>
                        )
                      )}
                    </>
                  )}
                </>
              );
            case "end":
              return (
                <>
                  <S.PreviousQuestionButton
                    onClick={() => {
                      if (answerStack.length <= 0) return;

                      const copiedAnswerStack = [...answerStack];

                      setCurrentQuestion({ ...copiedAnswerStack.pop()! });
                      setAnswerStack(copiedAnswerStack);
                    }}
                  >
                    이전 질문
                  </S.PreviousQuestionButton>
                  <>
                    {!currentQuestion.data.options ? (
                      <>
                        <S.CurrentQuestionAnswerInput
                          value={currentQuestion.answer}
                          onChange={(event) => {
                            setCurrentQuestion((q) => ({
                              ...q,
                              answer: event.target.value,
                            }));
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {currentQuestion.data.options.map(
                          (option, optionIndex) => (
                            <div
                              style={{ cursor: "pointer" }}
                              key={optionIndex}
                              onClick={() => {
                                setCurrentQuestion((prev) => ({
                                  ...prev,
                                  answer: String(optionIndex),
                                }));
                              }}
                            >
                              {option}
                            </div>
                          )
                        )}
                      </>
                    )}
                  </>
                  <button
                    onClick={() => {
                      setCurrentQuestion({ ...questionNodes[0], answer: "" });
                      setAnswerStack([]);
                    }}
                  >
                    제출
                  </button>
                </>
              );
            default:
              return (
                <>
                  <S.PreviousQuestionButton
                    onClick={() => {
                      if (answerStack.length <= 0) return;

                      const copiedAnswerStack = [...answerStack];

                      setCurrentQuestion({ ...copiedAnswerStack.pop()! });
                      setAnswerStack(copiedAnswerStack);
                    }}
                  >
                    이전 질문
                  </S.PreviousQuestionButton>
                  {!currentQuestion.data.options ? (
                    <>
                      <S.CurrentQuestionAnswerInput
                        value={currentQuestion.answer}
                        onChange={(event) => {
                          setCurrentQuestion((q) => ({
                            ...q,
                            answer: event.target.value,
                          }));
                        }}
                      />
                      <button
                        onClick={() => {
                          const edgeToNextQuestion = questionEdges.find(
                            (edge) =>
                              edge.edgeId.split("-")[0] ===
                              currentQuestion.questionId
                          );

                          if (!edgeToNextQuestion) return;

                          const nextQuestionId = edgeToNextQuestion.target;

                          if (nextQuestionId) {
                            setAnswerStack((prev) =>
                              prev.concat(currentQuestion)
                            );

                            const nextQuestion = questionNodes.find(
                              (node) => node.questionId === nextQuestionId
                            )!;

                            setCurrentQuestion({
                              ...nextQuestion,
                              answer: "",
                            });
                          }
                        }}
                      >
                        다음 질문
                      </button>
                    </>
                  ) : (
                    <>
                      {currentQuestion.data.options.map(
                        (option, optionIndex) => (
                          <div
                            style={{ cursor: "pointer" }}
                            key={optionIndex}
                            onClick={() => {
                              const edgeToNextQuestion = questionEdges.find(
                                (edge) =>
                                  edge.edgeId.includes(
                                    `${currentQuestion.questionId}.${optionIndex}`
                                  )
                              );

                              if (!edgeToNextQuestion) return;

                              const nextQuestionId = edgeToNextQuestion.target;

                              if (nextQuestionId) {
                                const nextQuestion = questionNodes.find(
                                  (node) => node.questionId === nextQuestionId
                                )!;

                                setAnswerStack((prev) =>
                                  prev.concat({
                                    ...currentQuestion,
                                    answer: option,
                                  })
                                );

                                setCurrentQuestion({
                                  ...nextQuestion,
                                  answer: "",
                                });
                              }
                            }}
                          >
                            {option}
                          </div>
                        )
                      )}
                    </>
                  )}
                </>
              );
          }
        })()}
      </S.CurrentQuestionWrapper>
    </S.PreviewWrapper>
  );
}

type Point = {
  x: number;
  y: number;
};

type ArrowProps = {
  startPoint: Point;
  endPoint: Point;
  optionTitle?: string;
};

const Arrow = ({ startPoint, endPoint, optionTitle }: ArrowProps) => {
  // Getting info about SVG canvas

  const strokeWidth = 1;

  const arrowHeadEndingSize = 10;
  const boundingBoxElementsBuffer = strokeWidth + arrowHeadEndingSize;

  const dotEndingRadius = 3;

  const STRAIGHT_LINE_BEFORE_ARROW_HEAD = 5;

  const { absDx, absDy, dx, dy } = calculateDeltas(startPoint, endPoint);
  const { p1, p2, p3, p4, boundingBoxBuffer } =
    calculateControlPointsWithBuffer({
      boundingBoxElementsBuffer,
      dx,
      dy,
      absDx,
      absDy,
    });

  const { canvasWidth, canvasHeight } = calculateCanvasDimensions({
    absDx,
    absDy,
    boundingBoxBuffer,
  });

  const canvasXOffset =
    Math.min(startPoint.x, endPoint.x) - boundingBoxBuffer.horizontal;
  const canvasYOffset =
    Math.min(startPoint.y, endPoint.y) - boundingBoxBuffer.vertical;

  return (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      style={{
        transform: `translate(${canvasXOffset}px, ${canvasYOffset}px)`,
        position: "fixed",
      }}
    >
      <path
        stroke="black"
        strokeWidth={strokeWidth}
        fill="none"
        d={`
          M ${p1.x} ${p1.y}
          C ${p2.x} ${p2.y},
          ${p3.x} ${p3.y},
          ${p4.x - STRAIGHT_LINE_BEFORE_ARROW_HEAD} ${p4.y}
          L ${p4.x} ${p4.y}`}
      />
      <path
        d={`
          M ${(arrowHeadEndingSize / 5) * 2} 0
          L ${arrowHeadEndingSize} ${arrowHeadEndingSize / 2}
          L ${(arrowHeadEndingSize / 5) * 2} ${arrowHeadEndingSize}`}
        fill="none"
        stroke="black"
        style={{
          transform: `translate(${p4.x - arrowHeadEndingSize}px, ${
            p4.y - arrowHeadEndingSize / 2
          }px)`,
        }}
      ></path>
      <circle
        cx={p1.x}
        cy={p1.y}
        r={dotEndingRadius}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />
      <text
        x={canvasWidth / 2}
        y={canvasHeight / 2}
        fill="white"
        fontSize={"5em"}
      >
        {optionTitle}
      </text>
    </svg>
  );
};
