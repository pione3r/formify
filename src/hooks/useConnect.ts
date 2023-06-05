import { useRef } from "react";

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

let id = 1;

const getId = () => `${id++}`;

export function useConnect(
  screenPos: {
    x: number;
    y: number;
  },
  ratio: number,
  isEdgeAlreadyExist: (sourceId: string) => boolean,
  노드추가: (newNode: QuestionNode) => void,
  엣지추가: (newEdge: QuestionEdge) => void
) {
  const sourceId = useRef<string>();

  const onConnectStart = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.stopPropagation();

    const source = mouseDownEvent.currentTarget as HTMLElement;

    if (source) {
      sourceId.current = source.dataset["id"];
    }
  };

  const onConnectToNewNode = (mouseUpEvent: React.MouseEvent) => {
    const target = mouseUpEvent.currentTarget as HTMLElement;

    const copiedSourceId = sourceId.current;

    sourceId.current = undefined;

    if (!copiedSourceId) return;
    if (isEdgeAlreadyExist(copiedSourceId)) return;

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

      노드추가(newNode);
      엣지추가(newEdge);
    }

    if (target.classList.contains("view-frame")) {
      let newLeft = (mouseUpEvent.pageX - screenPos.x) / ratio;
      let newTop = (mouseUpEvent.pageY - screenPos.y) / ratio - 230;

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

    if (
      !target.classList.contains("flow-wrapper") &&
      !target.classList.contains("end")
    ) {
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
