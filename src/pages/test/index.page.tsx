import { useRef, useState } from "react";
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
    position: { top: 250, left: 200 },
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

  const onConnectEnd = (mouseUpEvent: React.MouseEvent) => {
    const target = mouseUpEvent.currentTarget;

    const copiedSourceId = sourceId.current;

    if (!copiedSourceId) return;

    if (target.classList.contains("flow-wrapper")) {
      if (questionEdges.find((edge) => edge.source === copiedSourceId)) {
        sourceId.current = undefined;
        return;
      }

      sourceId.current = undefined;

      const newId = getId();

      const newNode = {
        questionId: newId,
        data: { questionTitle: `타이틀 ${newId}` },
        position: { top: mouseUpEvent.pageY, left: mouseUpEvent.pageX },
      };

      setQuestionNodes((prev) => prev.concat(newNode));
      setQuestionEdges((prev) =>
        prev.concat({
          edgeId: `${copiedSourceId}-${newId}`,
          source: copiedSourceId,
          target: newId,
        })
      );
    }

    if (target.classList.contains("end")) {
      sourceId.current = undefined;

      setQuestionEdges((prev) =>
        prev.concat({
          edgeId: `${copiedSourceId}-end`,
          source: copiedSourceId,
          target: "end",
        })
      );
    }
  };

  const onDrag = (mouseDownEvent: React.MouseEvent, node: QuestionNode) => {
    const element = mouseDownEvent.currentTarget as HTMLElement;

    const elementPos = element.getBoundingClientRect();

    const onMouseMoveHandler = (moveEvent: MouseEvent) => {
      const dX = moveEvent.clientX - mouseDownEvent.clientX;
      const dY = moveEvent.clientY - mouseDownEvent.clientY;

      setQuestionNodes((prev) =>
        prev.map((question) =>
          question.questionId === node.questionId
            ? {
                ...question,
                position: {
                  top: elementPos.top + dY,
                  left: elementPos.left + dX,
                },
              }
            : question
        )
      );
    };

    const onMouseUpHandler = () => {
      document.removeEventListener("mousemove", onMouseMoveHandler);
    };

    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", onMouseUpHandler, {
      once: true,
    });
  };

  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    ...questionNodes[0],
    answer: "",
  });

  const [answerStack, setAnswerStack] = useState<Answer[]>([]);

  console.log(currentQuestion, questionNodes, questionEdges, answerStack);

  return (
    <>
      <S.Wrapper className="flow-wrapper" onMouseUp={onConnectEnd}>
        {questionNodes.map((node) => (
          <S.QuestionNodeWrapper
            key={node.questionId}
            style={{
              top: `${node.position.top}px`,
              left: `${node.position.left}px`,
            }}
            onMouseDown={(event) => onDrag(event, node)}
            className={node.questionId === "end" ? node.questionId : ""}
            onMouseUp={onConnectEnd}
          >
            {node.questionId !== "start" && node.questionId !== "end" && (
              <button
                onClick={() => {
                  const willDeletedQuestionId = node.questionId;

                  const copiedQuestionNodes = [...questionNodes];

                  setQuestionNodes(
                    copiedQuestionNodes.filter(
                      (question) =>
                        question.questionId !== willDeletedQuestionId
                    )
                  );

                  const copiedQuestionEdges = [...questionEdges];

                  setQuestionEdges(
                    copiedQuestionEdges.filter(
                      (edge) =>
                        edge.source !== willDeletedQuestionId &&
                        edge.target !== willDeletedQuestionId
                    )
                  );

                  setAnswerStack([]);
                  setCurrentQuestion({ ...questionNodes[0], answer: "" });
                }}
              >
                질문 삭제
              </button>
            )}
            {node.questionId !== "end" && (
              <button
                onClick={() => {
                  const copiedQuestionNodes = [...questionNodes];

                  const index = copiedQuestionNodes.findIndex(
                    (question) => question.questionId === node.questionId
                  );

                  if (copiedQuestionNodes[index].data.options) {
                    copiedQuestionNodes[index].data.options = [
                      ...copiedQuestionNodes[index].data.options!,
                      "",
                    ];
                  } else {
                    copiedQuestionNodes[index].data.options = [""];
                  }

                  setQuestionNodes(copiedQuestionNodes);
                }}
              >
                옵션추가
              </button>
            )}

            <S.QuestionTitleInput
              value={node.data.questionTitle}
              onChange={(event) => {
                const copiedQuestionNodes = [...questionNodes];

                const index = copiedQuestionNodes.findIndex(
                  (question) => question.questionId === node.questionId
                );

                copiedQuestionNodes[index].data.questionTitle =
                  event.target.value;

                setQuestionNodes(copiedQuestionNodes);
              }}
            />
            {node.questionId !== "end" && (
              <S.DragStartHandle
                data-id={node.questionId}
                onMouseDown={onConnectStart}
              />
            )}

            <S.OptionsWrapper>
              {node.data.options?.map((option, optionIndex) => (
                <S.OptionWrapper key={optionIndex}>
                  <S.OptionTitle>{optionIndex}</S.OptionTitle>
                  <S.OptionDragStartHandler
                    data-id={`${node.questionId}.${optionIndex}`}
                    onMouseDown={onConnectStart}
                  />
                </S.OptionWrapper>
              ))}
            </S.OptionsWrapper>
          </S.QuestionNodeWrapper>
        ))}

        {/* ///////////////////////////////////////////////// */}

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
      </S.Wrapper>

      <S.AnswerPageWrapper>
        <div>{`현재질문 ${currentQuestion.data.questionTitle}`}</div>
        {!currentQuestion.data.options && (
          <input
            value={currentQuestion.answer}
            onChange={(event) => {
              setCurrentQuestion((q) => ({ ...q, answer: event.target.value }));
            }}
          />
        )}

        {!(answerStack.length <= 0) && (
          <button
            onClick={() => {
              if (answerStack.length <= 0) return;

              const copiedAnswerStack = [...answerStack];

              setCurrentQuestion({ ...copiedAnswerStack.pop()! });
              setAnswerStack(copiedAnswerStack);
            }}
          >
            이전 질문
          </button>
        )}

        {currentQuestion.data.options?.map((option, optionIndex) => (
          <div
            style={{ cursor: "pointer" }}
            key={optionIndex}
            onClick={() => {
              const nextQuestionId = questionEdges.find((edge) =>
                edge.edgeId.includes(
                  `${currentQuestion.questionId}.${optionIndex}`
                )
              )?.target;

              if (nextQuestionId) {
                const nextQuestionNode = questionNodes.find(
                  (node) => node.questionId === nextQuestionId
                )!;

                // const copiedAnswerStack = [...answerStack];
                // copiedAnswerStack[stackPointer].answer = String(optionIndex);
                // setAnswerStack(copiedAnswerStack);

                setAnswerStack((prev) =>
                  prev.concat({
                    ...currentQuestion,
                    answer: String(optionIndex),
                  })
                );

                const nextQuestion = { ...nextQuestionNode, answer: "" };

                setCurrentQuestion(nextQuestion);
              }
            }}
          >
            {optionIndex}
          </div>
        )) ||
          (currentQuestion.questionId !== "end" && (
            <button
              onClick={() => {
                const nextQuestionId = questionEdges.find(
                  (edge) =>
                    edge.edgeId.split("-")[0] === currentQuestion.questionId
                )?.target!;

                if (nextQuestionId) {
                  setAnswerStack((prev) => prev.concat(currentQuestion));

                  const nextQuestionNode = questionNodes.find(
                    (node) => node.questionId === nextQuestionId
                  )!;

                  setCurrentQuestion({ ...nextQuestionNode, answer: "" });
                }
              }}
            >
              다음 질문
            </button>
          ))}
        {currentQuestion.questionId === "end" && (
          <button
            onClick={() => {
              setAnswerStack((prev) => prev.concat(currentQuestion));
            }}
          >
            제출
          </button>
        )}
      </S.AnswerPageWrapper>
    </>
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
