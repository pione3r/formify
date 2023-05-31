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
    data: { questionTitle: "" },
    position: { top: 100, left: 300 },
  },
  {
    questionId: "end",
    data: { questionTitle: "" },
    position: { top: 200, left: 1200 },
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [ratio, setRatio] = useState(1);

  const [screenPos, setScreenPos] = useState({ x: 0, y: 0 });

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
        position: {
          top: mouseUpEvent.nativeEvent.offsetY - 100,
          left: mouseUpEvent.nativeEvent.offsetX,
        },
      };

      const newEdge = {
        edgeId: `${copiedSourceId}-${newId}`,
        source: copiedSourceId,
        target: newId,
      };

      setQuestionNodes((prev) => prev.concat(newNode));
      setQuestionEdges((prev) => prev.concat(newEdge));
    }

    if (target.classList.contains("view-frame")) {
      let newLeft = (mouseUpEvent.pageX - screenPos.x) / ratio;
      let newTop = (mouseUpEvent.pageY - screenPos.y) / ratio - 250;

      const newId = getId();

      const newNode = {
        questionId: newId,
        data: { questionTitle: "" },
        position: {
          top: newTop,
          left: newLeft,
        },
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
    mouseDownEvent.stopPropagation();

    const element = mouseDownEvent.currentTarget as HTMLElement;

    const startLeft = Number.parseInt(element.style.left);
    const startRight = Number.parseInt(element.style.top);

    const onNodeDragMove = (moveEvent: MouseEvent) => {
      const newLeft =
        startLeft + (moveEvent.pageX - mouseDownEvent.pageX) / ratio;
      const newTop =
        startRight + (moveEvent.pageY - mouseDownEvent.pageY) / ratio;

      const copiedQuestionNodes = [...questionNodes];
      const newQuestionNodes = copiedQuestionNodes.map((questionNode) =>
        questionNode.questionId === nodeId
          ? {
              ...questionNode,
              position: {
                top: newTop,
                left: newLeft,
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
      <S.ViewFrame
        className="view-frame"
        onMouseUp={onConnectToNewNode}
        onWheel={(wheelEvent) => {
          setRatio(
            Math.min(Math.max(0.5, ratio + wheelEvent.deltaY * -0.001), 2)
          );
        }}
        onMouseDown={(mouseDownEvent) => {
          const viewFrameElement = mouseDownEvent.currentTarget;
          viewFrameElement.style.cursor = "grabbing";

          const onMouseMoveHandler = (mouseMoveEvent: MouseEvent) => {
            const dX =
              screenPos.x + mouseMoveEvent.pageX - mouseDownEvent.pageX;
            const dY =
              screenPos.y + mouseMoveEvent.pageY - mouseDownEvent.pageY;

            setScreenPos({ x: dX, y: dY });
          };

          const onMouseUpHandler = () => {
            viewFrameElement.removeAttribute("style");

            document.removeEventListener("mousemove", onMouseMoveHandler);
            document.removeEventListener("mouseup", onMouseUpHandler);
          };
          document.addEventListener("mousemove", onMouseMoveHandler);
          document.addEventListener("mouseup", onMouseUpHandler, {
            once: true,
          });
        }}
      >
        <S.Wrapper
          ref={wrapperRef}
          style={{
            transform: ` translate(${screenPos.x}px, ${screenPos.y}px) scale(${ratio})`,
          }}
          className="flow-wrapper"
          onMouseUp={onConnectToNewNode}
        >
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
                    <S.QuestionHeader>
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
                      top: `${node.position.top}px`,
                      left: `${node.position.left}px`,
                    }}
                    className="end"
                    onMouseDown={(event) =>
                      onNodeDragStart(event, node.questionId)
                    }
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
                    <S.QuestionHeader>
                      <S.QuestionIndex>
                        {`${node.questionId}번 질문`}
                      </S.QuestionIndex>
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
        </S.Wrapper>
      </S.ViewFrame>
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
    <S.DrawEdgesWrapper>
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
                x: sourceNode?.position.left! + 300,
                y: sourceNode?.position.top! + 242 + Number(optionIndex) * 53,
              }}
              endPoint={{
                x: target?.position.left!,
                y: target?.position.top! + 100,
              }}
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
                x: source?.position.left! + 300,
                y: source?.position.top! + 100,
              }}
              endPoint={{
                x: target?.position.left!,
                y: target?.position.top! + 100,
              }}
            />
          );
        }
      })}
    </S.DrawEdgesWrapper>
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
};

const Arrow = ({ startPoint, endPoint }: ArrowProps) => {
  const strokeWidth = 4;

  const arrowHeadEndingSize = 20;
  const boundingBoxElementsBuffer = strokeWidth + arrowHeadEndingSize;

  const dotEndingRadius = 1;

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
        position: "absolute",
      }}
    >
      <path
        stroke="#b1b1b7"
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
        stroke="#b1b1b7"
        strokeWidth={3}
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
    </svg>
  );
};
