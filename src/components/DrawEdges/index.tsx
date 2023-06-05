import * as S from "./index.styles";
import { DrawEdgesProps } from "./index.types";

import { BezierArrow } from "../BezierArrow";

export function DrawEdges({ questionNodes, questionEdges }: DrawEdgesProps) {
  return (
    <S.Wrapper>
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
            <BezierArrow
              key={edge.edgeId}
              startPoint={{
                x: sourceNode?.position.x! + 300,
                y: sourceNode?.position.y! + 242 + Number(optionIndex) * 53,
              }}
              endPoint={{
                x: target?.position.x!,
                y: target?.position.y! + 100,
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
            <BezierArrow
              key={edge.edgeId}
              startPoint={{
                x: source?.position.x! + 300,
                y: source?.position.y! + 100,
              }}
              endPoint={{
                x: target?.position.x!,
                y: target?.position.y! + 100,
              }}
            />
          );
        }
      })}
    </S.Wrapper>
  );
}
