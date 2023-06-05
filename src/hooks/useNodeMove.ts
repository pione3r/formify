import { useAppSelector } from "@/stores/hooks";

export function useNodeMove(
  노드위치변경: (nodeId: string, newX: number, newY: number) => void
) {
  const { ratio } = useAppSelector((state) => state.screen);

  const onNodeMove = (mouseDownEvent: React.MouseEvent, nodeId: string) => {
    mouseDownEvent.stopPropagation();

    const element = mouseDownEvent.currentTarget as HTMLElement;

    const [startX, startY] = element.style.transform
      .replace("translate(", "")
      .replace(")", "")
      .replaceAll("px", "")
      .split(", ")
      .map((str) => +str);

    const onMouseMoveHandler = (moveEvent: MouseEvent) => {
      const newX = startX + (moveEvent.pageX - mouseDownEvent.pageX) / ratio;
      const newY = startY + (moveEvent.pageY - mouseDownEvent.pageY) / ratio;

      노드위치변경(nodeId, newX, newY);
    };

    const onMouseUpHandler = () => {
      document.removeEventListener("mousemove", onMouseMoveHandler);
      document.removeEventListener("mouseup", onMouseUpHandler);
    };

    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", onMouseUpHandler, {
      once: true,
    });
  };

  return { onNodeMove };
}
