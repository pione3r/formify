import type { ArrowProps } from "./index.types";

import {
  calculateCanvasDimensions,
  calculateControlPointsWithBuffer,
  calculateDeltas,
} from "@/utils/getBezierPath";

export const BezierArrow = ({ startPoint, endPoint }: ArrowProps) => {
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
