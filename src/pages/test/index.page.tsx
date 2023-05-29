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
    questionId: "0",
    questionType: "short-answer",
    data: { questionTitle: "질문 시작" },
    position: { top: 0, left: 0 },
  },
];

type QuestionNode = {
  questionId: string;
  questionType: string;
  data: { questionTitle: string };
  position: { top: number; left: number };
};

type QuestionEdge = {
  edgeId: string;
  source: string;
  target: string;
};

export default function TestPage() {
  const [questionNodes, setQuestionNodes] =
    useState<QuestionNode[]>(initialQuestionNodes);

  const [questionEdges, setQuestionEdges] = useState<QuestionEdge[]>([]);

  const sourceId = useRef<string>();

  const onConnectStart = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.stopPropagation();

    const source = mouseDownEvent.currentTarget as HTMLElement;

    if (!source) {
      return;
    }

    sourceId.current = source.dataset["id"];
  };

  const onConnectEnd = (mouseUpEvent: React.MouseEvent) => {
    const dropZone = mouseUpEvent.currentTarget;

    if (!dropZone.classList.contains("drop-zone")) return;

    const copiedSourceId = sourceId.current;

    if (!copiedSourceId) return;

    sourceId.current = undefined;

    const newId = getId();

    const newNode = {
      questionId: newId,
      questionType: "short-answer",
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

  const [currentQuestion, setCurrentQuestion] = useState(questionNodes[0]);

  return (
    <>
      <S.Wrapper className="drop-zone" onMouseUp={onConnectEnd}>
        {questionNodes.map((node) => (
          <S.QuestionNodeWrapper
            key={node.questionId}
            style={{
              top: `${node.position.top}px`,
              left: `${node.position.left}px`,
            }}
            onMouseDown={(event) => onDrag(event, node)}
          >
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
            <S.DragStartHandle
              data-id={node.questionId}
              onMouseDown={onConnectStart}
            />
          </S.QuestionNodeWrapper>
        ))}
        {questionEdges.map((edge) => {
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
                x: source?.position.left!,
                y: source?.position.top!,
              }}
              endPoint={{ x: target?.position.left!, y: target?.position.top! }}
            />
          );
        })}
      </S.Wrapper>
      <S.AnswerPageWrapper>
        <button
          onClick={() => {
            const nextQuestionId = questionEdges.find(
              (edge) => edge.edgeId.split("-")[0] === currentQuestion.questionId
            )?.target!;

            setCurrentQuestion(
              questionNodes.find((node) => node.questionId === nextQuestionId)!
            );
          }}
        >
          다음 질문
        </button>
        {currentQuestion
          ? currentQuestion.data.questionTitle
          : "다음 질문은 없다"}
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
};

const Arrow = ({ startPoint, endPoint }: ArrowProps) => {
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
      ¸
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
    </svg>
  );
};
