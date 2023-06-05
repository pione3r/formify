import { useAppSelector } from "@/stores/hooks";
import { useRef } from "react";

import type { QuestionEdge, QuestionNode } from "@/types/general";

let id = 1;

const getId = () => `${id++}`;

export function useConnect(
  isEdgeAlreadyExist: (sourceId: string) => boolean,
  노드추가: (newNode: QuestionNode) => void,
  엣지추가: (newEdge: QuestionEdge) => void
) {
  const { x, y, ratio } = useAppSelector((state) => state.screen);

  const sourceId = useRef<string>();

  const onConnectStart = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.stopPropagation();

    const source = mouseDownEvent.currentTarget as HTMLElement;

    if (source) {
      sourceId.current = source.dataset["id"];
    }
  };

  const onConnectToNewNode = (mouseUpEvent: React.MouseEvent) => {
    const target = mouseUpEvent.target as HTMLElement;

    const copiedSourceId = sourceId.current;

    sourceId.current = undefined;

    if (!copiedSourceId) return;
    if (isEdgeAlreadyExist(copiedSourceId)) return;

    const newId = getId();

    if (target.classList.contains("flow-container")) {
      const newNode = {
        questionId: newId,
        data: { questionTitle: "" },
        position: {
          x: mouseUpEvent.nativeEvent.offsetX,
          y: mouseUpEvent.nativeEvent.offsetY - 100,
        },
      };

      const newEdge = {
        edgeId: `${copiedSourceId}-${newId}`,
        source: copiedSourceId,
        target: newId,
      };

      노드추가(newNode);
      엣지추가(newEdge);
    }

    if (target.classList.contains("flow-wrapper")) {
      let newX = (mouseUpEvent.nativeEvent.offsetX - x) / ratio;
      let newY = (mouseUpEvent.nativeEvent.offsetY - y) / ratio - 100;

      const newNode = {
        questionId: newId,
        data: { questionTitle: "" },
        position: {
          x: newX,
          y: newY,
        },
      };

      const newEdge = {
        edgeId: `${copiedSourceId}-${newId}`,
        source: copiedSourceId,
        target: newId,
      };

      노드추가(newNode);
      엣지추가(newEdge);
    }
  };

  const onConnectToExistNode = (mouseUpEvent: React.MouseEvent) => {
    const target = mouseUpEvent.currentTarget as HTMLElement;

    const targetId = target.dataset["id"];

    const copiedSourceId = sourceId.current;

    sourceId.current = undefined;

    if (!copiedSourceId) return;
    if (!targetId) return;
    if (isEdgeAlreadyExist(copiedSourceId)) return;

    if (target.classList.contains("node")) {
      const newEdge = {
        edgeId: `${copiedSourceId}-${targetId}`,
        source: copiedSourceId,
        target: targetId,
      };

      엣지추가(newEdge);
    }
  };

  const onConnectToEndNode = (mouseUpEvent: React.MouseEvent) => {
    const target = mouseUpEvent.currentTarget;

    const copiedSourceId = sourceId.current;

    sourceId.current = undefined;

    if (!copiedSourceId) return;
    if (isEdgeAlreadyExist(copiedSourceId)) return;

    if (target.classList.contains("end")) {
      const newEdge = {
        edgeId: `${copiedSourceId}-end`,
        source: copiedSourceId,
        target: "end",
      };

      엣지추가(newEdge);
    }
  };

  return {
    onConnectStart,
    onConnectToNewNode,
    onConnectToExistNode,
    onConnectToEndNode,
  };
}
